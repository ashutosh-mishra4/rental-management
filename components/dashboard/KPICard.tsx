import React from 'react';
import { Card, Typography, Space } from 'antd';
import styled from '@emotion/styled';
import { DollarSign, FileText, Users, TrendingUp } from 'lucide-react';
import DeltaBadge from '../common/DeltaBadge';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import type { KPIMetric } from '../../types/schema';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  height: 140px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  
  .ant-card-body {
    padding: 20px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardTitle = styled(Text)`
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  color: #8B5CF6;
`;

const ValueTitle = styled(Title)`
  margin: 0 !important;
  font-size: 28px !important;
  font-weight: 700 !important;
  color: #111827 !important;
  line-height: 1.2 !important;
`;

const CardSpace = styled(Space)`
  width: 100%;
`;

interface KPICardProps {
  title: string;
  metric: KPIMetric;
  type: 'revenue' | 'invoices' | 'tenants' | 'payment-rate';
}

const KPICard: React.FC<KPICardProps> = ({ title, metric, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'revenue':
        return <DollarSign size={24} />;
      case 'invoices':
        return <FileText size={24} />;
      case 'tenants':
        return <Users size={24} />;
      case 'payment-rate':
        return <TrendingUp size={24} />;
      default:
        return <DollarSign size={24} />;
    }
  };

  const formatValue = () => {
    switch (type) {
      case 'revenue':
        return formatCurrency(metric.value);
      case 'payment-rate':
        return formatPercentage(metric.value);
      default:
        return metric.value.toLocaleString();
    }
  };

  return (
    <StyledCard>
      <CardSpace direction="vertical" size={8}>
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
          <IconWrapper>
            {getIcon()}
          </IconWrapper>
        </CardHeader>
        
        <ValueTitle level={2}>
          {formatValue()}
        </ValueTitle>
        
        <DeltaBadge delta={metric.delta} isPositive={metric.isPositive} />
      </CardSpace>
    </StyledCard>
  );
};

export default KPICard;