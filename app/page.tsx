"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchColleges, saveCollege, unsaveCollege, fetchSavedColleges, College } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import CollegeCard from "@/components/CollegeCard";
import SearchInput from "@/components/SearchInput";
import FilterBar, { Filters } from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { CollegeGridSkeleton } from "@/components/LoaderSkeleton";
import EmptyState from "@/components/EmptyState";
import toast from "react-hot-toast";

const EMPTY_FILTERS: Filters = { location: "", minFees: "", maxFees: "", sort: "" };

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchColleges({
        search: search || undefined,
        location: filters.location || undefined,
        minFees: filters.minFees || undefined,
        maxFees: filters.maxFees || undefined,
        sort: filters.sort || undefined,
        page,
        limit: 9,
      });
      setColleges(res.data);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Failed to load colleges");
    } finally {
      setLoading(false);
    }
  }, [search, filters, page]);

  // Load saved IDs if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setSavedIds(new Set());
      return;
    }
    fetchSavedColleges()
      .then((res) => setSavedIds(new Set(res.data.map((s) => s.collegeId))))
      .catch(() => {});
  }, [isAuthenticated]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleApplyFilters = (f: Filters) => {
    setFilters(f);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleToggleSave = async (collegeId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to save colleges");
      return;
    }
    setSavingId(collegeId);
    try {
      if (savedIds.has(collegeId)) {
        await unsaveCollege(collegeId);
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(collegeId);
          return next;
        });
        toast.success("College removed from saved");
      } else {
        await saveCollege(collegeId);
        setSavedIds((prev) => new Set(prev).add(collegeId));
        toast.success("College saved!");
      }
    } catch {
      toast.error("Failed to update saved status");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Discover Your Perfect <span className="text-accent">College</span>
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Browse, compare, and find the right college for your future.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={search} onChange={handleSearch} />
        <FilterBar
          filters={filters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      {/* Results */}
      {loading ? (
        <CollegeGridSkeleton count={9} />
      ) : colleges.length === 0 ? (
        <EmptyState
          icon="search"
          title="No colleges found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college, i) => (
              <div key={college.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <CollegeCard
                  college={college}
                  showSaveButton={isAuthenticated}
                  isSaved={savedIds.has(college.id)}
                  onToggleSave={handleToggleSave}
                  savingId={savingId}
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
