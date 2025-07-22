import React from 'react';
import { Row, Col, Pagination, Empty } from 'antd';
import styled from '@emotion/styled';
import { Property } from '../../types/schema';
import PropertyCard from './PropertyCard';

const GridContainer = styled.div`
  margin-bottom: 24px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

interface PropertiesGridProps {
  properties: Property[];
  selectedProperties: number[];
  onPropertySelect: (propertyId: number) => void;
  onPropertyAction: (action: string, propertyId: number) => void;
  loading?: boolean;
  currentPage?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, size?: number) => void;
}

const PropertiesGrid: React.FC<PropertiesGridProps> = ({
  properties,
  selectedProperties,
  onPropertySelect,
  onPropertyAction,
  loading = false,
  currentPage = 1,
  pageSize = 12,
  total,
  onPageChange
}) => {
  if (properties.length === 0 && !loading) {
    return (
      <EmptyContainer>
        <Empty
          description="No properties found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </EmptyContainer>
    );
  }

  return (
    <GridContainer>
      <Row gutter={[24, 24]}>
        {properties.map(property => (
          <Col 
            key={property.id}
            xs={24} 
            sm={12} 
            md={8} 
            lg={8} 
            xl={8}
            xxl={8}
          >
            <PropertyCard
              property={property}
              selected={selectedProperties.includes(property.id)}
              onSelect={onPropertySelect}
              onPropertyAction={onPropertyAction}
            />
          </Col>
        ))}
      </Row>
      
      {total && total > pageSize && (
        <PaginationContainer>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => 
              `${range[0]}-${range[1]} of ${total} properties`
            }
            onChange={onPageChange}
          />
        </PaginationContainer>
      )}
    </GridContainer>
  );
};

export default PropertiesGrid;