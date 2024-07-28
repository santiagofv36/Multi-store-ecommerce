import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AddressService } from './address.service';
import { ZodValidationPipe } from '../../core/pipes';
import { createAddressInput, TCreateAddressInput } from '@packages/models';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('')
  @UsePipes(new ZodValidationPipe(createAddressInput))
  create(@Body() data: TCreateAddressInput) {
    return this.addressService.createAddress(data);
  }

  @Get('')
  async find() {
    return this.addressService.find({});
  }
}
