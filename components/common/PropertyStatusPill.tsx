import React from 'react';
import { Tag } from 'antd';
import styled from '@emotion/styled';
import { PropertyStatus } from '../../types/enums';

const StyledTag = styled(Tag)`
  border-radius: 12px;
  font-weight: 500;
`;

interface PropertyStatusPillProps {
  status: PropertyStatus;
}

const PropertyStatusPill: React.FC<PropertyStatusPillProps> = ({ status }) => {
  const getStatusConfig = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return { color: 'success', text: 'Active' };
      case PropertyStatus.VACANT:
        return { color: 'warning', text: 'Vacant' };
      case PropertyStatus.ARCHIVED:
        return { color: 'default', text: 'Archived' };
      default:
        return { color: 'default', text: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <StyledTag color={config.color}>
      {config.text}
    </StyledTag>
  );
};

export default PropertyStatusPill;