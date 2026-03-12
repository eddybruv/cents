import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditTransactionModal from "./EditTransactionModal";
import Select from "../Select";

const columnHelper = createColumnHelper();

const currency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

const numericSort = (rowA, rowB, columnId) => {
  const a = parseFloat(rowA.getValue(columnId) ?? 0);
  const b = parseFloat(rowB.getValue(columnId) ?? 0);
  return a - b;
};

const TransactionsTable = ({ data = [] }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => (
          <span className="text-(--color-muted)">
            {moment(info.getValue()).format("MMM D")}
          </span>
        ),
        sortingFn: "datetime",
      }),
      columnHelper.accessor(
        (row) => row.merchantName || row.name || "Unknown",
        {
          header: "Merchant",
          id: "merchantName",
          cell: (info) => (
            <div className="flex flex-col max-w-[200px]">
              <span className="truncate font-medium">{info.getValue()}</span>
              {info.row.original.userDescription && (
                <span className="text-[11px] text-(--color-muted) truncate italic">
                  {info.row.original.userDescription}
                </span>
              )}
            </div>
          ),
        },
      ),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <span className="text-[13px]">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("accountName", {
        header: "Account",
        cell: (info) => (
          <span className="text-(--color-muted) text-[13px]">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span
            className={`font-semibold tabular-nums ${info.getValue() > 0 ? "text-red-400" : "text-emerald-400"}`}
          >
            {currency(info.getValue())}
          </span>
        ),
        sortingFn: numericSort,
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={() => setEditingTransaction(row.original)}
            className="p-1.5 rounded-lg text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-elevated) transition-all"
            aria-label="Edit transaction"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="w-3 h-3" />
          </button>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="card rounded-xl p-4 sm:p-5 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search transactions..."
          className="w-full sm:w-64 px-3 py-2 text-sm rounded-lg bg-(--color-surface) border border-(--color-border) focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent-muted) transition-all placeholder:text-(--color-muted)"
        />
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full text-[13px] border-collapse min-w-[600px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-left font-medium px-3 py-2.5 cursor-pointer select-none text-[11px] uppercase tracking-wider text-(--color-muted) border-b border-(--color-border)"
                  >
                    <div className="flex items-center gap-1">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      <span className="text-[9px]">
                        {{ asc: "\u25B2", desc: "\u25BC" }[header.column.getIsSorted()] ||
                          ""}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-(--color-surface-elevated) transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2.5 border-b border-(--color-border) align-top"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-(--color-muted)"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 rounded-lg border border-(--color-border) disabled:opacity-30 hover:bg-(--color-surface-elevated) transition-colors text-[12px] font-medium"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 rounded-lg border border-(--color-border) disabled:opacity-30 hover:bg-(--color-surface-elevated) transition-colors text-[12px] font-medium"
          >
            Next
          </button>
        </div>
        <div className="flex items-center gap-2 text-(--color-muted)">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(value) => table.setPageSize(Number(value))}
            options={[8, 15, 30]}
            className="w-20"
          />
        </div>
      </div>
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
