"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  fetchCollegeById,
  addReview,
  saveCollege,
  unsaveCollege,
  fetchSavedColleges,
  College,
} from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import CourseCard from "@/components/CourseCard";
import ReviewCard from "@/components/ReviewCard";
import { CollegeDetailSkeleton } from "@/components/LoaderSkeleton";
import {
  ArrowLeft,
  Star,
  MapPin,
  IndianRupee,
  TrendingUp,
  BookOpen,
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Review form
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCollegeById(id)
      .then((res) => setCollege(res.data))
      .catch(() => toast.error("Failed to load college"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || !id) return;
    fetchSavedColleges()
      .then((res) => {
        setIsSaved(res.data.some((s) => s.collegeId === id));
      })
      .catch(() => {});
  }, [isAuthenticated, id]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to save colleges");
      return;
    }
    setSaving(true);
    try {
      if (isSaved) {
        await unsaveCollege(id);
        setIsSaved(false);
        toast.success("Removed from saved");
      } else {
        await saveCollege(id);
        setIsSaved(true);
        toast.success("College saved!");
      }
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    setSubmitting(true);
    try {
      const res = await addReview(id, { comment, rating });
      // Add to local state
      setCollege((prev) =>
        prev
          ? { ...prev, reviews: [...(prev.reviews || []), res.data] }
          : prev
      );
      setComment("");
      setRating(5);
      toast.success("Review added!");
    } catch {
      toast.error("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <CollegeDetailSkeleton />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-text-primary">College not found</h2>
        <Link href="/" className="mt-4 inline-block text-sm text-accent hover:underline">
          ← Back to colleges
        </Link>
      </div>
    );
  }

  const infoCards = [
    { label: "Fees", value: `₹${college.fees.toLocaleString("en-IN")}`, icon: IndianRupee },
    { label: "Rating", value: `${college.rating} / 5`, icon: Star },
    { label: "Placements", value: college.placements, icon: TrendingUp },
    { label: "Courses", value: `${college.courses?.length || 0} available`, icon: BookOpen },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to colleges
      </Link>

      {/* Hero */}
      <div className="relative mb-6 h-52 overflow-hidden rounded-[10px] sm:h-72">
        {college.imageUrl ? (
          <Image
            src={college.imageUrl}
            alt={college.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-surface">
            <span className="text-5xl font-bold text-text-secondary/20">
              {college.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{college.name}</h1>
          <div className="mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-text-secondary">
              <MapPin className="h-4 w-4" />
              {college.location}
            </span>
            <span className="flex items-center gap-1 text-sm text-text-secondary">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {college.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Save button */}
      {isAuthenticated && (
        <button
          onClick={handleToggleSave}
          disabled={saving}
          className={`mb-6 flex items-center gap-2 rounded-[10px] border px-4 py-2 text-sm font-medium transition-all ${
            isSaved
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-border text-text-secondary hover:border-accent hover:text-accent"
          } disabled:opacity-50`}
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-accent" : ""}`} />
          {isSaved ? "Saved" : "Save College"}
        </button>
      )}

      {/* Overview */}
      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold text-text-primary">Overview</h2>
        <p className="text-sm leading-relaxed text-text-secondary">{college.overview}</p>
      </div>

      {/* Info Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {infoCards.map((card) => (
          <div
            key={card.label}
            className="rounded-[10px] border border-border bg-card p-4 text-center"
          >
            <card.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
            <p className="text-xs font-medium text-text-secondary">{card.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-text-primary">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Courses */}
      {college.courses && college.courses.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-text-primary">Courses Offered</h2>
          <div className="flex flex-col gap-3">
            {college.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">
          Reviews ({college.reviews?.length || 0})
        </h2>

        {/* Add Review Form */}
        {isAuthenticated && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-4 rounded-[10px] border border-border bg-card p-4"
          >
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Write a Review</h3>
            <div className="mb-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-5 w-5 ${
                      i < rating ? "fill-accent text-accent" : "text-muted"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs text-text-secondary">{rating}/5</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
              className="mb-3 w-full resize-none rounded-[10px] border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-[10px] bg-accent px-5 py-2 text-sm font-semibold text-bg transition-all hover:bg-accent-hover disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {college.reviews && college.reviews.length > 0 ? (
          <div className="flex flex-col gap-3">
            {college.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">No reviews yet. Be the first to share your experience!</p>
        )}
      </div>
    </div>
  );
}
