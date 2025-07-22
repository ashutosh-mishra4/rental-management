import React from 'react';
import { Drawer, Typography, Button } from 'antd';
import { X } from 'lucide-react';
import styled from '@emotion/styled';

const { Title } = Typography;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    background: #FFFFFF;
  }
  
  .ant-drawer-header {
    background: #FFFFFF;
    border-bottom: 1px solid #E5E7EB;
    padding: 20px 24px;
  }
  
  .ant-drawer-body {
    padding: 24px;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DrawerTitle = styled(Title)`
  margin: 0 !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #111827 !important;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled(Button)`
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

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  width?: number;
}

const RightPanel: React.FC<RightPanelProps> = ({
  open,
  onClose,
  title,
  icon,
  children,
  width = 600
}) => {
  return (
    <StyledDrawer
      title={
        <DrawerHeader>
          <DrawerTitle level={3}>
            {icon}
            {title}
          </DrawerTitle>
          <CloseButton type="text" onClick={onClose}>
            <X size={16} />
          </CloseButton>
        </DrawerHeader>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={width}
      closable={false}
    >
      {children}
    </StyledDrawer>
  );
};

export default RightPanel;