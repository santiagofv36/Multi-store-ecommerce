import { Body, Controller } from '@nestjs/common';
import { StoreService } from './store.service';
import { createStoreInput, TCreateStoreInput } from '@packages/models';
import { Base } from '../../core/decorators/global.decorator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Base('POST', {
    route: '',
    zodSchema: createStoreInput,
    roles: ['superadmin', 'admin'],
    operation: 'create',
  })
  async create(@Body() data: TCreateStoreInput) {
    return await this.storeService.createStore(data);
  }

  @Base('GET', {
    route: '',
    operation: 'read',
    anonymous: true,
  })
  async find() {
    return await this.storeService.find({});
  }
}
