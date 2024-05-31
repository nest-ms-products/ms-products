import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ProductMessages } from '../common/enums/messages-tcp.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(ProductMessages.Create)
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern(ProductMessages.FindAll)
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern(ProductMessages.FindOne)
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern(ProductMessages.Update)
  update(
    @Payload()
    payload: {
      id: number;
      updateProductDto: UpdateProductDto;
    },
  ) {
    return this.productsService.update(payload.id, payload.updateProductDto);
  }

  @MessagePattern(ProductMessages.Delete)
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern(ProductMessages.ValidateProducts)
  validateProducts(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
