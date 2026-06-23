import { Star } from "lucide-react";
import { Review } from "@/lib/api";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-[10px] border border-border bg-card p-4 transition-colors hover:border-border/80">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-text-primary">{review.userName}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < review.rating
                  ? "fill-accent text-accent"
                  : "text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">{review.comment}</p>
      <p className="mt-2 text-xs text-text-secondary/60">{date}</p>
    </div>
  );
}
