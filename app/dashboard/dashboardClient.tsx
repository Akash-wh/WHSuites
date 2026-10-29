"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  ArrowDownUp,
  ArrowLeftRight,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  FileText,
  Flame,
  Globe,
  Handshake,
  Headphones,
  LayoutDashboard,
  ListTodo,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Sun,
  Trash2,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

type ColorName =
  | "red"
  | "blue"
  | "orange"
  | "purple"
  | "teal"
  | "green"
  | "pink"
  | "gray"
  | "slate";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  ArrowDownUp,
  ArrowLeftRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle,
  CircleAlert,
  ClipboardList,
  FileText,
  Flame,
  Globe,
  Handshake,
  Headphones,
  LayoutDashboard,
  ListTodo,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Sun,
  Trash2,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  X,
};

const iconColors: Record<ColorName, string> = {
  red: "bg-red-50 text-red-600",
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  purple: "bg-purple-50 text-purple-600",
  teal: "bg-teal-50 text-teal-600",
  green: "bg-emerald-50 text-emerald-600",
  pink: "bg-pink-50 text-pink-500",
  gray: "bg-slate-100 text-slate-500",
  slate: "bg-slate-50 text-slate-500",
};

interface Stat {
  label: string;
  value: string;
  change: string;
  color: string;
  icon: string;
}

interface Metric {
  label: string;
  value: string;
  icon?: string;
  color?: string;
  change?: string;
}

interface Todo {
  id: number;
  text: string;
  date: string;
  done: boolean;
}

interface Service {
  id: number;
  subject: string;
  customer: string;
  startDate: string;
  endDate: string;
}

interface DashboardClientProps {
  stats: Stat[];
  leadStatuses: Metric[];
  leadSources: Metric[];
  initialTodos: Todo[];
  services: Service[];
}

