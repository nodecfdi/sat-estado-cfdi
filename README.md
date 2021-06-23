# nodecfdi/sat-estado-cfdi

[![Source Code][badge-source]][source]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]

[source]: https://github.com/nodecfdi/sat-estado-cfdi
[badge-source]: https://img.shields.io/badge/source-nodecfdi%2Fsat--estado--cfdi-blue?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiwxMy40Yy0xMC41LDAtMTksOC41LTE5LDE5YzAsOC40LDUuNSwxNS41LDEzLDE4YzEsMC4yLDEuMy0wLjQsMS4zLTAuOWMwLTAuNSwwLTEuNywwLTMuMiBjLTUuMywxLjEtNi40LTIuNi02LjQtMi42QzIwLDQxLjYsMTguOCw0MSwxOC44LDQxYy0xLjctMS4yLDAuMS0xLjEsMC4xLTEuMWMxLjksMC4xLDIuOSwyLDIuOSwyYzEuNywyLjksNC41LDIuMSw1LjUsMS42IGMwLjItMS4yLDAuNy0yLjEsMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEsMC43LTMuNywyLTUuMWMtMC4yLTAuNS0wLjgtMi40LDAuMi01YzAsMCwxLjYtMC41LDUuMiwyIGMxLjUtMC40LDMuMS0wLjcsNC44LTAuN2MxLjYsMCwzLjMsMC4yLDQuNywwLjdjMy42LTIuNCw1LjItMiw1LjItMmMxLDIuNiwwLjQsNC42LDAuMiw1YzEuMiwxLjMsMiwzLDIsNS4xYzAsNy4zLTQuNSw4LjktOC43LDkuNCBjMC43LDAuNiwxLjMsMS43LDEuMywzLjVjMCwyLjYsMCw0LjYsMCw1LjJjMCwwLjUsMC40LDEuMSwxLjMsMC45YzcuNS0yLjYsMTMtOS43LDEzLTE4LjFDNTEsMjEuOSw0Mi41LDEzLjQsMzIsMTMuNHoiLz48L3N2Zz4%3D
[license]: https://github.com/nodecfdi/sat-estado-cfdi/blob/master/LICENSE
[badge-license]: https://img.shields.io/github/license/nodecfdi/sat-estado-cfdi?logo=open-source-initiative&style=flat-square
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/sat-estado-cfdi
[release]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi

> Consulta el estado de un CFDI en el webservice del SAT


 Esta librería contiene objetos de ayuda para consumir el **Servicio de Consulta de CFDI del SAT**.
La documentación del proyecto está en español porque ese es el lenguaje de los usuarios que la utilizarán. Esta librería está inspirada en: https://github.com/phpcfdi/sat-estado-cfdi/

**Servicio de Consulta de CFDI del SAT**:

- Servicio productivo: <https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc>
- Servicio de pruebas: <https://pruebacfdiconsultaqr.cloudapp.net/ConsultaCFDIService.svc>
- SAT: <https://www.sat.gob.mx/consultas/20585/conoce-los-servicios-especializados-de-validacion>
- Documentación del Servicio de Consulta de CFDIVersión 1.3 (2020-11-18):
  <https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1579314559300&ssbinary=true>

## Instalación

```shell
npm i @nodecfdi/sat-estado-cfdi --save
```
o 
```shell
yarn add @nodecfdi/sat-estado-cfdi
```

## Ejemplo básico de uso

```ts
import { ConsumerClientInterface } from '@nodecfdi/sat-estado-cfdi';

//el cliente debe implementar ConsumerClientInterface
const client = Client()
const consumer = new Consumer(client);

const cfdiStatus = consumer.execute('...expression');

if (cfdiStatus.getCancellable().isNotCancellable()) {
    console.log('CFDI no es cancelable');
}
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
    - `found`: Si el estado inicia con `S - `.
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

#### Estados mutuamente excluyentes:

CodigoEstatus | Estado        | EsCancelable              | EstatusCancelacion       | Explicación
------------- | ------------- | ------------------------- | ------------------------ | -----------------------------------------------------
N - ...       | *             | *                         | *                        | El SAT no sabe del CFDI con la expresión dada
S - ...       | Cancelado     | *                         | Plazo vencido            | Cancelado por plazo vencido
S - ...       | Cancelado     | *                         | Cancelado con aceptación | Cancelado con aceptación del receptor
S - ...       | Cancelado     | *                         | Cancelado sin aceptación | No fue requerido preguntarle al receptor y se canceló
S - ...       | Vigente       | No cancelable             | *                        | No se puede cancelar
S - ...       | Vigente       | Cancelable sin aceptación | *                        | Se puede cancelar, pero no se ha realizado la cancelación
S - ...       | Vigente       | Cancelable con aceptación | (ninguno)                | Se puede cancelar, pero no se ha realizado la solicitud
S - ...       | Vigente       | Cancelable con aceptación | En proceso               | Se hizo la solicitud y está en espera de respuesta
S - ...       | Vigente       | Cancelable con aceptación | Solicitud rechazada      | Se hizo la solicitud y fue rechazada

Cuando tienes un CFDI en estado *Cancelable con aceptación*
y mandas a hacer la cancelación entonces su estado de cancelación cambiaría a *En proceso*.

El receptor puede aceptar la cancelación (*Cancelado con aceptación*) o rechazarla (*Solicitud rechazada*).

Si es la *primera vez* que se hace la solicitud, el receptor tiene 72 horas para aceptarla o rechazarla,
si no lo hace entonces automáticamente será cancelada (*Plazo vencido*).

Podrías volver a enviar la solicitud de cancelación *por segunda vez* aun cuando la solicitud fue previamente rechazada.

En ese caso, el receptor puede aceptar o rechazar la cancelación, pero ya no aplicará un lapzo de 72 horas.
Por lo anterior entonces podrías tener el CFDI en estado de cancelación *en proceso* indefinidamente.
Incluso, que la cancelación suceda meses después de lo esperado.