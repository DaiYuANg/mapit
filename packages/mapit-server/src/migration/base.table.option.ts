import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

const baseTableOptions: Array<TableColumnOptions> = [
  {
    type: 'varchar',
    isPrimary: true,
    name: 'id',
    isNullable: false,
  },
  {
    type: 'timestamp',
    name: 'createdAt',
    isNullable: false,
    default: 'CURRENT_TIMESTAMP',
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
