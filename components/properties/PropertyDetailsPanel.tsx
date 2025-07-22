import React from 'react';
import { Card, Typography, Space, Avatar, Tag, Row, Col, Image, Divider } from 'antd';
import { Building, MapPin, DollarSign, Users, Calendar } from 'lucide-react';
import styled from '@emotion/styled';
import { Property } from '../../types/schema';
import { formatCurrency, formatDate, formatPropertyTag } from '../../utils/formatters';
import PropertyStatusPill from '../common/PropertyStatusPill';

const { Title, Text } = Typography;

const DetailCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  
  .ant-card-head {
    border-bottom: 1px solid #F3F4F6;
    padding: 16px 20px;
  }
  
  .ant-card-body {
    padding: 20px;
  }
`;

const SectionTitle = styled(Text)`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PropertyImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
`;

const ImageContainer = styled(Card)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  padding: 0;
  
  .ant-card-body {
    padding: 0;
    height: 100%;
  }
`;

const PropertyName = styled(Title)`
  margin: 16px 0 8px 0 !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #111827 !important;
`;

const PropertyAddress = styled(Text)`
  color: #6B7280;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const StatValue = styled(Text)`
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 24px;
  margin-bottom: 4px;
`;

const StatLabel = styled(Text)`
  color: #6B7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContactCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactName = styled(Text)`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const ContactRole = styled(Text)`
  color: #6B7280;
  font-size: 12px;
`;

const RevenueText = styled(Text)`
  font-weight: 700;
  color: #10B981;
  font-size: 20px;
`;

interface PropertyDetailsPanelProps {
  property: Property;
}

const PropertyDetailsPanel: React.FC<PropertyDetailsPanelProps> = ({ property }) => {
  return (
    <div>
      <ImageContainer>
        <div style={{ position: 'relative', height: '100%' }}>
          <PropertyImage
            src={property.thumbnail}
            alt={property.name}
            preview={{
              mask: (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 500
                }}>
                  Preview
                </div>
              )
            }}
          />
        </div>
      </ImageContainer>
      
      <PropertyName>{property.name}</PropertyName>
      <PropertyAddress>
        <MapPin size={14} />
        {property.address}
      </PropertyAddress>
      
      <Space style={{ marginTop: 16, marginBottom: 24 }}>
        <PropertyStatusPill status={property.status} />
        {property.tags.map(tag => (
          <Tag key={tag} color="blue">
            {formatPropertyTag(tag)}
          </Tag>
        ))}
      </Space>

      <DetailCard title={<SectionTitle><Building size={16} />Unit Information</SectionTitle>}>
        <Row gutter={16}>
          <Col span={8}>
            <StatCard>
              <StatValue>{property.units.total}</StatValue>
              <StatLabel>Total Units</StatLabel>
            </StatCard>
          </Col>
          <Col span={8}>
            <StatCard>
              <StatValue>{property.units.occupied}</StatValue>
              <StatLabel>Occupied</StatLabel>
            </StatCard>
          </Col>
          <Col span={8}>
            <StatCard>
              <StatValue>{property.units.vacant}</StatValue>
              <StatLabel>Vacant</StatLabel>
            </StatCard>
          </Col>
        </Row>
      </DetailCard>

      <DetailCard title={<SectionTitle><DollarSign size={16} />Financial Information</SectionTitle>}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <div>
            <Text style={{ color: '#6B7280', fontSize: '12px', display: 'block' }}>Monthly Revenue</Text>
            <RevenueText>{formatCurrency(property.monthlyRevenue)}</RevenueText>
          </div>
          <div>
            <Text style={{ color: '#6B7280', fontSize: '12px', display: 'block' }}>Last Payment</Text>
            <Text style={{ fontSize: '14px', color: '#374151' }}>
              {property.lastPaymentDate ? formatDate(property.lastPaymentDate) : 'No payments received'}
            </Text>
          </div>
        </Space>
      </DetailCard>

      <DetailCard title={<SectionTitle><Users size={16} />Management Team</SectionTitle>}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <ContactCard>
            <Avatar size={40} src={property.manager.avatar}>
              {property.manager.initials}
            </Avatar>
            <ContactInfo>
              <ContactName>{property.manager.name}</ContactName>
              <ContactRole>Property Manager</ContactRole>
            </ContactInfo>
          </ContactCard>
          
          <ContactCard>
            <Avatar size={40} src={property.owner.avatar}>
              {property.owner.initials}
            </Avatar>
            <ContactInfo>
              <ContactName>{property.owner.name}</ContactName>
              <ContactRole>Property Owner</ContactRole>
            </ContactInfo>
          </ContactCard>
        </Space>
      </DetailCard>
    </div>
  );
};

export default PropertyDetailsPanel;