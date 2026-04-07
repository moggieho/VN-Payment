import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency } from './mockData';

export default function ScanAndPayModal({ invoice, onClose }) {
  if (!invoice) return null;

  const qrValue = [
    `Invoice: ${invoice.id}`,
    `Payee: VN-Payment Co., Ltd`,
    `Amount: ${invoice.amount} VND`,
    `Ref: ${invoice.id}`,
  ].join('\n');

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="scan-pay-title">
      <div className="modal">
        <div className="modal-header">
          <h2 id="scan-pay-title">📱 Scan & Pay</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-invoice-id">Invoice: <strong>{invoice.id}</strong></p>
          <p className="modal-customer">Customer: <strong>{invoice.customerName}</strong></p>
          <p className="modal-amount">
            Amount Due: <strong className="amount-highlight">{formatCurrency(invoice.amount)}</strong>
          </p>
          <div className="qr-container">
            <QRCodeSVG
              value={qrValue}
              size={220}
              level="H"
              includeMargin
            />
          </div>
          <p className="qr-instruction">
            Open your banking app and scan this QR code to pay
          </p>
          <div className="bank-info">
            <p><strong>Bank:</strong> Vietcombank</p>
            <p><strong>Account:</strong> 1234567890</p>
            <p><strong>Account Name:</strong> VN-Payment Co., Ltd</p>
            <p><strong>Transfer Note:</strong> {invoice.id}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
