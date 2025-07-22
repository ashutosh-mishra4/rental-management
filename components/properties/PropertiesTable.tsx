import React from 'react';
import { Table, Checkbox, Avatar, Typography, Space, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from '@emotion/styled';
import { Property } from '../../types/schema';
import { formatCurrency, formatDate, formatUnitCount } from '../../utils/formatters';
import PropertyStatusPill from '../common/PropertyStatusPill';
import PropertyActionButtons from './PropertyActionButtons';

const { Text } = Typography;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
    font-weight: 600;
    color: #374151;
  }
  
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #F3F4F6;
    padding: 16px;
  }
  
  .ant-table-tbody > tr:hover > td {
    background: #F9FAFB;
  }
`;

const PropertyThumbnail = styled(Image)`
  border-radius: 8px;
`;

const PropertyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PropertyName = styled(Text)`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const PropertyAddress = styled(Text)`
  color: #6B7280;
  font-size: 12px;
`;

const UnitInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UnitText = styled(Text)`
  font-size: 13px;
  color: #374151;
`;

const ManagerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ManagerName = styled(Text)`
  font-size: 13px;
  color: #374151;
`;

interface PropertiesTableProps {
  properties: Property[];
  selectedProperties: number[];
  onPropertySelect: (propertyId: number) => void;
  onSelectAll: (selected: boolean, propertyIds: number[]) => void;
  onPropertyAction: (action: string, propertyId: number) => void;
  loading?: boolean;
}

const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  selectedProperties,
  onPropertySelect,
  onSelectAll,
  onPropertyAction,
  loading = false
}) => {
  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedProperties.length === properties.length && properties.length > 0}
          indeterminate={selectedProperties.length > 0 && selectedProperties.length < properties.length}
          onChange={(e) => onSelectAll(e.target.checked, properties.map(p => p.id))}
        />
      ),
      dataIndex: 'select',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedProperties.includes(record.id)}
          onChange={() => onPropertySelect(record.id)}
        />
      )
    },
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
      render: (_, record) => (
        <Space size={12}>
          <PropertyThumbnail
            src={record.thumbnail}
            alt={record.name}
            width={48}
            height={48}
            preview={false}
          />
          <PropertyInfo>
            <PropertyName>{record.name}</PropertyName>
            <PropertyAddress>{record.address}</PropertyAddress>
          </PropertyInfo>
        </Space>
      )
    },
    {
      title: 'Units',
      dataIndex: 'units',
      key: 'units',
      render: (_, record) => (
        <UnitInfo>
          <UnitText strong>{record.units.total} Total</UnitText>
          <UnitText>{record.units.occupied} Occupied</UnitText>
          <UnitText>{record.units.vacant} Vacant</UnitText>
        </UnitInfo>
      )
    },
    {
      title: 'Monthly Revenue',
      dataIndex: 'monthlyRevenue',
      key: 'monthlyRevenue',
      render: (revenue) => (
        <Text strong>{formatCurrency(revenue)}</Text>
      ),
      sorter: (a, b) => a.monthlyRevenue - b.monthlyRevenue
    },
    {
      title: 'Last Payment',
      dataIndex: 'lastPaymentDate',
      key: 'lastPaymentDate',
      render: (date) => (
        <Text>{date ? formatDate(date) : 'No payments'}</Text>
      ),
      sorter: (a, b) => {
        if (!a.lastPaymentDate && !b.lastPaymentDate) return 0;
        if (!a.lastPaymentDate) return 1;
        if (!b.lastPaymentDate) return -1;
        return new Date(a.lastPaymentDate).getTime() - new Date(b.lastPaymentDate).getTime();
      }
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
      render: (manager) => (
        <ManagerInfo>
          <Avatar size={32} src={manager.avatar}>
            {manager.initials}
          </Avatar>
          <ManagerName>{manager.name}</ManagerName>
        </ManagerInfo>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <PropertyStatusPill status={status} />
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <PropertyActionButtons
          propertyId={record.id}
          onView={(id) => onPropertyAction('view', id)}
          onEdit={(id) => onPropertyAction('edit', id)}
          onInvoices={(id) => onPropertyAction('invoices', id)}
          onTenants={(id) => onPropertyAction('tenants', id)}
        />
      )
    }
  ];

  return (
    <StyledTable
      columns={columns}
      dataSource={properties}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} properties`
      }}
    />
  );
};

export default PropertiesTable;