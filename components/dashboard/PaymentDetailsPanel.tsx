import React from 'react';
import { Drawer, Typography, Avatar, Divider, Tag, Space, Button, message } from 'antd';
import styled from '@emotion/styled';
import { X, FileText, Calendar, User, DollarSign, Clock, Download } from 'lucide-react';
import { useDispatch } from 'react-redux';
import StatusPill from '../common/StatusPill';
import { formatDate, formatCurrency, formatTime } from '../../utils/formatters';
import { downloadPaymentReceipt } from '../../utils/downloadUtils';
import { markPaymentAsPaid } from '../../store';
import type { Payment } from '../../types/schema';
import { PaymentStatus } from '../../types/enums';

const { Title, Text } = Typography;

const PanelContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled(Title)`
  margin: 0 !important;
  color: #111827 !important;
`;

const CloseButton = styled(Button)`
  border: none;
  background: transparent;
  color: #6B7280;
`;

const PanelContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const SectionContainer = styled.div`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const SectionIcon = styled.div`
  color: #8B5CF6;
`;

const SectionTitle = styled(Title)`
  margin: 0 !important;
  color: #111827 !important;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoLabel = styled(Text)`
  color: #6B7280;
`;

const InfoValue = styled(Text)<{ variant?: 'primary' | 'amount' | 'default' }>`
  font-weight: ${props => props.variant === 'primary' ? 500 : props.variant === 'amount' ? 600 : 400};
  color: ${props => props.variant === 'primary' ? '#8B5CF6' : '#111827'};
  font-size: ${props => props.variant === 'amount' ? '16px' : 'inherit'};
`;

const TenantContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const TenantAvatar = styled(Avatar)`
  border-radius: 12px;
`;

const TenantInfo = styled.div``;

const TenantName = styled(Text)`
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #111827 !important;
  display: block !important;
`;

const TenantRole = styled(Text)`
  color: #6B7280 !important;
`;

const TimelineItem = styled.div<{ variant?: 'default' | 'paid' | 'pending' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${props => 
    props.variant === 'paid' ? '#D1FAE5' : 
    props.variant === 'pending' ? '#FEF3C7' : '#F9FAFB'};
  border-radius: 8px;
  border: 1px solid ${props => 
    props.variant === 'paid' ? '#10B981' : 
    props.variant === 'pending' ? '#F59E0B' : '#E5E7EB'};
`;

const TimelineDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled(Text)`
  font-weight: 500 !important;
  color: #111827 !important;
  display: block !important;
`;

const TimelineDate = styled(Text)`
  font-size: 12px !important;
  color: #6B7280 !important;
`;

const DownloadButton = styled(Button)`
  color: #8B5CF6;
  padding: 4px 8px;
  height: auto;
`;

const ActionContainer = styled.div`
  margin-top: auto;
`;

const PrimaryButton = styled(Button)`
  background: #8B5CF6;
  border-color: #8B5CF6;
  border-radius: 8px;
  font-weight: 500;
`;

const SecondaryButton = styled(Button)`
  border-radius: 8px;
  font-weight: 500;
`;

const FullWidthSpace = styled(Space)`
  width: 100%;
`;

interface PaymentDetailsPanelProps {
  payment: Payment | null;
  open: boolean;
  onClose: () => void;
  onPaymentUpdate?: () => void;
}

