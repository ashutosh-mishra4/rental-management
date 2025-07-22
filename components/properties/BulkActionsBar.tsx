import React from 'react';
import { Space, Button, Typography, Divider } from 'antd';
import { Bell, Archive, FileDown } from 'lucide-react';
import styled from '@emotion/styled';

const { Text } = Typography;

const BulkActionsContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: ${props => props.visible ? 'flex' : 'none'};
  align-items: center;
  gap: 16px;
  min-width: 400px;
  animation: ${props => props.visible ? 'slideUp 0.3s ease-out' : 'none'};
  
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const SelectionText = styled(Text)`
  font-weight: 500;
  color: #374151;
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface BulkActionsBarProps {
  selectedCount: number;
  onSendReminders: () => void;
  onArchive: () => void;
  onExportCSV: () => void;
  onClear: () => void;
}

const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onSendReminders,
  onArchive,
  onExportCSV,
  onClear
}) => {
  return (
    <BulkActionsContainer visible={selectedCount > 0}>
      <SelectionText>
        {selectedCount} {selectedCount === 1 ? 'property' : 'properties'} selected
      </SelectionText>
      
      <Divider type="vertical" />
      
      <Space>
        <ActionButton 
          type="default" 
          onClick={onSendReminders}
          disabled={selectedCount === 0}
        >
          <Bell size={16} />
          Send Reminders
        </ActionButton>
        
        <ActionButton 
          type="default" 
          onClick={onArchive}
          disabled={selectedCount === 0}
        >
          <Archive size={16} />
          Archive Selected
        </ActionButton>
        
        <ActionButton 
          type="default" 
          onClick={onExportCSV}
          disabled={selectedCount === 0}
        >
          <FileDown size={16} />
          Export CSV
        </ActionButton>
        
        <ActionButton 
          type="text" 
          onClick={onClear}
        >
          Clear
        </ActionButton>
      </Space>
    </BulkActionsContainer>
  );
};

export default BulkActionsBar;