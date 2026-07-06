"use client";

import { useState } from "react";
import {
  getDatasetPreview,
  uploadDataset,
  type DatasetPreview,
  type DatasetUploadSummary
} from "@/lib/api";
import { DatasetPreviewPanel } from "./DatasetPreviewPanel";
import { DatasetUploadPanel } from "./DatasetUploadPanel";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { WorkspaceTopbar } from "./WorkspaceTopbar";

export function WorkspaceShell() {
  const [preview, setPreview] = useState<DatasetPreview | null>(null);
  const [uploadSummary, setUploadSummary] = useState<DatasetUploadSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileSelected(file: File) {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please choose a CSV file. Other file types will be added later.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const summary = await uploadDataset(file);

      if (summary.status !== "success" || !summary.dataset_id) {
        throw new Error(summary.message ?? "Dataset upload failed.");
      }

      const datasetPreview = await getDatasetPreview(summary.dataset_id);

      setUploadSummary(summary);
      setPreview(datasetPreview);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Dataset upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full">
        <WorkspaceSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <WorkspaceTopbar />

          <div className="min-h-0 flex-1 overflow-y-auto">
            {preview ? (
              <DatasetPreviewPanel preview={preview} uploadSummary={uploadSummary} />
            ) : (
              <DatasetUploadPanel
                error={error}
                isUploading={isUploading}
                onFileSelected={handleFileSelected}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
