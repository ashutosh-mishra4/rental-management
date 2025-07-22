import React from 'react';
import { Tag } from 'antd';
import styled from '@emotion/styled';
import { PaymentStatus } from '../../types/enums';

const StyledTag = styled(Tag)`
  border-radius: 12px;
  font-weight: 500;
`;

interface StatusPillProps {
  status: PaymentStatus;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return { color: 'success', text: 'Paid' };
      case PaymentStatus.OVERDUE:
        return { color: 'error', text: 'Overdue' };
      case PaymentStatus.PENDING:
        return { color: 'warning', text: 'Pending' };
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

export default StatusPill;