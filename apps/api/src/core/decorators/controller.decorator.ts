import { applyDecorators, Controller } from '@nestjs/common';
import { Document } from './document.decorator';

interface CustomDecoratorOptions {
  route: string;
  document: string;
}

export function CustomController(options: CustomDecoratorOptions) {
  const { route, document } = options;

  return applyDecorators(Controller(route), Document(document));
}
