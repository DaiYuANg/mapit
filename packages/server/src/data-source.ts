// src/data-source.ts
import { DataSource } from 'typeorm';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { DictionaryItem } from './dictionary_item/entities/dictionary_item.entity';
import { Project } from './project/entities/project.entity';
import { AccessKey } from './access_key/entities/access_key.entity';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'mapit.db',
  entities: [Dictionary, DictionaryItem, Project, AccessKey, User],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'type_orm_migrations',
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()