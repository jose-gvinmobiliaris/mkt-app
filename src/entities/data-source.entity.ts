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
import { Integration } from './integration.entity';
import { WebDailyMetric } from './web-daily-metric.entity';
import { SeoDailyMetric } from './seo-daily-metric.entity';

export enum DataSourceType {
  ADS_ACCOUNT = 'ads_account',
  GA4_PROPERTY = 'ga4_property',
  SEARCH_CONSOLE_SITE = 'search_console_site',
}

@Entity('data_sources')
@Index(
  'uq_data_source_external_resource',
  ['integrationId', 'resourceType', 'externalResourceId'],
  { unique: true },
)
export class DataSource {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ name: 'integration_id', type: 'bigint', unsigned: true })
  integrationId!: string;

  @ManyToOne(() => Integration, (integration) => integration.dataSources, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'integration_id' })
  integration!: Integration;

  @Column({
    name: 'resource_type',
    type: 'enum',
    enum: DataSourceType,
  })
  resourceType!: DataSourceType;

  @Column({ name: 'external_resource_id', type: 'varchar', length: 255 })
  externalResourceId!: string;

  @Column({ name: 'resource_name', type: 'varchar', length: 255 })
  resourceName!: string;

  @Column({ name: 'currency_code', type: 'char', length: 3, nullable: true })
  currencyCode!: string | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  timezone!: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => WebDailyMetric, (metric) => metric.dataSource)
  webMetrics!: WebDailyMetric[];

  @OneToMany(() => SeoDailyMetric, (metric) => metric.dataSource)
  seoMetrics!: SeoDailyMetric[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}