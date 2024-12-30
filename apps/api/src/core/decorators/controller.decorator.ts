import { applyDecorators, Controller as Contr } from '@nestjs/common';
import { Document } from './document.decorator';

interface CustomDecoratorOptions {
  route: string;
  document: string;
}

export function Controller(options: CustomDecoratorOptions) {
  const { route, document } = options;

  return applyDecorators(Contr(route), Document(document));
}
