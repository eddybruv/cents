import React from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCategories } from "../../hooks/useCategories";
import API from "../../api/API";

const EditTransactionModal = ({ transaction, onClose }) => {
  const queryClient = useQueryClient();
  const { data: categories = [] } = useCategories();

  const [userDescription, setUserDescription] = React.useState(
    transaction?.userDescription ?? "",
  );
  const [categoryId, setCategoryId] = React.useState(
    transaction?.categoryId ?? "",
  );

  const mutation = useMutation({
    mutationFn: ({ id, payload }) =>
      API.patch(`/api/transactions/${id}`, payload).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onClose();
    },
  });

  if (!transaction) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      id: transaction.id,
      payload: {
        userDescription: userDescription.trim() || null,
        categoryId: categoryId !== "" ? Number(categoryId) : undefined,
      },
    });
  };

  const merchant = transaction.merchantName || transaction.name || "Unknown";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md glass border border-(--color-border) rounded-lg p-4 sm:p-6 space-y-4"
      >
        <div>
          <h2 className="text-base sm:text-lg font-semibold">
            Edit Transaction
          </h2>
          <p className="text-xs text-(--color-muted) mt-0.5 truncate">
            {merchant}
          </p>
        </div>

        <label className="flex flex-col gap-1 text-xs">
          <span className="text-(--color-muted)">Category</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border) focus:outline-none focus:border-(--color-accent)"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs">
          <span className="text-(--color-muted)">Description</span>
          <textarea
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            placeholder="Add a personal note..."
            rows={3}
            className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border) focus:outline-none focus:border-(--color-accent) resize-none text-sm"
          />
        </label>

        {mutation.isError && (
          <p className="text-xs text-red-400">
            {mutation.error?.response?.data?.error || "Failed to save changes"}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

EditTransactionModal.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    merchantName: PropTypes.string,
    userDescription: PropTypes.string,
    categoryId: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EditTransactionModal;
