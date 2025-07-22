import React from 'react';
import { Card, Checkbox, Avatar, Typography, Space, Tag, Image, Row, Col } from 'antd';
import styled from '@emotion/styled';
import { Property } from '../../types/schema';
import { formatCurrency, formatDate, formatPropertyTag } from '../../utils/formatters';
import PropertyStatusPill from '../common/PropertyStatusPill';
import PropertyActionButtons from './PropertyActionButtons';

const { Text, Title } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #8B5CF6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .ant-card-body {
    padding: 0;
  }
`;

const CardHeader = styled.div`
  position: relative;
  padding: 12px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
`;

const SelectCheckbox = styled(Checkbox)`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  
  .ant-checkbox-inner {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.9);
  }
`;

const PropertyImage = styled(Image)`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const PropertyTitle = styled(Title)`
  margin: 0 0 4px 0 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #111827 !important;
`;

const PropertyAddress = styled(Text)`
  color: #6B7280;
  font-size: 13px;
  display: block;
  margin-bottom: 12px;
`;

const StatsRow = styled(Row)`
  margin-bottom: 12px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled(Text)`
  display: block;
  font-weight: 600;
  color: #111827;
  font-size: 16px;
`;

const StatLabel = styled(Text)`
  color: #6B7280;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RevenueText = styled(Text)`
  font-weight: 600;
  color: #10B981;
  font-size: 18px;
`;

const LastPaymentText = styled(Text)`
  color: #6B7280;
  font-size: 12px;
`;

const ManagerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const ManagerName = styled(Text)`
  font-size: 13px;
  color: #374151;
`;

const TagsContainer = styled.div`
  margin-bottom: 12px;
`;

const PropertyTag = styled(Tag)`
  font-size: 11px;
  border-radius: 6px;
  margin-bottom: 4px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`;

interface PropertyCardProps {
  property: Property;
  selected: boolean;
  onSelect: (propertyId: number) => void;
  onPropertyAction: (action: string, propertyId: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  selected,
  onSelect,
  onPropertyAction
}) => {
  return (
    <StyledCard>
      <CardHeader>
        <SelectCheckbox
          checked={selected}
          onChange={() => onSelect(property.id)}
        />
        <PropertyImage
          src={property.thumbnail}
          alt={property.name}
          preview={false}
        />
      </CardHeader>
      
      <CardContent>
        <PropertyTitle level={4}>{property.name}</PropertyTitle>
        <PropertyAddress>{property.address}</PropertyAddress>
        
        <StatsRow gutter={8}>
          <Col span={8}>
            <StatItem>
              <StatValue>{property.units.total}</StatValue>
              <StatLabel>Total Units</StatLabel>
            </StatItem>
          </Col>
          <Col span={8}>
            <StatItem>
              <StatValue>{property.units.occupied}</StatValue>
              <StatLabel>Occupied</StatLabel>
            </StatItem>
          </Col>
          <Col span={8}>
            <StatItem>
              <StatValue>{property.units.vacant}</StatValue>
              <StatLabel>Vacant</StatLabel>
            </StatItem>
          </Col>
        </StatsRow>
        
        <div style={{ marginBottom: '12px' }}>
          <RevenueText>{formatCurrency(property.monthlyRevenue)}</RevenueText>
          <LastPaymentText style={{ display: 'block' }}>
            Last payment: {property.lastPaymentDate ? formatDate(property.lastPaymentDate) : 'None'}
          </LastPaymentText>
        </div>
        
        <ManagerSection>
          <Avatar size={28} src={property.manager.avatar}>
            {property.manager.initials}
          </Avatar>
          <ManagerName>{property.manager.name}</ManagerName>
        </ManagerSection>
        
        {property.tags.length > 0 && (
          <TagsContainer>
            {property.tags.map(tag => (
              <PropertyTag key={tag} color="blue">
                {formatPropertyTag(tag)}
              </PropertyTag>
            ))}
          </TagsContainer>
        )}
        
        <CardFooter>
          <PropertyStatusPill status={property.status} />
          <PropertyActionButtons
            propertyId={property.id}
            onView={(id) => onPropertyAction('view', id)}
            onEdit={(id) => onPropertyAction('edit', id)}
            onInvoices={(id) => onPropertyAction('invoices', id)}
            onTenants={(id) => onPropertyAction('tenants', id)}
          />
        </CardFooter>
      </CardContent>
    </StyledCard>
  );
};

export default PropertyCard;