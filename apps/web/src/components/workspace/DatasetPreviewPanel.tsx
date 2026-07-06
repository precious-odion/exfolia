"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Check,
  ChevronDown,
  Database,
  ListChecks,
  MoreVertical,
  RefreshCcw,
  Rows3,
  Sparkles,
  TableProperties,
  Target,
  Zap
} from "lucide-react";
import type { DatasetPreview, DatasetUploadSummary } from "@/lib/api";

type DatasetPreviewPanelProps = {
  preview: DatasetPreview;
  uploadSummary: DatasetUploadSummary | null;
};

type CellValue = string | number | boolean | null;
type DatasetColumn = DatasetPreview["columns"][number];
type DatasetRow = DatasetPreview["rows"][number];

type ChartPoint = {
  label: string;
  value: number;
};

type ChartSuggestion = {
  id: string;
  title: string;
  subtitle: string;
  footnote: string;
  question: string;
  importance: number;
  points: ChartPoint[];
};

const chartLimit = 8;
const maxSelectedCharts = 3;

function formatCellValue(value: CellValue) {
  if (value === null) return "Empty";
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

function isEmptyCell(value: CellValue) {
  return value === null || value === "";
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "0";
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  if (Number.isInteger(value)) return value.toLocaleString();
  return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function formatPercentage(value: number) {
  return `${value.toFixed(value >= 99 ? 2 : 1)}%`;
}

function humanizeFieldName(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getColumnGroups(columns: DatasetColumn[]) {
  return {
    numeric: columns.filter((column) => column.type === "number"),
    category: columns.filter((column) => column.type === "category"),
    date: columns.filter((column) => column.type === "date"),
    boolean: columns.filter((column) => column.type === "boolean"),
    text: columns.filter((column) => column.type === "text")
  };
}

function getNumericColumnScore(column: DatasetColumn) {
  const name = column.normalized_name.toLowerCase();
  let score = 50;

  if (/(revenue|income|amount|sales|price|cost|profit|total|value|balance)/.test(name)) {
    score += 45;
  }

  if (/(age|year|id|index|number|count)/.test(name)) {
    score -= 25;
  }

  return score;
}

function getCategoryColumnScore(column: DatasetColumn) {
  const name = column.normalized_name.toLowerCase();
  let score = 50;

  if (/(country|region|category|segment|type|status|gender|department|channel)/.test(name)) {
    score += 35;
  }

  if (/(id|name|email|phone|address)/.test(name)) {
    score -= 30;
  }

  return score;
}

function getMissingCellCount(rows: DatasetRow[], columns: DatasetColumn[]) {
  return rows.reduce((total, row) => {
    return (
      total +
      columns.reduce((rowTotal, column) => {
        return rowTotal + (isEmptyCell(row.data[column.normalized_name]) ? 1 : 0);
      }, 0)
    );
  }, 0);
}

function getDuplicateSampleRows(rows: DatasetRow[]) {
  const seenRows = new Set<string>();
  let duplicates = 0;

  rows.forEach((row) => {
    const stableKey = JSON.stringify(
      Object.entries(row.data).sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    );

    if (seenRows.has(stableKey)) {
      duplicates += 1;
      return;
    }

    seenRows.add(stableKey);
  });

  return duplicates;
}

function getCategoryTotals(
  rows: DatasetRow[],
  categoryColumn: DatasetColumn,
  numericColumn?: DatasetColumn
) {
  const totals = new Map<string, number>();

  rows.forEach((row) => {
    const rawLabel = row.data[categoryColumn.normalized_name];
    const label = rawLabel === null || rawLabel === "" ? "Empty" : String(rawLabel);
    const rawValue = numericColumn ? row.data[numericColumn.normalized_name] : 1;
    const value = typeof rawValue === "number" && Number.isFinite(rawValue) ? rawValue : 0;

    totals.set(label, (totals.get(label) ?? 0) + value);
  });

  return Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => right.value - left.value)
    .slice(0, chartLimit);
}

function getDateTotals(rows: DatasetRow[], dateColumn: DatasetColumn, numericColumn?: DatasetColumn) {
  const totals = new Map<string, number>();

  rows.forEach((row) => {
    const rawDate = row.data[dateColumn.normalized_name];
    if (typeof rawDate !== "string" || rawDate.length < 7) return;

    const label = rawDate.slice(0, 7);
    const rawValue = numericColumn ? row.data[numericColumn.normalized_name] : 1;
    const value = typeof rawValue === "number" && Number.isFinite(rawValue) ? rawValue : 1;

    totals.set(label, (totals.get(label) ?? 0) + value);
  });

  return Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => left.label.localeCompare(right.label))
    .slice(0, chartLimit);
}

function buildChartSuggestions(preview: DatasetPreview): ChartSuggestion[] {
  const groups = getColumnGroups(preview.columns);
  const charts: ChartSuggestion[] = [];

  groups.numeric.forEach((numericColumn) => {
    groups.category.forEach((categoryColumn) => {
      const points = getCategoryTotals(preview.rows, categoryColumn, numericColumn);
      if (points.length < 2) return;

      const importance = Math.max(
        35,
        Math.min(98, getNumericColumnScore(numericColumn) + getCategoryColumnScore(categoryColumn) - 35)
      );

      charts.push({
        id: `${numericColumn.id}-${categoryColumn.id}-sum`,
        title: `${humanizeFieldName(numericColumn.name)} by ${humanizeFieldName(categoryColumn.name)}`,
        subtitle: `${preview.rows.length} preview rows - ${points.length} categories`,
        footnote: "Grouped sum from preview rows",
        question: `Which ${humanizeFieldName(categoryColumn.name)} drives the most ${humanizeFieldName(
          numericColumn.name
        )}? (SUM)`,
        importance,
        points
      });
    });
  });

  groups.date.forEach((dateColumn) => {
    groups.numeric.forEach((numericColumn) => {
      const points = getDateTotals(preview.rows, dateColumn, numericColumn);
      if (points.length < 2) return;

      charts.push({
        id: `${numericColumn.id}-${dateColumn.id}-trend`,
        title: `${humanizeFieldName(numericColumn.name)} over time`,
        subtitle: `${points.length} time buckets`,
        footnote: "Timeline preview from uploaded sample",
        question: `How is ${humanizeFieldName(numericColumn.name)} trending over time? (SUM)`,
        importance: Math.max(45, Math.min(92, getNumericColumnScore(numericColumn) + 5)),
        points
      });
    });
  });

  groups.category.forEach((categoryColumn) => {
    const points = getCategoryTotals(preview.rows, categoryColumn);
    if (points.length < 2) return;

    charts.push({
      id: `${categoryColumn.id}-count`,
      title: `Records by ${humanizeFieldName(categoryColumn.name)}`,
      subtitle: `${preview.rows.length} preview rows - ${points.length} categories`,
      footnote: "Grouped record count from preview rows",
      question: `How are records distributed by ${humanizeFieldName(categoryColumn.name)}? (COUNT)`,
      importance: Math.max(40, Math.min(88, getCategoryColumnScore(categoryColumn))),
      points
    });
  });

  return charts
    .sort((left, right) => right.importance - left.importance)
    .slice(0, 12);
}

function InsightList({
  items,
  icon: Icon
}: {
  items: string[];
  icon: typeof CheckCircle2;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 text-sm leading-6 text-foreground">
          <Icon size={16} className="mt-1 shrink-0 text-primary" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Rows3;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <Icon size={18} className="text-muted" />
      </div>
      <p className="mt-7 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-sm leading-5 text-muted">{description}</p>
    </article>
  );
}

function RelationshipSelector({
  charts,
  selectedChartIds,
  draftSelectedChartIds,
  isOpen,
  onOpen,
  onClose,
  onToggleDraftChart,
  onApply
}: {
  charts: ChartSuggestion[];
  selectedChartIds: string[];
  draftSelectedChartIds: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggleDraftChart: (chartId: string) => void;
  onApply: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleSelectedCount = isOpen ? draftSelectedChartIds.length : selectedChartIds.length;

  useEffect(() => {
    if (!isOpen) return;

    function handleDocumentMouseDown(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (containerRef.current?.contains(target)) return;

      onClose();
    }

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <button
        type="button"
        className="flex h-11 w-full items-center justify-between rounded-lg border border-border bg-background px-4 text-left text-sm font-semibold text-foreground"
        aria-expanded={isOpen}
        onClick={isOpen ? onClose : onOpen}
      >
        <span>
          {visibleSelectedCount} selected (max {maxSelectedCharts})
        </span>
        <ChevronDown size={17} className="text-muted" />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-12 z-20 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
            Select relationships for graphs
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {charts.map((chart) => {
              const isSelected = draftSelectedChartIds.includes(chart.id);

              return (
                <button
                  key={chart.id}
                  type="button"
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left text-sm text-foreground hover:bg-primary-soft"
                  onClick={() => onToggleDraftChart(chart.id)}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    {isSelected ? <Check size={16} /> : null}
                  </span>
                  <span>
                    <span>{chart.question}</span>
                    <span className="font-semibold"> - {chart.importance}% importance</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-border bg-surface p-2">
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white"
              onClick={onApply}
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BarChartCard({ chart }: { chart: ChartSuggestion }) {
  const maxValue = Math.max(...chart.points.map((point) => point.value), 1);
  const yAxisLabels = [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{chart.title}</h3>
          <p className="mt-1 text-sm text-muted">{chart.subtitle}</p>
          <p className="mt-2 text-xs italic text-muted">{chart.footnote}</p>
        </div>
        <MoreVertical size={18} className="shrink-0 text-muted" />
      </div>

      <div className="mt-8 grid grid-cols-[3rem_1fr] gap-3">
        <div className="flex h-72 flex-col justify-between text-right text-xs text-muted">
          {yAxisLabels.map((label) => (
            <span key={label}>{formatNumber(label)}</span>
          ))}
        </div>

        <div className="min-w-0">
          <div className="relative h-72 border-b border-border">
            <div className="absolute inset-0 flex flex-col justify-between">
              {yAxisLabels.map((label) => (
                <span key={label} className="border-t border-border/70" />
              ))}
            </div>

            <div
              className="relative z-10 grid h-full items-end gap-3"
              style={{ gridTemplateColumns: `repeat(${chart.points.length}, minmax(2rem, 1fr))` }}
            >
              {chart.points.map((point) => {
                const height = Math.max((point.value / maxValue) * 100, 2);

                return (
                  <div key={point.label} className="flex h-full min-w-0 flex-col items-center justify-end gap-2">
                    <span className="text-xs font-medium text-muted">{formatNumber(point.value)}</span>
                    <div className="flex min-h-0 w-full flex-1 items-end justify-center">
                      <div
                        className="w-full max-w-14 rounded-t-md bg-primary"
                        style={{ height: `${height}%` }}
                        aria-label={`${point.label}: ${formatNumber(point.value)}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="mt-3 grid gap-3"
            style={{ gridTemplateColumns: `repeat(${chart.points.length}, minmax(2rem, 1fr))` }}
          >
            {chart.points.map((point) => (
              <div
                key={point.label}
                className="-rotate-45 truncate text-left text-xs text-muted"
                title={point.label}
              >
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function DatasetPreviewPanel({ preview }: DatasetPreviewPanelProps) {
  const visibleColumns = preview.columns.slice(0, 6);
  const groups = getColumnGroups(preview.columns);
  const totalSampleCells = Math.max(preview.rows.length * preview.columns.length, 1);
  const missingSampleCells = getMissingCellCount(preview.rows, preview.columns);
  const completeness = Math.max(0, 100 - (missingSampleCells / totalSampleCells) * 100);
  const duplicateSampleRows = getDuplicateSampleRows(preview.rows);
  const chartSuggestions = useMemo(() => buildChartSuggestions(preview), [preview]);
  const [isRelationshipSelectorOpen, setIsRelationshipSelectorOpen] = useState(false);
  const [selectedChartIds, setSelectedChartIds] = useState(() =>
    chartSuggestions.slice(0, maxSelectedCharts).map((chart) => chart.id)
  );
  const [draftSelectedChartIds, setDraftSelectedChartIds] = useState(selectedChartIds);
  const selectedCharts = chartSuggestions.filter((chart) => selectedChartIds.includes(chart.id));
  const firstCategoryColumn = groups.category[0];
  const firstNumericColumn = groups.numeric[0];
  const topCategoryPoint = firstCategoryColumn
    ? getCategoryTotals(preview.rows, firstCategoryColumn)[0]
    : undefined;

  const insightItems = [
    `${preview.columns.length} columns were detected and typed for query building.`,
    `${formatPercentage(completeness)} sample completeness across ${preview.rows.length} preview rows.`,
    firstNumericColumn
      ? `${humanizeFieldName(firstNumericColumn.name)} can power KPI and chart analysis.`
      : "No numeric field was found yet, so charting will focus on counts.",
    topCategoryPoint && firstCategoryColumn
      ? `${topCategoryPoint.label} leads ${humanizeFieldName(firstCategoryColumn.name)} in the preview sample.`
      : "Category fields are ready for distribution views."
  ].filter(Boolean) as string[];

  const riskItems = [
    missingSampleCells > 0
      ? `${missingSampleCells} empty cells were found in the preview sample.`
      : "No empty cells were found in the preview sample.",
    duplicateSampleRows > 0
      ? `${duplicateSampleRows} repeated sample rows may need review.`
      : "No duplicate preview rows were detected.",
    preview.rows.length < preview.dataset.row_count
      ? "Current charts use preview rows until full summary aggregation is added."
      : "All stored rows are represented in this preview."
  ];

  const opportunityItems = [
    groups.category.length > 0 && groups.numeric.length > 0
      ? "Create category-by-number charts from the inferred fields."
      : "Add numeric data to unlock richer KPI cards.",
    groups.date.length > 0
      ? "Use date fields for trend analysis and timeline charts."
      : "Date fields were not detected, so timeline charts are limited.",
    "Next step: build visual filters from these inferred columns."
  ];

  function handleOpenRelationshipSelector() {
    setDraftSelectedChartIds(selectedChartIds);
    setIsRelationshipSelectorOpen(true);
  }

  function handleToggleDraftChart(chartId: string) {
    setDraftSelectedChartIds((currentIds) => {
      if (currentIds.includes(chartId)) {
        return currentIds.filter((id) => id !== chartId);
      }

      if (currentIds.length >= maxSelectedCharts) {
        return [...currentIds.slice(1), chartId];
      }

      return [...currentIds, chartId];
    });
  }

  function handleApplyRelationships() {
    setSelectedChartIds(draftSelectedChartIds);
    setIsRelationshipSelectorOpen(false);
  }

  return (
    <section className="px-5 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              Instant analytics from your uploaded CSV
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Exfolia has stored the dataset, inferred the schema, and generated a first
              dashboard from the available preview rows.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-3">
              <Database size={18} className="shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {preview.dataset.original_filename}
                </p>
                <p className="text-xs text-muted">{preview.dataset.row_count} rows stored</p>
              </div>
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {preview.dataset.status}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={CheckCircle2}
            label="Completeness"
            value={formatPercentage(completeness)}
            description="Non-empty data coverage across the preview sample."
          />
          <MetricCard
            icon={AlertTriangle}
            label="Missing Cells"
            value={formatNumber(missingSampleCells)}
            description={`Empty cells found across ${preview.rows.length} preview rows.`}
          />
          <MetricCard
            icon={Rows3}
            label="Rows Analyzed"
            value={formatNumber(preview.dataset.row_count)}
            description="Stored rows available for filtering and summaries."
          />
          <MetricCard
            icon={TableProperties}
            label="Analysis Fields"
            value={formatNumber(preview.columns.length)}
            description={`${groups.numeric.length} numeric, ${groups.category.length} categorical, ${groups.date.length} date.`}
          />
        </div>

        <section className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="border-b border-border bg-background p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                  <Target size={20} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Relevant KPIs</h2>
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                      Auto generated
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Key quality and structure indicators for this dataset.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground"
              >
                <RefreshCcw size={15} />
                Re-run summary
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-3">
            <article className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold text-muted">Data Completeness</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{formatPercentage(completeness)}</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Percentage of non-empty cells in the preview sample.
              </p>
            </article>
            <article className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold text-muted">Duplicate Rows</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {formatNumber(duplicateSampleRows)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Potential repeated records found in preview rows.
              </p>
            </article>
            <article className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold text-muted">Rows Stored</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {formatNumber(preview.dataset.row_count)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Dataset rows available for future queries and charts.
              </p>
            </article>
          </div>
        </section>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Sparkles size={17} />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Top Insights</h2>
            </div>
            <InsightList icon={CheckCircle2} items={insightItems} />
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <AlertTriangle size={17} />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Key Risks</h2>
            </div>
            <InsightList icon={AlertTriangle} items={riskItems} />
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Zap size={17} />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Opportunities</h2>
            </div>
            <InsightList icon={Zap} items={opportunityItems} />
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-border bg-surface p-5">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Graph relationships</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">
                Top relationships are selected by default. Choose different mappings to customize the charts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RelationshipSelector
                charts={chartSuggestions}
                selectedChartIds={selectedChartIds}
                draftSelectedChartIds={draftSelectedChartIds}
                isOpen={isRelationshipSelectorOpen}
                onOpen={handleOpenRelationshipSelector}
                onClose={() => setIsRelationshipSelectorOpen(false)}
                onToggleDraftChart={handleToggleDraftChart}
                onApply={handleApplyRelationships}
              />

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground"
              >
                <RefreshCcw size={15} />
                Regenerate
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            {selectedCharts.length > 0 ? (
              selectedCharts.map((chart) => <BarChartCard key={chart.id} chart={chart} />)
            ) : (
              <div className="rounded-xl border border-border bg-background p-5 text-sm leading-6 text-muted">
                Upload a dataset with category, date, or numeric fields to unlock automatic chart previews.
              </div>
            )}
          </div>
        </section>

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">Inferred columns</h2>
                <p className="mt-1 text-sm text-muted">Types are inferred from the uploaded CSV sample.</p>
              </div>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                {preview.columns.length} fields
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {preview.columns.map((column) => (
                <div
                  key={column.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{column.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {column.unique_count} unique values {column.nullable ? "- nullable" : ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    {column.type}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">Sample rows</h2>
                <p className="mt-1 text-sm text-muted">
                  Showing {preview.rows.length} of {preview.pagination.total} stored rows.
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    {visibleColumns.map((column) => (
                      <th
                        key={column.id}
                        className="border-b border-border bg-background px-3 py-3 font-semibold text-foreground"
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row) => (
                    <tr key={row.id}>
                      {visibleColumns.map((column) => (
                        <td key={column.id} className="border-b border-border px-3 py-3 text-muted">
                          {formatCellValue(row.data[column.normalized_name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-border bg-surface p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <ListChecks size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Quick actions</h2>
              <p className="mt-1 text-sm text-muted">Continue from this upload into the next Exfolia stages.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <button
              type="button"
              className="rounded-lg border border-border bg-background px-4 py-4 text-sm font-semibold text-foreground"
            >
              Build visual query
            </button>
            <button
              type="button"
              className="rounded-lg border border-border bg-background px-4 py-4 text-sm font-semibold text-foreground"
            >
              Generate report
            </button>
            <button
              type="button"
              className="rounded-lg border border-border bg-background px-4 py-4 text-sm font-semibold text-foreground"
            >
              Ask Exfolia
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
