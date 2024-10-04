# `@nodecfdi/sat-estado-cfdi`

[![Source Code][badge-source]][source]
[![Npm Node Version Support][badge-node-version]][node-version]
[![Discord][badge-discord]][discord]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Build Status][badge-build]][build]
[![Reliability][badge-reliability]][reliability]
[![Maintainability][badge-maintainability]][maintainability]
[![Code Coverage][badge-coverage]][coverage]
[![Violations][badge-violations]][violations]
[![Total Downloads][badge-downloads]][downloads]

> Consulta el estado de un CFDI en el webservice del SAT

:us: The documentation of this project is in spanish as this is the natural language for intented audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

## Acerca de `@nodecfdi/sat-estado-cfdi`

Esta librería contiene objetos de ayuda para consumir el **Servicio de Consulta de CFDI del SAT**.
La documentación del proyecto está en español porque ese es el lenguaje de los usuarios que la utilizarán. Esta librería está inspirada en: <https://github.com/phpcfdi/sat-estado-cfdi/>

**Servicio de Consulta de CFDI del SAT**:

- Servicio productivo: <https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc>
- Servicio de pruebas: <https://pruebacfdiconsultaqr.cloudapp.net/ConsultaCFDIService.svc>
- SAT: <https://www.sat.gob.mx/consultas/20585/conoce-los-servicios-especializados-de-validacion>
- Documentación del Servicio de Consulta de CFDIVersión 1.3 (2020-11-18):
  <https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1579314559300&ssbinary=true>

## Instalación

NPM

```bash
npm i @nodecfdi/sat-estado-cfdi --save
```

YARN

```bash
yarn add @nodecfdi/sat-estado-cfdi
```

PNPM

```bash
pnpm add @nodecfdi/sat-estado-cfdi
```

CDN - Browser

Usa la versión mas reciente publicada cambiando `<latest-version>` por la última version. Ex. ...sat-estado-cfdi@2.0.3/dist...

```html
<script src="https://unpkg.com/@nodecfdi/sat-estado-cfdi@<latest-version>/dist/sat-estado-cfdi.global.js"></script>
```

## Ejemplo básico de uso

```ts
import { ConsumerClientInterface, Consumer } from '@nodecfdi/sat-estado-cfdi';

//el cliente debe implementar ConsumerClientInterface
const client = new Client();
const consumer = new Consumer(client);

// para clientes síncronos el consumer debe tener la opción de hacer llamadas síncronas
const cfdiStatus = consumer.execute('...expression');

//si tu cliente es asíncrono usa executeAsync
const cfdiStatusAsync = await consumer.executeAsync('...expression');

if (cfdiStatus.getCancellable().notCancellable()) {
  console.log('CFDI no es cancelable');
}

// si quieres ver toda la respuesta
console.log(cfdiStatus.getRawResponse());
```

### Expresiones (input)

El consumidor requiere una expresión para poder consultar.
La expresión es el texto que viene en el código QR de la representación impresa de un CFDI.

Las expresiones son diferentes para CFDI 3.2, CFDI 3.3 y RET 1.0.
Tienen reglas específicas de formato y de la información que debe contener.

