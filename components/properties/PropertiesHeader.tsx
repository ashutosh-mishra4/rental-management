import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { Plus } from 'lucide-react';
import styled from '@emotion/styled';

const { Title } = Typography;

const HeaderContainer = styled(Row)`
  margin-bottom: 24px;
  align-items: center;
`;

const PageTitle = styled(Title)`
  margin: 0 !important;
  font-size: 28px !important;
  font-weight: 600 !important;
  color: #111827 !important;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface PropertiesHeaderProps {
  onAddProperty?: () => void;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({ onAddProperty }) => {
  return (
    <HeaderContainer justify="space-between">
      <Col>
        <PageTitle level={1}>Properties</PageTitle>
      </Col>
      <Col>
        <AddButton 
          type="primary" 
          size="large"
          onClick={onAddProperty}
        >
          <Plus size={20} />
          Add Property
        </AddButton>
      </Col>
    </HeaderContainer>
  );
};

export default PropertiesHeader;