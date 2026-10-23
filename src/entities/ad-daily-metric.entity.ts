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
import { Campaign } from './campaign.entity';

@Entity('ad_daily_metrics')
@Index('uq_ad_metric_campaign_date', ['campaignId', 'metricDate'], {
  unique: true,
})
@Check('chk_ad_impressions_nonnegative', '`impressions` >= 0')
@Check('chk_ad_clicks_nonnegative', '`clicks` >= 0')
@Check('chk_ad_cost_nonnegative', '`cost_amount` >= 0')
export class AdDailyMetric {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'campaign_id', type: 'bigint', unsigned: true })
  campaignId!: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.dailyMetrics, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign!: Campaign;

  @Column({ name: 'metric_date', type: 'date' })
  metricDate!: string;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  impressions!: string;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  clicks!: string;

  @Column({ name: 'cost_amount', type: 'decimal', precision: 18, scale: 6 })
  costAmount!: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 4,
    nullable: true,
  })
  conversions!: string | null;

  @Column({ name: 'currency_code', type: 'char', length: 3 })
  currencyCode!: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}