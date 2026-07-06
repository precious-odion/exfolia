const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type DatasetUploadSummary = {
  status: "success" | "failed";
  dataset_id?: string;
  total_rows_received: number;
  rows_inserted: number;
  rows_skipped: number;
  columns_detected: number;
  inferred_columns: Array<{
    name: string;
    normalized_name: string;
    type: string;
  }>;
  skip_reasons: Record<string, number>;
  message?: string;
};

export type DatasetPreview = {
  dataset: {
    id: string;
    name: string;
    original_filename: string;
    file_size: number;
    row_count: number;
    status: string;
    created_at: string;
    updated_at: string;
  };
  columns: Array<{
    id: string;
    name: string;
    normalized_name: string;
    type: string;
    position: number;
    nullable: boolean;
    unique_count: number;
    sample_values: Array<string | number | boolean | null>;
  }>;
  rows: Array<{
    id: string;
    row_index: number;
    data: Record<string, string | number | boolean | null>;
    created_at: string;
  }>;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
};

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Request failed.");
  }

  return data as T;
}

export async function uploadDataset(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiBaseUrl}/api/datasets/upload`, {
    method: "POST",
    body: formData
  });

  return parseApiResponse<DatasetUploadSummary>(response);
}

export async function getDatasetPreview(datasetId: string, limit = 50, offset = 0) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset)
  });

  const response = await fetch(
    `${apiBaseUrl}/api/datasets/${datasetId}/preview?${params.toString()}`
  );

  return parseApiResponse<DatasetPreview>(response);
}
