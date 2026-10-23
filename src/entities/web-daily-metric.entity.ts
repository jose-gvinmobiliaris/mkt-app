import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataSource } from './data-source.entity';
import { Page } from './page.entity';

@Entity('web_daily_metrics')
@Index(
  'uq_web_metric_dimensions',
  ['dataSourceId', 'metricDate', 'dimensionKey'],
  { unique: true },
)
@Check('chk_web_sessions_nonnegative', '`sessions` >= 0')
@Check('chk_web_users_nonnegative', '`total_users` >= 0')
export class WebDailyMetric {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'data_source_id', type: 'bigint', unsigned: true })
  dataSourceId!: string;

  @ManyToOne(() => DataSource, (source) => source.webMetrics, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'data_source_id' })
  dataSource!: DataSource;

  @Column({ name: 'metric_date', type: 'date' })
  metricDate!: string;

  @Column({ name: 'page_id', type: 'bigint', unsigned: true, nullable: true })
  pageId!: string | null;

  @ManyToOne(() => Page, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'page_id' })
  page!: Page | null;

  @Column({ name: 'dimension_key', type: 'char', length: 64 })
  dimensionKey!: string;

  @Column({ type: 'varchar', length: 150, default: 'unknown' })
  source!: string;

  @Column({ type: 'varchar', length: 150, default: 'unknown' })
  medium!: string;

  @Column({
    name: 'campaign_name',
    type: 'varchar',
    length: 255,
    default: 'unknown',
  })
  campaignName!: string;

  @Column({
    name: 'device_category',
    type: 'varchar',
    length: 40,
    default: 'unknown',
  })
  deviceCategory!: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  sessions!: string | null;

  @Column({ name: 'total_users', type: 'bigint', unsigned: true, nullable: true })
  totalUsers!: string | null;

  @Column({
    name: 'engaged_sessions',
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
  engagedSessions!: string | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  views!: string | null;

  @Column({
    name: 'engagement_rate',
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: true,
  })
  engagementRate!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}