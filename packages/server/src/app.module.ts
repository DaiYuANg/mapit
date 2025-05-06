import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DictionaryModule} from './dictionary/dictionary.module';
import {ProjectModule} from './project/project.module';
import {DictionaryItemModule} from './dictionary_item/dictionary_item.module';
import {ScheduleModule} from "@nestjs/schedule";
import {Dictionary} from "./dictionary/entities/dictionary.entity";
import {DictionaryItem} from "./dictionary_item/entities/dictionary_item.entity";
import {Project} from "./project/entities/project.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'mapit.db',
      synchronize: true,
      entities: [Dictionary, DictionaryItem, Project],
      autoLoadEntities: true,
    }),
    DictionaryModule,
    ProjectModule,
    DictionaryItemModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
