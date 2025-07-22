import React from 'react';
import { Tag } from 'antd';
import styled from '@emotion/styled';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StyledTag = styled(Tag)`
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

interface DeltaBadgeProps {
  delta: number;
  isPositive: boolean;
}

const DeltaBadge: React.FC<DeltaBadgeProps> = ({ delta, isPositive }) => {
  return (
    <StyledTag color={isPositive ? 'success' : 'error'}>
      <IconWrapper>
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      </IconWrapper>
      {Math.abs(delta).toFixed(1)}%
    </StyledTag>
  );
};

export default DeltaBadge;