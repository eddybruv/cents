import React from "react";
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
import { transactions } from "../../data/transactionsSample";

const columnHelper = createColumnHelper();

const currency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

const TransactionsTable = ({ data = transactions }) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState([]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => moment(info.getValue()).format("MMM D"),
        sortingFn: "datetime",
      }),
      columnHelper.accessor("merchant", {
        header: "Merchant",
        cell: (info) => (
          <span className="truncate max-w-[140px] inline-block">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("category", {
        header: "Category",
      }),
      columnHelper.accessor("account", {
        header: "Account",
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span
            className={info.getValue() > 0 ? "text-red-400" : "text-green-400"}
          >
            {currency(info.getValue())}
          </span>
        ),
        sortingFn: "basic",
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
    <div className="glass border border-(--color-border) rounded-md p-4 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search transactions..."
          className="w-full sm:w-64 px-3 py-2 text-sm rounded-md bg-(--color-surface) border border-(--color-border) focus:outline-none focus:border-(--color-accent)"
        />
      </div>
      <div className="overflow-auto -mx-2 sm:mx-0">
        <table className="w-full text-sm border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-left font-medium px-2 py-2 cursor-pointer select-none text-(--color-muted)"
                  >
                    <div className="flex items-center gap-1">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      <span>
                        {{ asc: "▲", desc: "▼" }[header.column.getIsSorted()] ||
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
              <tr key={row.id} className="hover:bg-(--color-surface)">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-2 border-t border-(--color-border) align-top"
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
                  className="text-center py-10 text-(--color-muted)"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded-md border border-(--color-border) disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded-md border border-(--color-border) disabled:opacity-40"
          >
            Next
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 rounded-md bg-(--color-surface) border border-(--color-border)"
          >
            {[8, 15, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