const PaymentDetailsPanel: React.FC<PaymentDetailsPanelProps> = ({
  payment,
  open,
  onClose,
  onPaymentUpdate
}) => {
  const dispatch = useDispatch();

  if (!payment) return null;

  const handleMarkAsPaid = () => {
    dispatch(markPaymentAsPaid(payment.id));
    message.success('Payment marked as paid successfully!');
    onPaymentUpdate?.();
  };

  const handleDownloadReceipt = () => {
    downloadPaymentReceipt(payment);
    message.success('Receipt downloaded successfully!');
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return '#10B981';
      case PaymentStatus.OVERDUE:
        return '#EF4444';
      case PaymentStatus.PENDING:
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getPaymentDate = () => {
    // Mock payment date based on status
    if (payment.status === PaymentStatus.PAID) {
      const paidDate = new Date(payment.dueDate);
      paidDate.setDate(paidDate.getDate() - 2);
      return paidDate;
    }
    return null;
  };

  const paymentDate = getPaymentDate();

  return (
    <Drawer
      title={null}
      placement="right"
      width={480}
      open={open}
      onClose={onClose}
      closable={false}
      styles={{
        body: { padding: 0 },
        header: { display: 'none' }
      }}
    >
      <PanelContainer>
        {/* Header */}
        <PanelHeader>
          <HeaderTitle level={4}>
            Payment Details
          </HeaderTitle>
          <CloseButton
            type="text"
            icon={<X size={20} />}
            onClick={onClose}
          />
        </PanelHeader>

        {/* Content */}
        <PanelContent>
          {/* Invoice Information */}
          <SectionContainer>
            <SectionHeader>
              <SectionIcon>
                <FileText size={20} />
              </SectionIcon>
              <SectionTitle level={5}>
                Invoice Information
              </SectionTitle>
            </SectionHeader>
            
            <FullWidthSpace direction="vertical" size={12}>
              <InfoRow>
                <InfoLabel>Invoice ID</InfoLabel>
                <InfoValue variant="primary">
                  {payment.invoiceId}
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Amount</InfoLabel>
                <InfoValue variant="amount">
                  {formatCurrency(payment.amount)}
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Due Date</InfoLabel>
                <InfoValue>
                  {formatDate(payment.dueDate)}
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Status</InfoLabel>
                <StatusPill status={payment.status} />
              </InfoRow>
            </FullWidthSpace>
          </SectionContainer>

          <Divider />

          {/* Tenant Information */}
          <SectionContainer>
            <SectionHeader>
              <SectionIcon>
                <User size={20} />
              </SectionIcon>
              <SectionTitle level={5}>
                Tenant Information
              </SectionTitle>
            </SectionHeader>
            
            <TenantContainer>
              <TenantAvatar
                src={payment.tenant.avatar}
                size={64}
              >
                {payment.tenant.initials}
              </TenantAvatar>
              <TenantInfo>
                <TenantName>
                  {payment.tenant.name}
                </TenantName>
                <TenantRole>
                  Tenant
                </TenantRole>
              </TenantInfo>
            </TenantContainer>

            <FullWidthSpace direction="vertical" size={12}>
              <InfoRow>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>
                  {payment.tenant.name.toLowerCase().replace(' ', '.')}@email.com
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>
                  +1 (555) {Math.floor(Math.random() * 900) + 100}-{Math.floor(Math.random() * 9000) + 1000}
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Unit</InfoLabel>
                <InfoValue>
                  Unit {Math.floor(Math.random() * 50) + 1}{String.fromCharCode(65 + Math.floor(Math.random() * 3))}
                </InfoValue>
              </InfoRow>
            </FullWidthSpace>
          </SectionContainer>

          <Divider />

          {/* Payment Timeline */}
          <SectionContainer>
            <SectionHeader>
              <SectionIcon>
                <Clock size={20} />
              </SectionIcon>
              <SectionTitle level={5}>
                Payment Timeline
              </SectionTitle>
            </SectionHeader>

            <FullWidthSpace direction="vertical" size={16}>
              <TimelineItem>
                <TimelineDot color="#8B5CF6" />
                <TimelineContent>
                  <TimelineTitle>
                    Invoice Generated
                  </TimelineTitle>
                  <TimelineDate>
                    {formatDate(new Date(payment.dueDate.getTime() - 30 * 24 * 60 * 60 * 1000))}
                  </TimelineDate>
                </TimelineContent>
                {payment.status === PaymentStatus.PAID && (
                  <DownloadButton
                    type="text"
                    icon={<Download size={16} />}
                    onClick={handleDownloadReceipt}
                    title="Download Receipt"
                  />
                )}
              </TimelineItem>

              {paymentDate && (
                <TimelineItem variant={payment.status === PaymentStatus.PAID ? 'paid' : 'pending'}>
                  <TimelineDot color={getStatusColor(payment.status)} />
                  <TimelineContent>
                    <TimelineTitle>
                      Payment {payment.status === PaymentStatus.PAID ? 'Received' : 'Due'}
                    </TimelineTitle>
                    <TimelineDate>
                      {formatDate(payment.status === PaymentStatus.PAID ? paymentDate : payment.dueDate)}
                    </TimelineDate>
                  </TimelineContent>
                </TimelineItem>
              )}
            </FullWidthSpace>
          </SectionContainer>

          {/* Action Buttons */}
          {payment.status !== PaymentStatus.PAID && (
            <ActionContainer>
              <FullWidthSpace direction="vertical" size={12}>
                <PrimaryButton 
                  type="primary" 
                  block 
                  size="large"
                >
                  Send Reminder
                </PrimaryButton>
                <SecondaryButton 
                  block 
                  size="large"
                  onClick={handleMarkAsPaid}
                >
                  Mark as Paid
                </SecondaryButton>
              </FullWidthSpace>
            </ActionContainer>
          )}
        </PanelContent>
      </PanelContainer>
    </Drawer>
  );
};

export default PaymentDetailsPanel;