Si no cuentas con la expresión, te recomiendo usar la librería
[`nodecfdi/cfdi-expresiones`](https://github.com/nodecfdi/cfdi-expresiones).

### Estados (salida)

Después de consumir el servicio, se responderá con un objeto `CfdiStatus` que agrupa de los cuatro estados.

No compares directamente los valores de los estados, en su lugar utiliza los métodos `is*`,
por ejemplo `$response->document()->isCancelled()`.

Posibles estados:

- `CodigoEstatus`: `query(): QueryStatus`.

  - `found`: Si el estado inicia con `S -`.
  - `notFound`: en cualquier otro caso.

- `Estado`: `document(): DocumentStatus`.

  - `active`: Si el estado reportó `Vigente`.
  - `cancelled`: Si el estado reportó `Cancelado`.
  - `notFound`: en cualquier otro caso.

- `EsCancelable`: `cancellable(): CancellableStatus`.

  - `cancellableByDirectCall`: Si el estado reportó `Cancelable sin aceptación`.
  - `cancellableByApproval`: Si el estado reportó `Cancelable con aceptación`.
  - `notCancellable`: en cualquier otro caso.

- `EstatusCancelacion`: `cancellation(): CancellationStatus`.

  - `cancelledByDirectCall`: Si el estado reportó `Cancelado sin aceptación`.
  - `cancelledByApproval`: Si el estado reportó `Cancelado con aceptación`.
  - `cancelledByExpiration`: Si el estado reportó `Plazo vencido`.
  - `pending`: Si el estado reportó `En proceso`.
  - `disapproved`: Si el estado reportó `Solicitud rechazada`.
  - `undefined`: en cualquier otro caso.

- `ValidacionEFOS`: `efos(): EfosStatus`.
  - `included`: Si el estado no reportó `200`.
  - `excluded`: Si el estado reportó `200`.

#### Estados mutuamente excluyentes

| CodigoEstatus | Estado    | EsCancelable              | EstatusCancelacion       | Explicación                                               |
| ------------- | --------- | ------------------------- | ------------------------ | --------------------------------------------------------- |
| N - ...       | \*        | \*                        | \*                       | El SAT no sabe del CFDI con la expresión dada             |
| S - ...       | Cancelado | \*                        | Plazo vencido            | Cancelado por plazo vencido                               |
| S - ...       | Cancelado | \*                        | Cancelado con aceptación | Cancelado con aceptación del receptor                     |
| S - ...       | Cancelado | \*                        | Cancelado sin aceptación | No fue requerido preguntarle al receptor y se canceló     |
| S - ...       | Vigente   | No cancelable             | \*                       | No se puede cancelar                                      |
| S - ...       | Vigente   | Cancelable sin aceptación | \*                       | Se puede cancelar, pero no se ha realizado la cancelación |
| S - ...       | Vigente   | Cancelable con aceptación | (ninguno)                | Se puede cancelar, pero no se ha realizado la solicitud   |
| S - ...       | Vigente   | Cancelable con aceptación | En proceso               | Se hizo la solicitud y está en espera de respuesta        |
| S - ...       | Vigente   | Cancelable con aceptación | Solicitud rechazada      | Se hizo la solicitud y fue rechazada                      |

Cuando tienes un CFDI en estado _Cancelable con aceptación_
y mandas a hacer la cancelación entonces su estado de cancelación cambiaría a _En proceso_.

El receptor puede aceptar la cancelación (_Cancelado con aceptación_) o rechazarla (_Solicitud rechazada_).

Si es la _primera vez_ que se hace la solicitud, el receptor tiene 72 horas para aceptarla o rechazarla,
si no lo hace entonces automáticamente será cancelada (_Plazo vencido_).

Podrías volver a enviar la solicitud de cancelación _por segunda vez_ aun cuando la solicitud fue previamente rechazada.

En ese caso, el receptor puede aceptar o rechazar la cancelación, pero ya no aplicará un lapzo de 72 horas.
Por lo anterior entonces podrías tener el CFDI en estado de cancelación _en proceso_ indefinidamente.
Incluso, que la cancelación suceda meses después de lo esperado.

## Soporte

Puedes obtener soporte abriendo un ticket en Github.

Adicionalmente, esta librería pertenece a la comunidad [OcelotlStudio](https://ocelotlstudio.com), así que puedes usar los mismos canales de comunicación para obtener ayuda de algún miembro de la comunidad.

## Compatibilidad

Esta librería se mantendrá compatible con al menos la versión con
[soporte activo de Node](https://nodejs.org/es/about/releases/) más reciente.

También utilizamos [Versionado Semántico 2.0.0](https://semver.org/lang/es/) por lo que puedes usar esta librería sin temor a romper tu aplicación.

## Contribuciones

Las contribuciones con bienvenidas. Por favor lee [CONTRIBUTING][] para más detalles y recuerda revisar el archivo [CHANGELOG][].

## Copyright and License

The `@nodecfdi/sat-estado-cfdi` library is copyright © [NodeCfdi](https://github.com/nodecfdi) - [OcelotlStudio](https://ocelotlstudio.com) and licensed for use under the MIT License (MIT). Please see [LICENSE][] for more information.

[contributing]: https://github.com/nodecfdi/sat-estado-cfdi/blob/main/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/sat-estado-cfdi/blob/main/CHANGELOG.md
[source]: https://github.com/nodecfdi/sat-estado-cfdi
[node-version]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi
[license]: https://github.com/nodecfdi/sat-estado-cfdi/blob/main/LICENSE
[build]: https://github.com/nodecfdi/sat-estado-cfdi/actions/workflows/build.yml?query=branch:main
[reliability]: https://sonarcloud.io/component_measures?id=nodecfdi_sat-estado-cfdi&metric=Reliability
[maintainability]: https://sonarcloud.io/component_measures?id=nodecfdi_sat-estado-cfdi&metric=Maintainability
[coverage]: https://sonarcloud.io/component_measures?id=nodecfdi_sat-estado-cfdi&metric=Coverage
[violations]: https://sonarcloud.io/project/issues?id=nodecfdi_sat-estado-cfdi&resolved=false
[downloads]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi
[badge-source]: https://img.shields.io/badge/source-nodecfdi/sat--estado--cfdi-blue.svg?logo=github
[badge-node-version]: https://img.shields.io/node/v/@nodecfdi/sat-estado-cfdi.svg?logo=nodedotjs
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/sat-estado-cfdi.svg?logo=npm
[badge-license]: https://img.shields.io/github/license/nodecfdi/sat-estado-cfdi.svg?logo=open-source-initiative
[badge-build]: https://img.shields.io/github/actions/workflow/status/nodecfdi/sat-estado-cfdi/build.yml?branch=main
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_sat-estado-cfdi&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_sat-estado-cfdi&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_sat-estado-cfdi/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_sat-estado-cfdi/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/sat-estado-cfdi.svg?logo=npm
