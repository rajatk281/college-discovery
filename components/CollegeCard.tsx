"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, IndianRupee, Heart } from "lucide-react";
import { College } from "@/lib/api";

interface CollegeCardProps {
  college: College;
  isSaved?: boolean;
  showSaveButton?: boolean;
  onToggleSave?: (collegeId: string) => void;
  savingId?: string | null;
}

export default function CollegeCard({
  college,
  isSaved = false,
  showSaveButton = false,
  onToggleSave,
  savingId,
}: CollegeCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[10px] border border-border bg-card transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {college.imageUrl ? (
          <Image
            src={college.imageUrl}
            alt={college.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-surface">
            <span className="text-3xl font-bold text-text-secondary/30">
              {college.name.charAt(0)}
            </span>
          </div>
        )}
        {/* Rating badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-bg/80 px-2.5 py-1 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-semibold text-text-primary">{college.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-base font-semibold text-text-primary line-clamp-1">
          {college.name}
        </h3>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="text-sm">{college.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <IndianRupee className="h-3.5 w-3.5 shrink-0" />
            <span className="text-sm font-medium">₹{college.fees.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            href={`/college/${college.id}`}
            className="flex-1 rounded-[10px] bg-accent px-4 py-2 text-center text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
          >
            View Details
          </Link>
          {showSaveButton && (
            <button
              onClick={() => onToggleSave?.(college.id)}
              disabled={savingId === college.id}
              className={`rounded-[10px] border p-2 transition-all duration-200 ${
                isSaved
                  ? "border-accent/30 bg-accent/10 text-accent hover:bg-accent/20"
                  : "border-border text-text-secondary hover:border-accent hover:text-accent"
              } disabled:opacity-50`}
              aria-label={isSaved ? "Unsave college" : "Save college"}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-accent" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
