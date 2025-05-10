import { Project } from '../../project/entities/project.entity';

export class CreateAccessKeyDto {
  key: string;

  secret: string;

  project: Project;

  permissions: string; // 例如：'read', 'write', 'admin'

  status: string;

  expiresAt: Date;
}
