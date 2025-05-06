import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryItemService } from './dictionary_item.service';

describe('DictionaryItemService', () => {
  let service: DictionaryItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryItemService],
    }).compile();

    service = module.get<DictionaryItemService>(DictionaryItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
