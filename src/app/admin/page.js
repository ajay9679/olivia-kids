"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminDarkMode } from "./AdminLayoutClient";

import { supabase } from "@/app/lib/supabaseClient";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { dark, setDark } = useAdminDarkMode();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState("");

    const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "status", header: "Status" },
    ],
    []
  );

  const table = useReactTable({
    data: students,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    debugTable: false,
  });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
            return;
        }
    if (status === "authenticated") {
        async function fetchStudents() {
        setLoading(true);
        const { data, error } = await supabase
          .from("students")
          .select("id, name, email, status");
        if (!error) setStudents(data || []);
        setLoading(false);
      }
      fetchStudents();
    } 
  }, [status, router]);
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return null; // Don't render anything while redirecting
  }

  

  // Example data for visualization
  const stats = [
    { label: "Total Students", value: students.length },
    { label: "Active", value: students.filter(s => s.status === "active").length },
    { label: "Inactive", value: students.filter(s => s.status === "inactive").length },
  ];

  // Navigation links for admin
  const navLinks = [
    { label: "Dashboard", href: "/admin" },
    { label: "Events", href: "/admin/events" },
    { label: "Programs", href: "/admin/programs" },
    { label: "Gallery", href: "/admin/gallery" },
    { label: "Testimonials", href: "/admin/testimonials" },
    { label: "Users", href: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg flex flex-col z-20">
        <div className="flex flex-col items-center py-8 border-b border-gray-100 dark:border-gray-800">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <span className="text-3xl font-bold text-blue-700 dark:text-blue-200">A</span>
          </div>
          <span className="font-bold text-blue-700 dark:text-blue-200 text-lg tracking-wide">Admin</span>
        </div>
        <nav className="flex-1 flex flex-col gap-1 mt-6 px-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} passHref legacyBehavior={false} className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition flex items-center">
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-0 md:ml-64 min-h-screen">
        <header className="bg-white dark:bg-gray-900 shadow flex items-center justify-between px-6 py-3 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-200 tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center justify-center"
              onClick={() => setDark(d => !d)}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
            <span className="text-gray-600 dark:text-gray-200 font-semibold text-sm md:text-base">{session?.user?.email || "admin"}</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-sm md:text-base">Logout</button>
          </div>
        </header>
        <div className="p-4 md:p-6 flex flex-row gap-4 md:gap-6 justify-center items-stretch">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 min-w-[120px] bg-gradient-to-br from-blue-100 to-pink-100 dark:from-gray-800 dark:to-blue-900 rounded-xl shadow p-4 md:p-6 flex flex-col items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-200 mb-1 md:mb-2">{stat.value}</span>
              <span className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="p-4 md:p-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 dark:text-gray-100">Student List</h2>
            <input
              className="mb-4 px-3 py-2 border rounded w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              placeholder="Search..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th
                            key={header.id}
                            className="px-4 py-2 cursor-pointer select-none text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === "asc" && " ▲"}
                            {header.column.getIsSorted() === "desc" && " ▼"}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="border-t border-gray-200 dark:border-gray-700">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-2 text-gray-900 dark:text-gray-100">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <button
                      className="px-3 py-1 mr-2 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {"|<"}
                    </button>
                    <button
                      className="px-3 py-1 mr-2 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {"<"}
                    </button>
                    <button
                      className="px-3 py-1 mr-2 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {">"}
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                    >
                      {">|"}
                    </button>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                  </span>
                  <select
                    className="ml-2 px-2 py-1 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                  >
                    {[10, 20, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}




