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

Esta librería contiene objetos de ayuda para consumir el **Servicio de Consulta de CFDI del SAT**. Esta librería solo permite verificar el estado de un CFDI Regular y no de CFDI de Retenciones e información de pagos.

Esta librería está inspirada en: <https://github.com/phpcfdi/sat-estado-cfdi/>

**Servicio de Consulta de CFDI del SAT**:

- Servicio productivo: <https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc>
- Servicio de pruebas: <https://pruebacfdiconsultaqr.cloudapp.net/ConsultaCFDIService.svc>
- SAT: <https://www.sat.gob.mx/consultas/20585/conoce-los-servicios-especializados-de-validacion>
- Documentación del Servicio de Consulta de CFDIVersión 1.4 (noviembre 2022):
  <https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1461175223997&ssbinary=true>

## Documentación

La documentación esta disponible en el sitio web [NodeCfdi](https://nodecfdi.com/librarys/sat-estado-cfdi/getting-started/)

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

[contributing]: https://github.com/nodecfdi/.github/blob/main/docs/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/sat-estado-cfdi/blob/main/CHANGELOG.md
[source]: https://github.com/nodecfdi/sat-estado-cfdi
[node-version]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi
[license]: https://github.com/nodecfdi/sat-estado-cfdi/blob/main/LICENSE.md
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
[badge-build]: https://img.shields.io/github/actions/workflow/status/nodecfdi/sat-estado-cfdi/build.yml?branch=main&logo=github-actions
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_sat-estado-cfdi&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_sat-estado-cfdi&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_sat-estado-cfdi/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_sat-estado-cfdi/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/sat-estado-cfdi.svg?logo=npm
