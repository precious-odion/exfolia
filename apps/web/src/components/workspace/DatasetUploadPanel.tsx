"use client";

import { BarChart3, FileUp, MessageSquareText, Plus, Upload, FileText } from "lucide-react";

type DatasetUploadPanelProps = {
  error: string | null;
  isUploading: boolean;
  onFileSelected: (file: File) => void;
};

const nextSteps = [
  {
    label: "Upload CSV",
    icon: Upload
  },
  {
    label: "Ask AI Questions",
    icon: MessageSquareText
  },
  {
    label: "Generate Reports",
    icon: FileText
  }
];

export function DatasetUploadPanel({
  error,
  isUploading,
  onFileSelected
}: DatasetUploadPanelProps) {
  return (
    <section className="flex min-h-[calc(100vh-70px)] items-center justify-center px-5 py-12">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-primary">
          <BarChart3 size={38} strokeWidth={2.1} />
        </div>

        <h1 className="mt-7 text-3xl font-semibold tracking-tight text-foreground">
          Create Your First Analysis
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted">
          Upload a CSV dataset to generate a structured preview with inferred columns,
          sample rows, and analysis-ready metadata.
        </p>

        <div className="mt-7">
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.98]">
            <Plus size={17} />
            {isUploading ? "Uploading dataset..." : "Upload Your First Dataset"}
            <input
              className="sr-only"
              type="file"
              accept=".csv,text/csv"
              disabled={isUploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onFileSelected(file);
                event.target.value = "";
              }}
            />
          </label>
        </div>

        {error ? (
          <p className="mx-auto mt-4 max-w-xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        <div className="mx-auto mt-9 grid max-w-xl gap-5 sm:grid-cols-3">
          {nextSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.label} className="flex flex-col items-center gap-2 text-sm text-foreground">
                <Icon size={24} className="text-primary" />
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-xl border border-border bg-surface px-4 py-4 text-left">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <FileUp size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Current support</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Exfolia accepts CSV files for now. XLSX, JSON, and other formats can
                use the same normalized dataset model later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
