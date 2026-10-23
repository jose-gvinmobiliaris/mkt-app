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

@Entity('seo_daily_metrics')
@Index(
  'uq_seo_metric_page_day',
  ['dataSourceId', 'metricDate', 'pageKeyHash'],
  { unique: true },
)
@Check('chk_seo_clicks_nonnegative', '`clicks` >= 0')
@Check('chk_seo_impressions_nonnegative', '`impressions` >= 0')
export class SeoDailyMetric {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'data_source_id', type: 'bigint', unsigned: true })
  dataSourceId!: string;

  @ManyToOne(() => DataSource, (source) => source.seoMetrics, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'data_source_id' })
  dataSource!: DataSource;

  @Column({ name: 'page_id', type: 'bigint', unsigned: true, nullable: true })
  pageId!: string | null;

  @ManyToOne(() => Page, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'page_id' })
  page!: Page | null;

  @Column({ name: 'metric_date', type: 'date' })
  metricDate!: string;

  @Column({ name: 'page_key_hash', type: 'char', length: 64 })
  pageKeyHash!: string;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  clicks!: string;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  impressions!: string;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: true,
  })
  ctr!: string | null;

  @Column({
    name: 'average_position',
    type: 'decimal',
    precision: 10,
    scale: 4,
    nullable: true,
  })
  averagePosition!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}