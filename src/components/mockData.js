export const MOCK_INVOICES = [
  {
    id: 'INV-2024-001',
    customerName: 'Nguyen Van A',
    customerEmail: 'nguyenvana@email.com',
    amount: 1500000,
    dueDate: '2024-04-15',
    issuedDate: '2024-03-15',
    status: 'unpaid',
    description: 'Web Development Services - March 2024',
  },
  {
    id: 'INV-2024-002',
    customerName: 'Tran Thi B',
    customerEmail: 'tranthib@email.com',
    amount: 3200000,
    dueDate: '2024-04-20',
    issuedDate: '2024-03-20',
    status: 'unpaid',
    description: 'Software License Fee - Q1 2024',
  },
  {
    id: 'INV-2024-003',
    customerName: 'Le Van C',
    customerEmail: 'levanc@email.com',
    amount: 850000,
    dueDate: '2024-03-30',
    issuedDate: '2024-03-01',
    status: 'overdue',
    description: 'Consulting Services - February 2024',
  },
  {
    id: 'INV-2024-004',
    customerName: 'Pham Thi D',
    customerEmail: 'phamthid@email.com',
    amount: 2750000,
    dueDate: '2024-04-25',
    issuedDate: '2024-03-25',
    status: 'unpaid',
    description: 'Cloud Hosting Services - April 2024',
  },
  {
    id: 'INV-2024-005',
    customerName: 'Hoang Van E',
    customerEmail: 'hoangvane@email.com',
    amount: 4500000,
    dueDate: '2024-02-28',
    issuedDate: '2024-01-28',
    status: 'paid',
    description: 'Annual Maintenance Contract 2024',
  },
];

export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export function generatePaymentRef(invoiceId) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const invoiceCode = invoiceId.replace(/[^A-Z0-9]/g, '');
  return `VNPAY-${invoiceCode}-${timestamp}`;
}
