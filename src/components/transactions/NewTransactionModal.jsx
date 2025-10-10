import React from 'react';
import moment from 'moment';
import { createTransaction } from '../../data/transactionsSample';

const defaultForm = () => ({
  date: moment().format('YYYY-MM-DD'),
  category: 'Other',
  merchant: '',
  amount: '',
  account: 'Unassigned',
});

const NewTransactionModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = React.useState(defaultForm());

  React.useEffect(() => {
    if (open) setForm(defaultForm());
  }, [open]);

  if (!open) return null;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const tx = createTransaction({
      ...form,
      amount: parseFloat(form.amount || '0'),
    });
    onSave?.(tx);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md glass border border-(--color-border) rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">New Transaction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs">
            <span>Date</span>
            <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)" required />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            <span>Category</span>
            <input value={form.category} onChange={(e) => update('category', e.target.value)} className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)" required />
          </label>
          <label className="flex flex-col gap-1 text-xs sm:col-span-2">
            <span>Merchant</span>
            <input value={form.merchant} onChange={(e) => update('merchant', e.target.value)} className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)" required />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            <span>Amount</span>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => update('amount', e.target.value)} className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)" required />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            <span>Account</span>
            <input value={form.account} onChange={(e) => update('account', e.target.value)} className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)" required />
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-3 py-2 text-xs rounded-md border border-(--color-border) hover:border-(--color-accent)">Cancel</button>
          <button type="submit" className="px-3 py-2 text-xs rounded-md bg-(--color-accent) text-black font-semibold hover:opacity-90">Save</button>
        </div>
      </form>
    </div>
  );
};

export default NewTransactionModal;
