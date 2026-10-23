import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataSource } from './data-source.entity';
import { AdDailyMetric } from './ad-daily-metric.entity';

@Entity('campaigns')
@Index(
  'uq_campaign_external_id',
  ['dataSourceId', 'externalCampaignId'],
  { unique: true },
)
export class Campaign {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'data_source_id', type: 'bigint', unsigned: true })
  dataSourceId!: string;

  @ManyToOne(() => DataSource, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'data_source_id' })
  dataSource!: DataSource;

  @Column({ name: 'external_campaign_id', type: 'varchar', length: 100 })
  externalCampaignId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  status!: string | null;

  @Column({ name: 'campaign_type', type: 'varchar', length: 50, nullable: true })
  campaignType!: string | null;

  @Column({ name: 'first_seen_at', type: 'datetime', nullable: true })
  firstSeenAt!: Date | null;

  @Column({ name: 'last_seen_at', type: 'datetime', nullable: true })
  lastSeenAt!: Date | null;

  @OneToMany(() => AdDailyMetric, (metric) => metric.campaign)
  dailyMetrics!: AdDailyMetric[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}