const navigation = [
  { label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { label: "Search Locations", icon: "Search", href: "/search-locations" },
  { label: "My Todo", icon: "ListTodo", href: "/tasks" },
  { label: "Leads", icon: "Users", href: "/leads", expandable: true },
  { label: "Task", icon: "ClipboardList", href: "/tasks" },
  { label: "Team Status", icon: "Activity", href: "/team-status" },
  { label: "Customers", icon: "UsersRound", href: "/customers" },
  { label: "My team", icon: "UserCheck", href: "/my-team" },
  { label: "Users", icon: "Users", href: "/users" },
  { label: "Activity Log", icon: "Activity", href: "/activity-log" },
  { label: "Settings", icon: "Settings", href: "/settings", expandable: true },
  { label: "Master", icon: "Settings", href: "/master" },
  { label: "Reports", icon: "FileText", href: "/reports", expandable: true },
  { label: "Invoices", icon: "FileText", href: "/invoices" },
  {
    label: "Role & Permissions",
    icon: "ShieldCheck",
    href: "/role-permissions",
    expandable: true,
  },
];

const leadTypes: Metric[] = [
  {
    label: "Hot",
    value: "2000",
    change: "+12%",
    icon: "Flame",
    color: "orange",
  },
  { label: "Warm", value: "1025", change: "+8%", icon: "Sun", color: "orange" },
  {
    label: "Cold",
    value: "2410",
    change: "+5%",
    icon: "Snowflake",
    color: "blue",
  },
  {
    label: "Interested",
    value: "2,847",
    change: "+5%",
    icon: "Activity",
    color: "blue",
  },
];

const lifecycle: Metric[] = [
  { label: "New Customer", value: "1,825", icon: "UserPlus", color: "blue" },
  {
    label: "Active Customer",
    value: "3,420",
    icon: "UserCheck",
    color: "green",
  },
  {
    label: "Repeat Customer",
    value: "1,260",
    icon: "ArrowLeftRight",
    color: "purple",
  },
  { label: "Reorder", value: "845", icon: "ShoppingCart", color: "orange" },
  {
    label: "Mature Customer",
    value: "526",
    icon: "ShieldCheck",
    color: "blue",
  },
  { label: "Inactive Customer", value: "310", icon: "Users", color: "red" },
];

const assignments: Metric[] = [
  { label: "Unassigned", value: "20,000", icon: "Users", color: "slate" },
  { label: "Assigned", value: "45,120", icon: "UserCheck", color: "green" },
  {
    label: "Transferred",
    value: "2,450",
    icon: "ArrowLeftRight",
    color: "blue",
  },
  { label: "Reassigned", value: "1,280", icon: "UsersRound", color: "purple" },
  {
    label: "Overdue Follow-Up",
    value: "12",
    icon: "CircleAlert",
    color: "red",
  },
];

const funnel = [
  {
    label: "Prospect",
    value: "5,420",
    width: 100,
    color: "#397df5",
    count: "330 deals",
  },
  {
    label: "Qualification",
    value: "1,250",
    width: 85,
    color: "#625df1",
    count: "447 deals",
  },
  {
    label: "Proposal",
    value: "1,310",
    width: 70,
    color: "#f59e0b",
    count: "239 deals",
  },
  {
    label: "Negotiation",
    value: "665",
    width: 55,
    color: "#10b981",
    count: "187 deals",
  },
  {
    label: "Closed Deal",
    value: "265",
    width: 40,
    color: "#059669",
    count: "3 Lost",
  },
];

const team = [
  ["Rajeev Kumar", "1,420", "28", "45", "112", "310", "780", "95", "50"],
  ["Josh Buttler", "980", "18", "32", "85", "240", "510", "62", "33"],
  ["Nikhil Kumar", "1,210", "34", "38", "98", "280", "670", "68", "32"],
  ["Anil Kumar", "650", "9", "15", "42", "160", "350", "31", "23"],
  ["Sunil Kumar", "890", "15", "28", "65", "210", "490", "58", "24"],
  ["Daman Garg", "1,100", "22", "35", "88", "260", "600", "41", "54"],
  ["Vinay Chauhan", "3,500", "31", "42", "105", "295", "730", "114", "33"],
];

function getColor(color?: string): ColorName {
  return color && color in iconColors ? (color as ColorName) : "slate";
}

function Panel({
  title,
  children,
  action,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-md border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex min-h-11 items-center justify-between gap-2 px-3 pt-1">
        <h2 className="border-l-2 border-orange-500 pl-2 text-[13px] font-bold text-slate-900">
          {title}
        </h2>
        {action}
      </div>
      <div className="px-3 pb-3">{children}</div>
    </section>
  );
}

function SmallAction({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="shrink-0 rounded border border-slate-200 px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function MetricTile({ item }: { item: Metric }) {
  const Icon = item.icon ? (iconMap[item.icon] ?? Activity) : null;
  const color = getColor(item.color);

  return (
    <div className="flex min-w-0 items-center gap-2 rounded border border-slate-200 bg-slate-50/70 p-2">
      {Icon && (
        <Icon
          size={16}
          className={`shrink-0 ${iconColors[color].split(" ")[1]}`}
        />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-slate-900">
          {item.value}
        </p>
        <p className="truncate text-[10px] text-slate-500">{item.label}</p>
      </div>

      {item.change && (
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] text-emerald-600">
          {item.change}
        </span>
      )}
    </div>
  );
}

export default function DashboardClient({
  stats,
  leadStatuses,
  leadSources,
  initialTodos,
  services,
}: DashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [todos, setTodos] = useState(initialTodos);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("This Month");
  const [servicePage, setServicePage] = useState(1);

  const filteredServices = services.filter((service) =>
    `${service.subject} ${service.customer}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / pageSize));
  const currentPage = Math.min(servicePage, totalPages);

  const visibleServices = filteredServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function addTodo() {
    const text = window.prompt("Enter a new task:");

    if (!text?.trim()) return;

    setTodos((current) => [
      {
        id: Date.now(),
        text: text.trim(),
        date: new Date().toLocaleDateString(),
        done: false,
      },
      ...current,
    ]);
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800">
      {/* Mobile overlay */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 font-black text-blue-700">
              W
            </div>
            <div>
              <p className="text-lg font-extrabold leading-5 text-slate-900">
                whsuites
              </p>
              <p className="text-[7px] uppercase tracking-wide text-blue-600">
                Lead Management System
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
        </div>

        <p className="px-3 pb-2 pt-5 text-[9px] font-bold uppercase text-slate-500">
          Main Menu
        </p>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2">
          {navigation.map((item) => {
            const Icon = iconMap[item.icon] ?? Activity;

            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (pathname !== item.href) {
                    router.push(item.href);
                  }
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded px-2.5 py-2 text-left text-[11px] transition ${
                  active
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={15} />
                <span className="flex-1">{item.label}</span>
                {item.expandable && <ChevronDown size={12} />}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 bg-[#071334] px-3 py-3 text-left text-xs text-white"
        >
          <Headphones size={15} />
          <span className="flex-1">Help Desk</span>
          <ChevronDown size={12} />
        </button>
      </aside>

      {/* Main content */}
      <div className="min-w-0 lg:pl-56">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-[#071334] px-3 text-white shadow-sm sm:px-5">
          <button
            type="button"
            className="rounded p-1 hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <h1 className="hidden truncate text-sm font-semibold sm:block">
            {navigation.find((item) => item.href === pathname)?.label ??
              "Dashboard"}
          </h1>

          <div className="ml-auto flex w-full max-w-md items-center gap-2 sm:ml-auto">
            <div className="flex min-w-0 flex-1 items-center rounded bg-white px-3 text-slate-500">
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setServicePage(1);
                }}
                placeholder="Search services..."
                aria-label="Search services"
                className="h-9 w-full min-w-0 bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
              />
              <Search size={15} />
            </div>

            <button
              type="button"
              onClick={addTodo}
              aria-label="Add task"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden rounded border border-white/30 p-2 sm:block"
          >
            <Bell size={16} />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-slate-800 sm:flex">
            AK
          </div>
        </header>

        <main className="mx-auto max-w-[1800px] space-y-4 p-3 sm:p-4 lg:p-5">
          {/* KPI cards */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {stats.map((item) => {
              const Icon = iconMap[item.icon] ?? Activity;
              const color = getColor(item.color);

              return (
                <div
                  key={item.label}
                  className="min-w-0 rounded-md border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-bold text-slate-900">
                        {item.value}
                      </p>
                      <p className="mt-1 truncate text-[10px] text-slate-500">
                        {item.label}
                      </p>
                    </div>

                    <div className={`rounded-md p-2 ${iconColors[color]}`}>
                      <Icon size={17} />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-semibold text-green-600">
                      {item.change}
                    </span>
                    <span className="text-[9px] text-slate-600">
                      View details
                    </span>
                    <ArrowRight size={11} className="text-green-600" />
                  </div>
                </div>
              );
            })}
          </section>

          {/* Overview heading */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="border-l-2 border-orange-500 pl-2 text-sm font-bold text-slate-900">
              Lead Overview
            </h2>

            <select
              aria-label="Select dashboard period"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-[10px] outline-none"
            >
              <option>This Month</option>
              <option>This Week</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* Lead pipeline and sources */}
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
            <div className="space-y-3 xl:col-span-7">
              <Panel
                title="Lead Status (Sales Pipeline)"
                action={<SmallAction>View All →</SmallAction>}
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {leadStatuses.map((item) => (
                    <MetricTile key={item.label} item={item} />
                  ))}
                </div>
              </Panel>

              <Panel
                title="Lead Type"
                action={<SmallAction>View All →</SmallAction>}
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {leadTypes.map((item) => (
                    <MetricTile key={item.label} item={item} />
                  ))}
                </div>
              </Panel>
            </div>

            <Panel
              title="Lead Source"
              action={<SmallAction>View All →</SmallAction>}
              className="xl:col-span-5"
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {leadSources.map((item) => (
                  <MetricTile key={item.label} item={item} />
                ))}
              </div>
            </Panel>
          </div>

          {/* Customer lifecycle and assignment */}
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <Panel
              title="Customer Lifecycle"
              action={<SmallAction>View All →</SmallAction>}
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {lifecycle.map((item) => (
                  <MetricTile key={item.label} item={item} />
                ))}
              </div>
            </Panel>

            <Panel
              title="Lead Assignment"
              action={<SmallAction>View All →</SmallAction>}
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {assignments.map((item) => (
                  <MetricTile key={item.label} item={item} />
                ))}
              </div>
            </Panel>
          </div>

          {/* To-do list and expiring services */}
          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-12">
            <Panel
              title="My To Do Items"
              action={
                <div className="flex gap-2">
                  <SmallAction>View All</SmallAction>
                  <button
                    type="button"
                    onClick={addTodo}
                    className="rounded border border-slate-200 px-2 py-1 text-[10px] hover:bg-slate-50"
                  >
                    New To Do
                  </button>
                </div>
              }
              className="2xl:col-span-5"
            >
              <p className="mb-2 text-[11px] font-semibold">
                Latest to-do&apos;s
              </p>

              <div className="divide-y divide-slate-100">
                {todos.map((todo) => (
                  <div key={todo.id} className="flex items-center gap-2 py-3">
                    <button
                      type="button"
                      aria-label={
                        todo.done ? "Mark incomplete" : "Mark complete"
                      }
                      onClick={() =>
                        setTodos((current) =>
                          current.map((item) =>
                            item.id === todo.id
                              ? { ...item, done: !item.done }
                              : item,
                          ),
                        )
                      }
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        todo.done
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {todo.done && <Check size={11} />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[11px] ${
                          todo.done
                            ? "text-slate-500 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {todo.text}
                      </p>
                      {todo.date && (
                        <p className="mt-1 text-[9px] text-slate-500">
                          {todo.date}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      aria-label="Edit task"
                      onClick={() => {
                        const text = window.prompt("Edit task:", todo.text);

                        if (text?.trim()) {
                          setTodos((current) =>
                            current.map((item) =>
                              item.id === todo.id
                                ? { ...item, text: text.trim() }
                                : item,
                            ),
                          );
                        }
                      }}
                      className="p-1 text-slate-500 hover:text-blue-600"
                    >
                      <Pencil size={13} />
                    </button>

                    <button
                      type="button"
                      aria-label="Delete task"
                      onClick={() =>
                        setTodos((current) =>
                          current.filter((item) => item.id !== todo.id),
                        )
                      }
                      className="p-1 text-slate-500 hover:text-red-600"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="Services Expiring Soon"
              action={<SmallAction>View All</SmallAction>}
              className="2xl:col-span-7"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-155 border-collapse text-left text-[10px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700">
                      {["Subject #", "Customer", "Start Date", "End Date"].map(
                        (header) => (
                          <th
                            key={header}
                            className="border-b border-slate-200 px-2 py-3 font-semibold"
                          >
                            {header}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {visibleServices.map((service) => (
                      <tr key={service.id} className="hover:bg-slate-50">
                        <td className="max-w-64 truncate border-b border-slate-100 px-2 py-3 text-blue-600">
                          {service.subject}
                        </td>
                        <td className="border-b border-slate-100 px-2 py-3">
                          {service.customer}
                        </td>
                        <td className="whitespace-nowrap border-b border-slate-100 px-2 py-3">
                          {service.startDate}
                        </td>
                        <td className="whitespace-nowrap border-b border-slate-100 px-2 py-3">
                          {service.endDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {visibleServices.length === 0 && (
                  <p className="py-6 text-center text-xs text-slate-500">
                    No services found.
                  </p>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                <span>
                  Showing{" "}
                  {filteredServices.length
                    ? (currentPage - 1) * pageSize + 1
                    : 0}
                  {"–"}
                  {Math.min(
                    currentPage * pageSize,
                    filteredServices.length,
                  )} of {filteredServices.length} entries
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setServicePage((page) => Math.max(1, page - 1))
                    }
                    className="flex items-center gap-1 disabled:opacity-40"
                  >
                    <ChevronLeft size={13} /> Previous
                  </button>

                  <span className="rounded bg-slate-700 px-3 py-2 text-white">
                    {currentPage}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setServicePage((page) => Math.min(totalPages, page + 1))
                    }
                    className="flex items-center gap-1 disabled:opacity-40"
                  >
                    Next <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </Panel>
          </div>

          {/* Funnel and team performance */}
          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-12">
            <Panel
              title="Pipeline Funnel"
              action={<SmallAction>{period}</SmallAction>}
              className="2xl:col-span-4"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-slate-900">2656</span>
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-600">
                  +12.5%
                </span>
                <span className="text-[10px] text-slate-500">
                  Compared to last month
                </span>
              </div>

              <div className="space-y-2">
                {funnel.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[72px_minmax(80px,1fr)_66px] items-center gap-2"
                  >
                    <span className="truncate text-[10px]">{item.label}</span>

                    <div className="flex h-7 items-center justify-center">
                      <div
                        className="flex h-full items-center justify-center text-[10px] font-medium text-white"
                        style={{
                          width: `${item.width}%`,
                          backgroundColor: item.color,
                          clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>

                    <span className="truncate text-[9px]">{item.count}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded bg-emerald-600 p-3 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-xs">Deals Won</p>
                  <div className="flex -space-x-1">
                    {[
                      "bg-purple-600",
                      "bg-slate-900",
                      "bg-amber-400",
                      "bg-emerald-500",
                    ].map((color, index) => (
                      <span
                        key={index}
                        className={`h-5 w-5 rounded-full border-2 border-white ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-lg font-bold">1005</p>
              </div>
            </Panel>

            <Panel
              title="My Team Performance"
              action={
                <div className="flex flex-wrap gap-2">
                  <SmallAction>
                    <CalendarDays size={10} className="mr-1 inline" />
                    18 Feb 26 - 19 Mar 26
                  </SmallAction>
                  <SmallAction>Generate Report →</SmallAction>
                </div>
              }
              className="2xl:col-span-8"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-190 border-collapse text-left text-[10px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700">
                      {[
                        "User",
                        "Total",
                        "Hot",
                        "Followup",
                        "NCP",
                        "Cold",
                        "Casual",
                        "Dead",
                        "Mature",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border border-slate-200 px-2 py-3 font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {team.map((row) => (
                      <tr key={row[0]} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap border border-slate-100 px-2 py-2">
                          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[8px] font-bold text-purple-700">
                            {row[0]
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </span>
                          {row[0]}
                        </td>

                        {row.slice(1).map((value, index) => (
                          <td
                            key={index}
                            className="border border-slate-100 px-2 py-2"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          {/* Footer */}
          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-3 text-[10px] text-slate-500">
            <p>
              Copyright © 2026{" "}
              <span className="text-blue-600">Webhoper CRM</span>
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-600">
                About
              </a>
              <a href="#" className="hover:text-blue-600">
                Terms
              </a>
              <a href="#" className="hover:text-blue-600">
                Contact Us
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
