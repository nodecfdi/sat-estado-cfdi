const Constants = {
  WebServiceUriProduction:
    'https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc',
  WebServiceUriDevelopment: 'https://pruebacfdiconsultaqr.cloudapp.net/ConsultaCFDIService.svc',
  SoapAction: 'http://tempuri.org/IConsultaCFDIService/Consulta',
  SoapMethod: 'Consulta',
  XmlnsSoapUri: 'http://tempuri.org/',
  XmlnsEnvelope: 'http://schemas.xmlsoap.org/soap/envelope/',
} as const;

export default Constants;
