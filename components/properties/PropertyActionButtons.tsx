import React from 'react';
import { Space, Button, Tooltip } from 'antd';
import { Eye, Edit, FileText, Users } from 'lucide-react';
import styled from '@emotion/styled';

const ActionButton = styled(Button)`
  border: none;
  box-shadow: none;
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F3F4F6;
  }
`;

interface PropertyActionButtonsProps {
  propertyId: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onInvoices?: (id: number) => void;
  onTenants?: (id: number) => void;
}

const PropertyActionButtons: React.FC<PropertyActionButtonsProps> = ({
  propertyId,
  onView,
  onEdit,
  onInvoices,
  onTenants
}) => {
  return (
    <Space size={4}>
      <Tooltip title="View Details">
        <ActionButton 
          type="text" 
          onClick={() => onView?.(propertyId)}
        >
          <Eye size={16} color="#6B7280" />
        </ActionButton>
      </Tooltip>
      
      <Tooltip title="Edit Property">
        <ActionButton 
          type="text" 
          onClick={() => onEdit?.(propertyId)}
        >
          <Edit size={16} color="#6B7280" />
        </ActionButton>
      </Tooltip>
      
      <Tooltip title="View Invoices">
        <ActionButton 
          type="text" 
          onClick={() => onInvoices?.(propertyId)}
        >
          <FileText size={16} color="#6B7280" />
        </ActionButton>
      </Tooltip>
      
      <Tooltip title="Manage Tenants">
        <ActionButton 
          type="text" 
          onClick={() => onTenants?.(propertyId)}
        >
          <Users size={16} color="#6B7280" />
        </ActionButton>
      </Tooltip>
    </Space>
  );
};

export default PropertyActionButtons;