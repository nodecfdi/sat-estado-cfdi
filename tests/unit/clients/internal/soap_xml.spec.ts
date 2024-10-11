import { encode, EncodingMode } from 'entities';
import SoapXml from '#src/clients/internal/soap_xml';

describe('soap xml', () => {
  test('extract data from xml response', () => {
    const xml = [
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
      '    <s:Body>',
      '        <ResponseResponse xmlns="http://tempuri.org/">',
      '            <Result xmlns:a="http://tempuri.org/a" xmlns:b="http://tempuri.org/b">',
      '                <first>x-first</first>',
      '                <a:second>x-second</a:second>',
      '                <b:third>x-third</b:third>',
      '            </Result>',
      '            <Result xmlns:a="http://tempuri.org/a" xmlns:b="http://tempuri.org/b">',
      '                <first>must be ignored</first>',
      '            </Result>',
      '        </ResponseResponse>',
      '    </s:Body>',
      '</s:Envelope>',
    ].join('\n');

    const soapXml = new SoapXml();
    const extracted = soapXml.extractDataFromXmlResponse(xml, 'Result');
    const expected = {
      first: 'x-first',
      second: 'x-second',
      third: 'x-third',
    };

    assert.deepEqual(extracted, expected);
  });

  test('extract data from xml response with incorrect xml', () => {
    const xml = [
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
      '    <s:Body>',
      '        <s:Fault>',
      '            <s:faultcode>SOAP-ENV:Server</s:faultcode>',
      '            <s:faultstring>Internal Server Error</s:faultstring>',
      '        </s:Fault>',
      '    </s:Body>',
      '</s:Envelope>',
    ].join('\n');

    const soapXml = new SoapXml();
    const extracted = soapXml.extractDataFromXmlResponse(xml, 'Result');
    const expected = {};

    assert.deepEqual(extracted, expected);
  });

  test('create consumer client response', () => {
    const expression = 'Expresión con caracters & y Ñ';

    const expressionXml = encode(expression, { mode: EncodingMode.UTF8 });
    const expected = [
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
      '    <s:Body>',
      '        <c:Consulta xmlns:c="http://tempuri.org/">',
      `            <c:expresionImpresa>${expressionXml}</c:expresionImpresa>`,
      '        </c:Consulta>',
      '    </s:Body>',
      '</s:Envelope>',
    ].join('\n');

    const soapXml = new SoapXml();
    const createdXml = soapXml.createXmlRequest(expression);

    // eslint-disable-next-line vitest/valid-expect
    expect(createdXml).xml.to.deep.equal(expected);
  });

  test('extract data from xml response when is empty', () => {
    const soapXml = new SoapXml();
    const extracted = soapXml.extractDataFromXmlResponse('', 'root');

    assert.deepEqual(extracted, {});
  });
});
