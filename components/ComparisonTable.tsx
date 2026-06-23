"use client";

import { Star, X, MapPin, IndianRupee, TrendingUp } from "lucide-react";
import { College } from "@/lib/api";

interface ComparisonTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
}

export default function ComparisonTable({ colleges, onRemove }: ComparisonTableProps) {
  const rows: { label: string; icon: React.ReactNode; render: (c: College) => React.ReactNode }[] = [
    {
      label: "Location",
      icon: <MapPin className="h-4 w-4" />,
      render: (c) => c.location,
    },
    {
      label: "Fees",
      icon: <IndianRupee className="h-4 w-4" />,
      render: (c) => `₹${c.fees.toLocaleString("en-IN")}`,
    },
    {
      label: "Rating",
      icon: <Star className="h-4 w-4" />,
      render: (c) => (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {c.rating}
        </span>
      ),
    },
    {
      label: "Placements",
      icon: <TrendingUp className="h-4 w-4" />,
      render: (c) => c.placements,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-[10px] border border-border">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Attribute
            </th>
            {colleges.map((c) => (
              <th key={c.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-text-primary">{c.name}</span>
                  <button
                    onClick={() => onRemove(c.id)}
                    className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-muted hover:text-danger"
                    aria-label={`Remove ${c.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-border last:border-0 ${
                i % 2 === 0 ? "bg-card" : "bg-surface"
              }`}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                  {row.icon}
                  {row.label}
                </div>
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="px-4 py-3 text-sm text-text-primary">
                  {row.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
