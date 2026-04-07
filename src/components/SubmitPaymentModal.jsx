import { useState } from 'react';
import { formatCurrency } from './mockData';

export default function SubmitPaymentModal({ invoice, onClose }) {
  const [form, setForm] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    transferDate: new Date().toISOString().split('T')[0],
    referenceNumber: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!invoice) return null;

  function validate() {
    const errs = {};
    if (!form.bankName.trim()) errs.bankName = 'Bank name is required';
    if (!form.accountNumber.trim()) errs.accountNumber = 'Account number is required';
    if (!form.accountName.trim()) errs.accountName = 'Account name is required';
    if (!form.transferDate) errs.transferDate = 'Transfer date is required';
    if (!form.referenceNumber.trim()) errs.referenceNumber = 'Reference number is required';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="submit-pay-title">
        <div className="modal">
          <div className="modal-header">
            <h2 id="submit-pay-title">✅ Instruction Submitted</h2>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="modal-body success-body">
            <div className="success-icon">✅</div>
            <p className="success-message">
              Payment instruction for <strong>{invoice.id}</strong> has been submitted successfully.
            </p>
            <p className="success-sub">
              Our team will verify your payment within 1–2 business days.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="submit-pay-title">
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2 id="submit-pay-title">📤 Submit Payment Instruction</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-invoice-id">Invoice: <strong>{invoice.id}</strong></p>
          <p className="modal-amount">
            Amount Due: <strong className="amount-highlight">{formatCurrency(invoice.amount)}</strong>
          </p>
          <form className="payment-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bankName">Bank Name <span className="required">*</span></label>
                <input
                  id="bankName"
                  name="bankName"
                  type="text"
                  placeholder="e.g. Vietcombank"
                  value={form.bankName}
                  onChange={handleChange}
                  className={errors.bankName ? 'input-error' : ''}
                />
                {errors.bankName && <span className="error-text">{errors.bankName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number <span className="required">*</span></label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  placeholder="e.g. 1234567890"
                  value={form.accountNumber}
                  onChange={handleChange}
                  className={errors.accountNumber ? 'input-error' : ''}
                />
                {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="accountName">Account Name <span className="required">*</span></label>
                <input
                  id="accountName"
                  name="accountName"
                  type="text"
                  placeholder="e.g. Nguyen Van A"
                  value={form.accountName}
                  onChange={handleChange}
                  className={errors.accountName ? 'input-error' : ''}
                />
                {errors.accountName && <span className="error-text">{errors.accountName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="transferDate">Transfer Date <span className="required">*</span></label>
                <input
                  id="transferDate"
                  name="transferDate"
                  type="date"
                  value={form.transferDate}
                  onChange={handleChange}
                  className={errors.transferDate ? 'input-error' : ''}
                />
                {errors.transferDate && <span className="error-text">{errors.transferDate}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="referenceNumber">Transfer Reference / Description <span className="required">*</span></label>
              <input
                id="referenceNumber"
                name="referenceNumber"
                type="text"
                placeholder="e.g. VNPAY-INV2024001-ABC123"
                value={form.referenceNumber}
                onChange={handleChange}
                className={errors.referenceNumber ? 'input-error' : ''}
              />
              {errors.referenceNumber && <span className="error-text">{errors.referenceNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Any additional information..."
                value={form.notes}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer form-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Instruction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
