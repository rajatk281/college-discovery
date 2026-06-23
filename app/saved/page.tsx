"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { fetchSavedColleges, unsaveCollege, SavedCollege } from "@/lib/api";
import CollegeCard from "@/components/CollegeCard";
import { CollegeGridSkeleton } from "@/components/LoaderSkeleton";
import EmptyState from "@/components/EmptyState";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";

export default function SavedPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [saved, setSaved] = useState<SavedCollege[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchSavedColleges()
      .then((res) => setSaved(res.data))
      .catch(() => toast.error("Failed to load saved colleges"))
      .finally(() => setLoading(false));
  }, [isAuthenticated, router]);

  const handleRemove = async (collegeId: string) => {
    setRemovingId(collegeId);
    try {
      await unsaveCollege(collegeId);
      setSaved((prev) => prev.filter((s) => s.collegeId !== collegeId));
      toast.success("Removed from saved");
    } catch {
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2">
        <Bookmark className="h-7 w-7 text-accent" />
        <div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Saved Colleges
          </h1>
          <p className="text-sm text-text-secondary">
            Your bookmarked colleges for quick access.
          </p>
        </div>
      </div>

      {loading ? (
        <CollegeGridSkeleton count={6} />
      ) : saved.length === 0 ? (
        <EmptyState
          icon="bookmark"
          title="No saved colleges"
          description="Browse colleges and save your favorites to view them here."
          actionLabel="Browse Colleges"
          actionHref="/"
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((item, i) => (
            <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <CollegeCard
                college={item.college}
                showSaveButton
                isSaved
                onToggleSave={handleRemove}
                savingId={removingId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
