import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { DictionaryService } from './dictionary/dictionary.service';

@Injectable()
export class AppService {
  queryLabel(projectId: string, dictionaryCode: string, itemValue: string): string {
    return 'Hello World!';
  }
}
