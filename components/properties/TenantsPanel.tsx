import React from 'react';
import { List, Card, Typography, Space, Avatar, Tag, Row, Col, Button } from 'antd';
import { Users, Phone, Mail, Calendar, Home } from 'lucide-react';
import styled from '@emotion/styled';
import { formatDate } from '../../utils/formatters';

const { Title, Text } = Typography;

const TenantCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  
  .ant-card-body {
    padding: 20px;
  }
  
  &:hover {
    border-color: #8B5CF6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const TenantHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const TenantInfo = styled.div`
  flex: 1;
`;

const TenantName = styled(Text)`
  font-weight: 600;
  color: #111827;
  font-size: 16px;
  display: block;
`;

const TenantUnit = styled(Text)`
  color: #6B7280;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const ContactItem = styled(Text)`
  color: #374151;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusTag = styled(Tag)<{ status: string }>`
  border-radius: 6px;
  font-weight: 500;
  ${props => {
    switch (props.status) {
      case 'active':
        return 'background: #D1FAE5; color: #065F46; border-color: #10B981;';
      case 'pending':
        return 'background: #FEF3C7; color: #92400E; border-color: #F59E0B;';
      case 'inactive':
        return 'background: #F3F4F6; color: #374151; border-color: #9CA3AF;';
      default:
        return 'background: #F3F4F6; color: #374151; border-color: #9CA3AF;';
    }
  }}
`;

const LeaseInfo = styled.div`
  background: #F9FAFB;
  border-radius: 6px;
  padding: 12px;
  margin-top: 12px;
`;

const LeaseText = styled(Text)`
  color: #6B7280;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  initials: string;
  unitNumber: string;
  leaseStart: Date;
  leaseEnd: Date;
  status: 'active' | 'pending' | 'inactive';
  monthlyRent: number;
}

interface TenantsPanelProps {
  propertyId: number;
  propertyName: string;
}

// Mock tenant data - separate from managers
const mockTenants: Tenant[] = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?img=20',
    initials: 'AR',
    unitNumber: 'Unit 101',
    leaseStart: new Date('2023-06-01'),
    leaseEnd: new Date('2024-05-31'),
    status: 'active',
    monthlyRent: 1200
  },
  {
    id: 2,
    name: 'Jessica Chen',
    email: 'jessica.chen@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://i.pravatar.cc/150?img=25',
    initials: 'JC',
    unitNumber: 'Unit 205',
    leaseStart: new Date('2023-09-01'),
    leaseEnd: new Date('2024-08-31'),
    status: 'active',
    monthlyRent: 1350
  },
  {
    id: 3,
    name: 'Marcus Thompson',
    email: 'marcus.thompson@email.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://i.pravatar.cc/150?img=30',
    initials: 'MT',
    unitNumber: 'Unit 302',
    leaseStart: new Date('2023-03-01'),
    leaseEnd: new Date('2024-02-29'),
    status: 'inactive',
    monthlyRent: 1100
  },
  {
    id: 4,
    name: 'Rachel Kim',
    email: 'rachel.kim@email.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://i.pravatar.cc/150?img=35',
    initials: 'RK',
    unitNumber: 'Unit 408',
    leaseStart: new Date('2024-01-01'),
    leaseEnd: new Date('2024-12-31'),
    status: 'pending',
    monthlyRent: 1250
  },
  {
    id: 5,
    name: 'Kevin Martinez',
    email: 'kevin.martinez@email.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://i.pravatar.cc/150?img=40',
    initials: 'KM',
    unitNumber: 'Unit 510',
    leaseStart: new Date('2023-08-01'),
    leaseEnd: new Date('2024-07-31'),
    status: 'active',
    monthlyRent: 1400
  }
];

const TenantsPanel: React.FC<TenantsPanelProps> = ({ propertyId, propertyName }) => {
  const activeTenants = mockTenants.filter(t => t.status === 'active').length;
  const totalTenants = mockTenants.length;

  return (
    <div>
      <Space direction="vertical" size={16} style={{ width: '100%', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0, color: '#111827' }}>
            Tenants for {propertyName}
          </Title>
          <Text style={{ color: '#6B7280' }}>
            {activeTenants} active out of {totalTenants} total tenants
          </Text>
        </div>
      </Space>

      <List
        dataSource={mockTenants}
        renderItem={(tenant) => (
          <TenantCard>
            <TenantHeader>
              <Avatar size={48} src={tenant.avatar}>
                {tenant.initials}
              </Avatar>
              <TenantInfo>
                <TenantName>{tenant.name}</TenantName>
                <TenantUnit>
                  <Home size={12} />
                  {tenant.unitNumber}
                </TenantUnit>
              </TenantInfo>
              <StatusTag status={tenant.status}>
                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
              </StatusTag>
            </TenantHeader>

            <ContactInfo>
              <ContactItem>
                <Mail size={14} />
                {tenant.email}
              </ContactItem>
              <ContactItem>
                <Phone size={14} />
                {tenant.phone}
              </ContactItem>
            </ContactInfo>

            <LeaseInfo>
              <Row gutter={16}>
                <Col span={12}>
                  <LeaseText>
                    <Calendar size={12} />
                    Lease Start: {formatDate(tenant.leaseStart)}
                  </LeaseText>
                </Col>
                <Col span={12}>
                  <LeaseText>
                    <Calendar size={12} />
                    Lease End: {formatDate(tenant.leaseEnd)}
                  </LeaseText>
                </Col>
              </Row>
              <Text style={{ color: '#374151', fontSize: '13px', fontWeight: 500, marginTop: 8, display: 'block' }}>
                Monthly Rent: ${tenant.monthlyRent.toLocaleString()}
              </Text>
            </LeaseInfo>
          </TenantCard>
        )}
      />
    </div>
  );
};

export default TenantsPanel;