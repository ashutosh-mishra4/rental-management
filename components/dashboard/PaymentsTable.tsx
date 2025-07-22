import React from 'react';
import { Card, Table, Avatar, Typography } from 'antd';
import styled from '@emotion/styled';
import type { ColumnsType } from 'antd/es/table';
import StatusPill from '../common/StatusPill';
import { formatDate, formatCurrency } from '../../utils/formatters';
import type { Payment } from '../../types/schema';

const { Title, Text } = Typography;

const PaymentsCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  
  .ant-card-body {
    padding: 24px;
  }
`;

const PaymentsTitle = styled(Title)`
  margin: 0 0 24px 0 !important;
  color: #111827 !important;
`;

const StyledTable = styled(Table)`
  border-radius: 8px;
  overflow: hidden;
  
  .ant-table-tbody > tr {
    cursor: pointer;
    
    &:hover {
      background-color: #F9FAFB;
    }
  }
`;

const InvoiceId = styled(Text)`
  font-weight: 500 !important;
  color: #8B5CF6 !important;
`;

const DueDate = styled(Text)`
  color: #6B7280 !important;
`;

const TenantContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TenantAvatar = styled(Avatar)`
  border-radius: 8px;
`;

const TenantName = styled(Text)`
  font-weight: 500 !important;
  color: #111827 !important;
`;

const Amount = styled(Text)`
  font-weight: 600 !important;
  color: #111827 !important;
`;

interface PaymentsTableProps {
  payments: Payment[];
  onRowClick?: (payment: Payment) => void;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments, onRowClick }) => {
  const columns: ColumnsType<Payment> = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      render: (text: string) => (
        <InvoiceId>
          {text}
        </InvoiceId>
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: Date) => (
        <DueDate>
          {formatDate(date)}
        </DueDate>
      )
    },
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      key: 'tenant',
      render: (tenant: Payment['tenant']) => (
        <TenantContainer>
          <TenantAvatar 
            src={tenant.avatar} 
            size={32}
          >
            {tenant.initials}
          </TenantAvatar>
          <TenantName>
            {tenant.name}
          </TenantName>
        </TenantContainer>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Amount>
          {formatCurrency(amount)}
        </Amount>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Payment['status']) => (
        <StatusPill status={status} />
      )
    }
  ];

  return (
    <PaymentsCard>
      <PaymentsTitle level={4}>
        Recent Payments
      </PaymentsTitle>
      
      <Table<Payment>
        columns={columns}
        dataSource={payments}
        rowKey="id"
        pagination={false}
        style={{ 
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        rowClassName={() => 'hover:bg-gray-50'}
        onRow={(record: Payment) => ({
          onClick: () => onRowClick?.(record),
          style: { cursor: 'pointer' }
        })}
      />
    </PaymentsCard>
  );
};

export default PaymentsTable;