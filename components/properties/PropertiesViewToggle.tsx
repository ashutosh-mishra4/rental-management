import React from 'react';
import { Segmented } from 'antd';
import { Table, Grid3X3 } from 'lucide-react';
import styled from '@emotion/styled';
import { PropertyViewMode } from '../../types/enums';

const ViewToggleContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-end;
`;

const StyledSegmented = styled(Segmented)`
  .ant-segmented-item-label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

interface PropertiesViewToggleProps {
  viewMode: PropertyViewMode;
  onViewModeChange: (mode: PropertyViewMode) => void;
}

const PropertiesViewToggle: React.FC<PropertiesViewToggleProps> = ({
  viewMode,
  onViewModeChange
}) => {
  const options = [
    {
      label: (
        <>
          <Table size={16} />
          Table View
        </>
      ),
      value: PropertyViewMode.TABLE
    },
    {
      label: (
        <>
          <Grid3X3 size={16} />
          Grid View
        </>
      ),
      value: PropertyViewMode.GRID
    }
  ];

  return (
    <ViewToggleContainer>
      <StyledSegmented
        options={options}
        value={viewMode}
        onChange={(value) => onViewModeChange(value as PropertyViewMode)}
      />
    </ViewToggleContainer>
  );
};

export default PropertiesViewToggle;