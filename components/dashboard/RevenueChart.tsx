import React, { useState, useMemo } from 'react';
import { Card, Radio, Typography } from 'antd';
import styled from '@emotion/styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartPeriod } from '../../types/enums';
import { formatCurrency } from '../../utils/formatters';
import { generateChartData } from '../../data/chartMockData';
import type { RevenueDataPoint } from '../../types/schema';

const { Title } = Typography;

const ChartCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  
  .ant-card-body {
    padding: 24px;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ChartTitle = styled(Title)`
  margin: 0 !important;
  color: #111827 !important;
`;

const PeriodSelector = styled(Radio.Group)`
  border-radius: 8px;
`;

const TooltipContainer = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.p`
  margin: 0;
  font-weight: 500;
  color: #111827;
`;

const TooltipValue = styled.p`
  margin: 0;
  color: #8B5CF6;
`;

interface RevenueChartProps {
  data: RevenueDataPoint[];
  currentMonth?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, currentMonth = 11 }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>(ChartPeriod.MONTHLY);
  
  const chartData = useMemo(() => {
    return generateChartData(selectedPeriod);
  }, [selectedPeriod]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <TooltipContainer>
          <TooltipLabel>
            {label}
          </TooltipLabel>
          <TooltipValue>
            Revenue: {formatCurrency(payload[0].value)}
          </TooltipValue>
        </TooltipContainer>
      );
    }
    return null;
  };

  const periodOptions = [
    { label: 'Daily', value: ChartPeriod.DAILY },
    { label: 'Weekly', value: ChartPeriod.WEEKLY },
    { label: 'Monthly', value: ChartPeriod.MONTHLY },
    { label: 'Yearly', value: ChartPeriod.YEARLY }
  ];

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle level={4}>
          Monthly Revenue
        </ChartTitle>
        
        <PeriodSelector
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          size="small"
        >
          {periodOptions.map(option => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </PeriodSelector>
      </ChartHeader>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="revenue" 
            fill="#8B5CF6"
            radius={[4, 4, 0, 0]}
            stroke="#7C3AED"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RevenueChart;