import { useState } from 'react';
import { formatCurrency, generatePaymentRef } from './mockData';

export default function GenerateRefModal({ invoice, onClose }) {
  const [ref] = useState(() => generatePaymentRef(invoice?.id ?? ''));
  const [copied, setCopied] = useState(false);

  if (!invoice) return null;

  function handleCopy() {
    navigator.clipboard.writeText(ref).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="gen-ref-title">
      <div className="modal">
        <div className="modal-header">
          <h2 id="gen-ref-title">🔖 Payment Reference Number</h2>
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
          <div className="ref-number-box">
            <p className="ref-label">Your Payment Reference Number:</p>
            <div className="ref-number">
              <code>{ref}</code>
              <button className="btn-copy" onClick={handleCopy} title="Copy to clipboard">
                {copied ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>
          <div className="ref-instructions">
            <p><strong>How to use:</strong></p>
            <ol>
              <li>Go to your bank&apos;s transfer portal or ATM</li>
              <li>Enter the bank account details below</li>
              <li>Use the reference number above as the transfer description</li>
            </ol>
            <div className="bank-info">
              <p><strong>Bank:</strong> Vietcombank</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>Account Name:</strong> VN-Payment Co., Ltd</p>
              <p><strong>Amount:</strong> {formatCurrency(invoice.amount)}</p>
              <p><strong>Reference:</strong> {ref}</p>
            </div>
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
