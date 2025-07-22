import React, { useState } from 'react';
import { Layout, Row, Col, Spin } from 'antd';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import KPICard from './KPICard';
import RevenueChart from './RevenueChart';
import ActivityTimeline from './ActivityTimeline';
import PaymentsTable from './PaymentsTable';
import PaymentDetailsPanel from './PaymentDetailsPanel';
import { 
  useGetKPIDataQuery,
  useGetRevenueChartQuery,
  useGetActivitiesQuery,
  useGetRecentPaymentsQuery
} from '../../store';
import { ChartPeriod } from '../../types/enums';
import type { Payment } from '../../types/schema';

const { Content } = Layout;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DashboardLayout = styled(Layout)`
  min-height: 100vh;
  background: #F9FAFB;
`;

const DashboardContent = styled(Content)<{ sidebarWidth: number; topBarHeight: number }>`
  margin-left: ${props => props.sidebarWidth}px;
  margin-top: ${props => props.topBarHeight}px;
  padding: 24px;
  background: #F9FAFB;
`;

const StyledRow = styled(Row)`
  margin-bottom: 24px;
`;

interface DashboardProps {
  selectedPeriod?: ChartPeriod;
  currentMonth?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  selectedPeriod = ChartPeriod.MONTHLY,
  currentMonth = 11 
}) => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const { data: kpiData, isLoading: kpiLoading } = useGetKPIDataQuery(undefined);
  const { data: revenueData, isLoading: revenueLoading } = useGetRevenueChartQuery(selectedPeriod);
  const { data: activities, isLoading: activitiesLoading } = useGetActivitiesQuery(10);
  const { data: payments, isLoading: paymentsLoading } = useGetRecentPaymentsQuery(5);

  const sidebarWidth = 280;
  const topBarHeight = 72;

  const handlePaymentRowClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setPanelOpen(true);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
    setSelectedPayment(null);
  };

  const handlePaymentUpdate = () => {
    // Refresh the payments data when a payment is updated
    // The RTK Query will automatically refetch due to cache invalidation
  };

  if (kpiLoading || revenueLoading || activitiesLoading || paymentsLoading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <DashboardLayout>
      <Sidebar />
      <TopBar sidebarWidth={sidebarWidth} />
      
      <DashboardContent sidebarWidth={sidebarWidth} topBarHeight={topBarHeight}>
        {/* KPI Cards Row */}
        <StyledRow gutter={[24, 24]}>
          <Col span={6}>
            <KPICard
              title="Total Revenue"
              metric={kpiData!.totalRevenue}
              type="revenue"
            />
          </Col>
          <Col span={6}>
            <KPICard
              title="Invoices"
              metric={kpiData!.totalInvoices}
              type="invoices"
            />
          </Col>
          <Col span={6}>
            <KPICard
              title="Tenants"
              metric={kpiData!.totalTenants}
              type="tenants"
            />
          </Col>
          <Col span={6}>
            <KPICard
              title="On-time Payment %"
              metric={kpiData!.onTimePaymentRate}
              type="payment-rate"
            />
          </Col>
        </StyledRow>

        {/* Chart and Timeline Row */}
        <StyledRow gutter={[24, 24]}>
          <Col span={16}>
            <RevenueChart 
              data={revenueData!} 
              currentMonth={currentMonth}
            />
          </Col>
          <Col span={8}>
            <ActivityTimeline activities={activities!} />
          </Col>
        </StyledRow>

        {/* Payments Table Row */}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <PaymentsTable 
              payments={payments!} 
              onRowClick={handlePaymentRowClick}
            />
          </Col>
        </Row>
      </DashboardContent>

      {/* Payment Details Panel */}
      <PaymentDetailsPanel
        payment={selectedPayment}
        open={panelOpen}
        onClose={handlePanelClose}
        onPaymentUpdate={handlePaymentUpdate}
      />
    </DashboardLayout>
  );
};

export default Dashboard;