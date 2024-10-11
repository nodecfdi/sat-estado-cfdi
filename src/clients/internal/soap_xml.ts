import {
  type Document,
  type Element,
  getSerializer,
  isElement,
  newDocument,
  newDocumentContent,
} from '@nodecfdi/cfdi-core';
import Constants from '#src/utils/constants';

/**
 * Class to create requests and process responses
 */
export default class SoapXml {
  public createXmlRequest(expression: string): string {
    const soap = Constants.XmlnsEnvelope;
    const document = newDocument();
    document
      .appendChild(document.createElementNS(soap, 's:Envelope'))
      .appendChild(document.createElementNS(soap, 's:Body'))
      .appendChild(document.createElementNS(Constants.XmlnsSoapUri, 'c:Consulta'))
      .appendChild(document.createElementNS(Constants.XmlnsSoapUri, 'c:expresionImpresa'))
      .appendChild(document.createTextNode(expression));

    return getSerializer().serializeToString(document);
  }

  public extractDataFromXmlResponse(
    xmlResponse: string,
    elementName: string,
  ): Record<string, string> {
    if (xmlResponse.trim() === '') {
      return {};
    }

    const document = newDocumentContent(xmlResponse);
    const consultaResult = this.obtainFirstElement(document, elementName);
    if (!consultaResult) {
      return {};
    }

    const extracted: Record<string, string> = {};
    for (const children of consultaResult.childNodes) {
      if (!isElement(children)) {
        continue;
      }

      if (children.localName && children.textContent) {
        extracted[children.localName] = children.textContent;
      }
    }

    return extracted;
  }

  private obtainFirstElement(document: Document, elementName: string): Element | undefined {
    const elements = document.getElementsByTagNameNS(Constants.XmlnsSoapUri, elementName);

    return elements.length === 0 ? undefined : (elements.item(0) ?? undefined);
  }
}
