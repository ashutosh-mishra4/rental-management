import type { Payment } from '../types/schema';
import { formatDate, formatCurrency } from './formatters';

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