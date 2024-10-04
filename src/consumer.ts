import type CfdiStatus from '#src/cfdi_status';
import { type ConsumerClientInterface } from '#src/types';
import CfdiStatusBuilder from '#src/utils/cfdi_status_builder';
import Constants from '#src/utils/constants';

export default class Consumer {
  public constructor(
    public readonly client: ConsumerClientInterface,
    public readonly uri: string = Constants.WebServiceUriProduction,
  ) {}

  public async execute(expression: string): Promise<CfdiStatus> {
    const responseConsumer = await this.client.consume(this.uri, expression);

    const builder = new CfdiStatusBuilder(
      responseConsumer.get('CodigoEstatus'),
      responseConsumer.get('Estado'),
      responseConsumer.get('EsCancelable'),
      responseConsumer.get('EstatusCancelacion'),
      responseConsumer.get('ValidacionEFOS'),
      responseConsumer.raw(),
    );

    return builder.create();
  }
}
