import type { Payment, Property } from '../types/schema';
import { formatDate, formatCurrency, formatPropertyStatus, formatPropertyTag } from './formatters';

export const downloadPaymentReceipt = (payment: Payment) => {
  const receiptData = {
    invoiceId: payment.invoiceId,
    tenant: payment.tenant.name,
    amount: formatCurrency(payment.amount),
    dueDate: formatDate(payment.dueDate),
    paidDate: payment.status === 'paid' ? formatDate(new Date(payment.dueDate.getTime() - 2 * 24 * 60 * 60 * 1000)) : null,
    status: payment.status,
    tenantEmail: `${payment.tenant.name.toLowerCase().replace(' ', '.')}@email.com`,
    unit: `Unit ${Math.floor(Math.random() * 50) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
    generatedDate: formatDate(new Date())
  };

  // Create receipt content
  const receiptContent = `
PAYMENT RECEIPT
===============

Invoice ID: ${receiptData.invoiceId}
Generated: ${receiptData.generatedDate}

TENANT INFORMATION
------------------
Name: ${receiptData.tenant}
Email: ${receiptData.tenantEmail}
Unit: ${receiptData.unit}

PAYMENT DETAILS
---------------
Amount: ${receiptData.amount}
Due Date: ${receiptData.dueDate}
${receiptData.paidDate ? `Paid Date: ${receiptData.paidDate}` : ''}
Status: ${receiptData.status.toUpperCase()}

PROPERTY MANAGEMENT
-------------------
RealEstate Pro
Contact: support@realestatepro.com
Phone: +1 (555) 123-4567

Thank you for your payment!
  `.trim();

  // Create and download file
  const blob = new Blob([receiptContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `payment-receipt-${payment.invoiceId}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadPropertiesCSV = (properties: Property[]) => {
  // CSV headers
  const headers = [
    'ID',
    'Property Name',
    'Address',
    'City',
    'Status',
    'Total Units',
    'Occupied Units',
    'Vacant Units',
    'Monthly Revenue',
    'Last Payment Date',
    'Manager',
    'Owner',
    'Tags'
  ];

  // Convert properties to CSV rows
  const rows = properties.map(property => [
    property.id.toString(),
    `"${property.name}"`,
    `"${property.address}"`,
    property.city,
    formatPropertyStatus(property.status),
    property.units.total.toString(),
    property.units.occupied.toString(),
    property.units.vacant.toString(),
    formatCurrency(property.monthlyRevenue),
    property.lastPaymentDate ? formatDate(property.lastPaymentDate) : 'N/A',
    `"${property.manager.name}"`,
    `"${property.owner.name}"`,
    `"${property.tags.map(tag => formatPropertyTag(tag)).join(', ')}"`
  ]);

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  const timestamp = new Date().toISOString().split('T')[0];
  link.download = `properties-export-${timestamp}.csv`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};