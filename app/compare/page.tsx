"use client";

import { useState, useCallback } from "react";
import { fetchColleges, fetchCollegeById, College } from "@/lib/api";
import ComparisonTable from "@/components/ComparisonTable";
import EmptyState from "@/components/EmptyState";
import { Search, X, Plus, GitCompareArrows } from "lucide-react";
import toast from "react-hot-toast";

export default function ComparePage() {
  const [selected, setSelected] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<College[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    setSearching(true);
    try {
      const res = await fetchColleges({ search: query, limit: 5 });
      setSearchResults(res.data);
      setShowDropdown(true);
    } catch {
      toast.error("Search failed");
    } finally {
      setSearching(false);
    }
  }, []);

  const handleSelect = async (college: College) => {
    if (selected.length >= 3) {
      toast.error("You can compare up to 3 colleges");
      return;
    }
    if (selected.some((c) => c.id === college.id)) {
      toast.error("College already selected");
      return;
    }
    // Fetch full details
    try {
      const res = await fetchCollegeById(college.id);
      setSelected((prev) => [...prev, res.data]);
      setSearchQuery("");
      setSearchResults([]);
      setShowDropdown(false);
    } catch {
      toast.error("Failed to load college details");
    }
  };

  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <GitCompareArrows className="h-7 w-7 text-accent" />
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Compare Colleges
          </h1>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          Select up to 3 colleges to compare side by side.
        </p>
      </div>

      {/* Search & Select */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              placeholder="Search for a college to add..."
              className="w-full rounded-[10px] border border-border bg-card py-2.5 pl-10 pr-9 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-accent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowDropdown(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-text-secondary">
            <span className="font-semibold text-accent">{selected.length}</span>/3
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-[10px] border border-border bg-surface shadow-xl shadow-black/30">
            {searching ? (
              <div className="px-4 py-3 text-sm text-text-secondary">Searching...</div>
            ) : searchResults.length === 0 ? (
              <div className="px-4 py-3 text-sm text-text-secondary">No results found</div>
            ) : (
              searchResults.map((c) => {
                const alreadySelected = selected.some((s) => s.id === c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    disabled={alreadySelected}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                      alreadySelected
                        ? "bg-muted/50 text-text-secondary"
                        : "text-text-primary hover:bg-muted"
                    }`}
                  >
                    <div>
                      <span className="font-medium">{c.name}</span>
                      <span className="ml-2 text-text-secondary">· {c.location}</span>
                    </div>
                    {alreadySelected ? (
                      <span className="text-xs text-text-secondary">Added</span>
                    ) : (
                      <Plus className="h-4 w-4 text-accent" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selected.length > 0 ? (
        <div className="animate-fade-in">
          <ComparisonTable colleges={selected} onRemove={handleRemove} />
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No colleges selected"
          description="Search and add colleges above to start comparing."
        />
      )}
    </div>
  );
}
