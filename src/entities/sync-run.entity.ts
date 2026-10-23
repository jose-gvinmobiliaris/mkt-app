import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Integration } from './integration.entity';
import { DataSource } from './data-source.entity';

export enum SyncStatus {
  RUNNING = 'running',
  SUCCESS = 'success',
  PARTIAL = 'partial',
  FAILED = 'failed',
}

@Entity('sync_runs')
export class SyncRun {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'integration_id', type: 'bigint', unsigned: true })
  integrationId!: string;

  @ManyToOne(() => Integration, (integration) => integration.syncRuns, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'integration_id' })
  integration!: Integration;

  @Column({ name: 'data_source_id', type: 'bigint', unsigned: true, nullable: true })
  dataSourceId!: string | null;

  @ManyToOne(() => DataSource, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'data_source_id' })
  dataSource!: DataSource | null;

  @Column({ name: 'started_at', type: 'datetime' })
  startedAt!: Date;

  @Column({ name: 'finished_at', type: 'datetime', nullable: true })
  finishedAt!: Date | null;

  @Column({ type: 'enum', enum: SyncStatus, default: SyncStatus.RUNNING })
  status!: SyncStatus;

  @Column({ name: 'records_read', type: 'int', unsigned: true, default: 0 })
  recordsRead!: number;

  @Column({ name: 'records_inserted', type: 'int', unsigned: true, default: 0 })
  recordsInserted!: number;

  @Column({ name: 'records_updated', type: 'int', unsigned: true, default: 0 })
  recordsUpdated!: number;

  @Column({ name: 'error_summary', type: 'text', nullable: true })
  errorSummary!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;
}