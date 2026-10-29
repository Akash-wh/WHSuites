"use client";

import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      <ArrowLeft size={17} />
      Go Back
    </button>
  );
}
