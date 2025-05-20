import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryItemController } from './dictionary_item.controller';
import { DictionaryItemService } from './dictionary_item.service';

describe('DictionaryItemController', () => {
  let controller: DictionaryItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictionaryItemController],
      providers: [DictionaryItemService],
    }).compile();

    controller = module.get<DictionaryItemController>(DictionaryItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
