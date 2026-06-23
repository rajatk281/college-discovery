import { SearchX, Bookmark, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: "search" | "bookmark" | "error";
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

const icons = {
  search: SearchX,
  bookmark: Bookmark,
  error: AlertTriangle,
};

export default function EmptyState({
  icon = "search",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-7 w-7 text-text-secondary" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mb-4 max-w-sm text-sm text-text-secondary">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="rounded-[10px] bg-accent px-5 py-2 text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
