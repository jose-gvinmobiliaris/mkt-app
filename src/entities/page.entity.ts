import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

export enum PageType {
  LANDING = 'landing',
  PROJECT = 'project',
  CONTACT = 'contact',
  GENERAL = 'general',
  OTHER = 'other',
}

@Entity('pages')
@Index('uq_page_url_hash', ['urlHash'], { unique: true })
export class Page {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'project_id', type: 'bigint', unsigned: true, nullable: true })
  projectId!: string | null;

  @ManyToOne(() => Project, (project) => project.pages, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'project_id' })
  project!: Project | null;

  @Column({ name: 'canonical_url', type: 'varchar', length: 2048 })
  canonicalUrl!: string;

  @Column({ name: 'url_hash', type: 'char', length: 64 })
  urlHash!: string;

  @Column({ type: 'varchar', length: 1024 })
  path!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title!: string | null;

  @Column({
    name: 'page_type',
    type: 'enum',
    enum: PageType,
    default: PageType.OTHER,
  })
  pageType!: PageType;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}