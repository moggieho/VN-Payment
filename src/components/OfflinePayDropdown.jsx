import { useState, useEffect, useRef } from 'react';

export default function OfflinePayDropdown({ invoice, onGenerateRef, onSubmitPayment }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="btn btn-secondary dropdown-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Offline Pay
        <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="dropdown-menu" role="menu">
          <button
            className="dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onGenerateRef(invoice);
            }}
          >
            <span className="dropdown-item-icon">🔖</span>
            Generate Payment Reference Number
          </button>
          <button
            className="dropdown-item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSubmitPayment(invoice);
            }}
          >
            <span className="dropdown-item-icon">📤</span>
            Submit Payment Instruction
          </button>
        </div>
      )}
    </div>
  );
}
