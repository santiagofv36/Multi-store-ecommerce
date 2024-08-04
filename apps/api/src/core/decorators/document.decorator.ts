import { SetMetadata } from '@nestjs/common';

export const Document = (document: string) => SetMetadata('document', document);
