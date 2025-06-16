import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { TableNaming } from '../constant/table';
import { baseTableOptions } from './base.table.option';

class InitDatabase1749804669929 implements MigrationInterface {
  name?: string | undefined = 'InitDatabase1749804669929';
  transaction?: boolean | undefined;

  async up(queryRunner: QueryRunner): Promise<void> {
    await this.createProject(queryRunner);
    await this.createDictionary(queryRunner);
    await this.createDictionaryItem(queryRunner);
    await this.createAccessKey(queryRunner);
    await this.createUser(queryRunner);
  }

  private async createDictionary(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: TableNaming.DICTIONARY,
        columns: [
          ...baseTableOptions,
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'projectId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  private async createProject(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: TableNaming.PROJECT,
        columns: [
          ...baseTableOptions,
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'projectType',
            type: 'int',
            isNullable: false,
            default: '0',
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndex(
      TableNaming.PROJECT,
      new TableIndex({
        name: 'IDX_PROJECT_TYPE',
        columnNames: ['projectType'],
      }),
    );
  }

  private async createDictionaryItem(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: TableNaming.DICTIONARY_ITEM,
        columns: [
          ...baseTableOptions,
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sort',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'dictionaryId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'extra',
            type: queryRunner.connection.driver.options.type === 'postgres' ? 'jsonb' : 'json',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  private async createAccessKey(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: TableNaming.ACCESS_KEY,
        columns: [
          ...baseTableOptions,
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'projectId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'key',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'secret',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'permissions',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'usageCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'lastUsedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'remark',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  private async createUser(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          ...baseTableOptions,
          {
            name: 'username',
            type: 'varchar',
            length: '64',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '128',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableNaming.PROJECT);
    await queryRunner.dropTable(TableNaming.DICTIONARY);
    await queryRunner.dropTable(TableNaming.DICTIONARY_ITEM);
    await queryRunner.dropTable(TableNaming.ACCESS_KEY);
    await queryRunner.dropTable(TableNaming.USER);
  }
}

export { InitDatabase1749804669929 };
