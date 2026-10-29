
import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import GoBackButton from "./components/GoBackButton";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <SearchX size={40} strokeWidth={1.5} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Page Not Found
        </p>

        <h1 className="mt-3 text-7xl font-extrabold tracking-tight text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Oops! Page not found
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          The page you are looking for does not exist, may have been moved, or
          the URL may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Home size={17} />
            Return to Dashboard
          </Link>

          <GoBackButton />
        </div>
      </div>
    </main>
  );
}
