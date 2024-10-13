import axios from 'axios';
import SoapXml from '#src/clients/internal/soap_xml';
import { type ConsumerClientInterface, type ConsumerClientResponseInterface } from '#src/types';
import Constants from '#src/utils/constants';
import ConsumerClientResponse from '#src/utils/consumer_client_response';

export class AxiosConsumerClient implements ConsumerClientInterface {
  private readonly _soapXml: SoapXml;

  public constructor() {
    this._soapXml = new SoapXml();
  }

  public async consume(uri: string, expression: string): Promise<ConsumerClientResponseInterface> {
    const xml = this._soapXml.createXmlRequest(expression);

    const response = await axios.post<string>(uri, xml, {
      headers: { 'Content-Type': 'text/xml; charset=utf-8', 'SOAPAction': Constants.SoapAction },
      responseType: 'text',
    });

    const resultXml = response.data;
    const values = this._soapXml.extractDataFromXmlResponse(resultXml, 'ConsultaResult');

    return new ConsumerClientResponse(values);
  }
}
