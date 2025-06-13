import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

const baseTableOptions: Array<TableColumnOptions> = [
  {
    type: 'varchar',
    isPrimary: true,
    generationStrategy: 'uuid',
    name: 'id',
  },
  {
    type: 'timestamp',
    name: 'createdAt',
    isNullable: false,
  },
  {
    type: 'timestamp',
    name: 'updatedAt',
    isNullable: true,
  },
  {
    type: 'timestamp',
    isNullable: true,
    name: 'deletedAt',
  },
];

export { baseTableOptions };
