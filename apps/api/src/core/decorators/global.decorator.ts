import {
  applyDecorators,
  UseGuards,
  UsePipes,
  Post,
  Get,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Operation } from './operation.decorator';
import { Document } from './document.decorator';
import { TPermissionsEnum } from '@packages/models';

type MethodDecorator = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface CustomDecoratorOptions {
  zodSchema?: any;
  operation?: TPermissionsEnum;
  route?: string;
  anonymous?: boolean;
  document?: string;
}

export function Base(
  method: MethodDecorator,
  options: CustomDecoratorOptions = {},
) {
  const {
    zodSchema,
    operation,
    route = '',
    anonymous = false,
    document,
  } = options;

  const methodDecorator = (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const decoratorsToApply = [];

    switch (method) {
      case 'GET':
        decoratorsToApply.push(Get(route));
        break;
      case 'POST':
        decoratorsToApply.push(Post(route));
        break;
      case 'PUT':
        decoratorsToApply.push(Put(route));
        break;
      case 'DELETE':
        decoratorsToApply.push(Delete(route));
        break;
      case 'PATCH':
        decoratorsToApply.push(Patch(route));
        break;
      default:
        throw new Error('Invalid method');
    }

    // Apply Zod Validation Pipe
    if (zodSchema) {
      decoratorsToApply.push(UsePipes(new ZodValidationPipe(zodSchema)));
    }

    // If anonymous is false, apply AuthGuard and RolesGuard decorators
    if (!anonymous) {
      decoratorsToApply.push(UseGuards(AuthGuard('jwt')));
      decoratorsToApply.push(UseGuards(RolesGuard));
      if (operation) {
        decoratorsToApply.push(Operation(operation));
      }
      if (document) {
        decoratorsToApply.push(Document(document));
      }
    }

    return applyDecorators(...decoratorsToApply)(target, key, descriptor);
  };

  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    return methodDecorator(target, key, descriptor);
  };
}
