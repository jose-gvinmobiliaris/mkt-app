import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataSource } from './data-source.entity';
import { SyncRun } from './sync-run.entity';

export enum IntegrationProvider {
  GOOGLE_ADS = 'google_ads',
  GA4 = 'ga4',
  SEARCH_CONSOLE = 'search_console',
}

export enum IntegrationStatus {
  PENDING = 'pending',
  CONNECTED = 'connected',
  ERROR = 'error',
  DISABLED = 'disabled',
}

@Entity('integrations')
export class Integration {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({
    type: 'enum',
    enum: IntegrationProvider,
  })
  provider!: IntegrationProvider;

  @Column({ name: 'display_name', type: 'varchar', length: 120 })
  displayName!: string;

  @Column({
    type: 'enum',
    enum: IntegrationStatus,
    default: IntegrationStatus.PENDING,
  })
  status!: IntegrationStatus;

  @Column({
    name: 'external_account_email',
    type: 'varchar',
    length: 190,
    nullable: true,
  })
  externalAccountEmail!: string | null;

  // Guardar únicamente valores cifrados por el backend.
  @Column({
    name: 'access_token_encrypted',
    type: 'text',
    nullable: true,
    select: false,
  })
  accessTokenEncrypted!: string | null;

  @Column({
    name: 'refresh_token_encrypted',
    type: 'text',
    nullable: true,
    select: false,
  })
  refreshTokenEncrypted!: string | null;

  @Column({
    name: 'token_expires_at',
    type: 'datetime',
    nullable: true,
  })
  tokenExpiresAt!: Date | null;

  @Column({ type: 'text', nullable: true })
  scopes!: string | null;

  @Column({ name: 'connected_at', type: 'datetime', nullable: true })
  connectedAt!: Date | null;

  @Column({ name: 'last_sync_at', type: 'datetime', nullable: true })
  lastSyncAt!: Date | null;

  @OneToMany(() => DataSource, (source) => source.integration)
  dataSources!: DataSource[];

  @OneToMany(() => SyncRun, (run) => run.integration)
  syncRuns!: SyncRun[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}