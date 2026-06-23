"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export interface Filters {
  location: string;
  minFees: string;
  maxFees: string;
  sort: string;
}

interface FilterBarProps {
  filters: Filters;
  onApply: (filters: Filters) => void;
  onClear: () => void;
}

const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Kanpur",
  "Kharagpur",
  "Roorkee",
  "Trichy",
  "Mangalore",
  "Warangal",
  "Kozhikode",
  "Rourkela",
  "Pilani",
  "Vellore",
  "Manipal",
];

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "fees_asc", label: "Fees: Low → High" },
  { value: "fees_desc", label: "Fees: High → Low" },
  { value: "rating", label: "Rating" },
];

export default function FilterBar({ filters, onApply, onClear }: FilterBarProps) {
  const [local, setLocal] = useState<Filters>(filters);
  const [open, setOpen] = useState(false);

  const hasFilters =
    filters.location || filters.minFees || filters.maxFees || filters.sort;

  const update = (key: keyof Filters, value: string) =>
    setLocal((prev) => ({ ...prev, [key]: value }));

  const handleApply = () => {
    onApply(local);
    setOpen(false);
  };

  const handleClear = () => {
    const empty: Filters = { location: "", minFees: "", maxFees: "", sort: "" };
    setLocal(empty);
    onClear();
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-[10px] border px-4 py-2.5 text-sm font-medium transition-all ${
          hasFilters
            ? "border-accent/30 bg-accent/10 text-accent"
            : "border-border bg-card text-text-secondary hover:border-text-secondary"
        }`}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-bg">
            {[filters.location, filters.minFees, filters.maxFees, filters.sort].filter(Boolean).length}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-[320px] max-w-[calc(100vw-2rem)] animate-slide-down rounded-[10px] border border-border bg-surface p-4 shadow-xl shadow-black/30 sm:w-[400px]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-text-secondary hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Location */}
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">
                Location
              </label>
              <select
                value={local.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Fees Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-text-secondary">
                  Min Fees (₹)
                </label>
                <input
                  type="number"
                  value={local.minFees}
                  onChange={(e) => update("minFees", e.target.value)}
                  placeholder="0"
                  className="w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-secondary">
                  Max Fees (₹)
                </label>
                <input
                  type="number"
                  value={local.maxFees}
                  onChange={(e) => update("maxFees", e.target.value)}
                  placeholder="∞"
                  className="w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">
                Sort By
              </label>
              <select
                value={local.sort}
                onChange={(e) => update("sort", e.target.value)}
                className="w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleApply}
              className="flex-1 rounded-[10px] bg-accent py-2 text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-all hover:border-text-secondary hover:text-text-primary"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
