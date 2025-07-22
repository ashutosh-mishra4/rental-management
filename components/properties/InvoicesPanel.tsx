import React from 'react';
import { List, Card, Typography, Space, Button, Avatar, Tag } from 'antd';
import { FileText, Download, Calendar, DollarSign } from 'lucide-react';
import styled from '@emotion/styled';
import { formatCurrency, formatDate } from '../../utils/formatters';

const { Title, Text } = Typography;

const InvoiceCard = styled(Card)`
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  
  .ant-card-body {
    padding: 16px;
  }
  
  &:hover {
    border-color: #8B5CF6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const InvoiceInfo = styled.div`
  flex: 1;
`;

const InvoiceNumber = styled(Text)`
  font-weight: 600;
  color: #111827;
  font-size: 16px;
`;

const InvoiceDate = styled(Text)`
  color: #6B7280;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InvoiceAmount = styled(Text)`
  font-weight: 700;
  color: #10B981;
  font-size: 18px;
`;

const TenantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const TenantName = styled(Text)`
  font-weight: 500;
  color: #374151;
`;

const DownloadButton = styled(Button)`
  border-color: #8B5CF6;
  color: #8B5CF6;
  
  &:hover {
    border-color: #7C3AED;
    color: #7C3AED;
  }
`;

const StatusTag = styled(Tag)<{ status: string }>`
  border-radius: 6px;
  font-weight: 500;
  ${props => {
    switch (props.status) {
      case 'paid':
        return 'background: #D1FAE5; color: #065F46; border-color: #10B981;';
      case 'pending':
        return 'background: #FEF3C7; color: #92400E; border-color: #F59E0B;';
      case 'overdue':
        return 'background: #FEE2E2; color: #991B1B; border-color: #EF4444;';
      default:
        return 'background: #F3F4F6; color: #374151; border-color: #9CA3AF;';
    }
  }}
`;

interface Invoice {
  id: string;
  invoiceNumber: string;
  tenant: {
    name: string;
    avatar: string;
    initials: string;
  };
  amount: number;
  dueDate: Date;
  issueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

interface InvoicesPanelProps {
  propertyId: number;
  propertyName: string;
}

// Mock invoice data
const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    tenant: {
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=1',
      initials: 'JS'
    },
    amount: 1200,
    dueDate: new Date('2024-02-01'),
    issueDate: new Date('2024-01-01'),
    status: 'paid',
    description: 'Monthly rent - January 2024'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    tenant: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      initials: 'SJ'
    },
    amount: 1350,
    dueDate: new Date('2024-02-01'),
    issueDate: new Date('2024-01-01'),
    status: 'pending',
    description: 'Monthly rent - January 2024'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    tenant: {
      name: 'Mike Davis',
      avatar: 'https://i.pravatar.cc/150?img=7',
      initials: 'MD'
    },
    amount: 1100,
    dueDate: new Date('2024-01-15'),
    issueDate: new Date('2023-12-15'),
    status: 'overdue',
    description: 'Monthly rent - December 2023'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    tenant: {
      name: 'Emily Wilson',
      avatar: 'https://i.pravatar.cc/150?img=2',
      initials: 'EW'
    },
    amount: 1250,
    dueDate: new Date('2024-02-01'),
    issueDate: new Date('2024-01-01'),
    status: 'paid',
    description: 'Monthly rent - January 2024'
  }
];

const InvoicesPanel: React.FC<InvoicesPanelProps> = ({ propertyId, propertyName }) => {
  const handleDownloadInvoice = (invoice: Invoice) => {
    // Create a simple PDF-like content structure
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(INVOICE: ${invoice.invoiceNumber}) Tj
0 -20 Td
(Property: ${propertyName}) Tj
0 -20 Td
(Tenant: ${invoice.tenant.name}) Tj
0 -20 Td
(Amount: ${formatCurrency(invoice.amount)}) Tj
0 -20 Td
(Due Date: ${formatDate(invoice.dueDate)}) Tj
0 -20 Td
(Status: ${invoice.status.toUpperCase()}) Tj
0 -20 Td
(Description: ${invoice.description}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000348 00000 n 
0000000565 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF`;

    // Create blob and download as PDF
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Space direction="vertical" size={16} style={{ width: '100%', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0, color: '#111827' }}>
            Invoices for {propertyName}
          </Title>
          <Text style={{ color: '#6B7280' }}>
            {mockInvoices.length} invoices found
          </Text>
        </div>
      </Space>

      <List
        dataSource={mockInvoices}
        renderItem={(invoice) => (
          <InvoiceCard>
            <InvoiceHeader>
              <InvoiceInfo>
                <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                <InvoiceDate>
                  <Calendar size={12} />
                  Due: {formatDate(invoice.dueDate)}
                </InvoiceDate>
              </InvoiceInfo>
              <InvoiceAmount>{formatCurrency(invoice.amount)}</InvoiceAmount>
            </InvoiceHeader>

            <TenantInfo>
              <Avatar size={32} src={invoice.tenant.avatar}>
                {invoice.tenant.initials}
              </Avatar>
              <div>
                <TenantName>{invoice.tenant.name}</TenantName>
                <Text style={{ color: '#6B7280', fontSize: '12px', display: 'block' }}>
                  {invoice.description}
                </Text>
              </div>
            </TenantInfo>

            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <StatusTag status={invoice.status}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </StatusTag>
              
              <DownloadButton
                type="default"
                icon={<Download size={14} />}
                size="small"
                onClick={() => handleDownloadInvoice(invoice)}
              >
                Download
              </DownloadButton>
            </Space>
          </InvoiceCard>
        )}
      />
    </div>
  );
};

export default InvoicesPanel;