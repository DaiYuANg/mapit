import { Injectable } from '@nestjs/common';
import { AccessKeyService } from './access_key/access_key.service';
import { DictionaryService } from './dictionary/dictionary.service';
import { ProjectService } from './project/project.service';
import { DictionaryItemService } from './dictionary_item/dictionary_item.service';

@Injectable()
export class AppService {
  constructor(
    private readonly accessKeyService: AccessKeyService,
    private readonly dictionaryService: DictionaryService,
    private readonly projectService: ProjectService,
    private readonly dictionaryItemService: DictionaryItemService,
  ) {}

  async queryLabel(projectId: string, dictionaryCode: string, itemValue: string) {
    const project = await this.projectService.findOne(projectId);
    console.log(project);
    return 'Hello World!';
  }
}
