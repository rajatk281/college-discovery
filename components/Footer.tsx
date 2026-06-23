import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-accent" />
          <span className="text-sm text-text-secondary">
            © {new Date().getFullYear()} CollegeDiscovery
          </span>
        </div>
        <p className="text-xs text-text-secondary/60">
          Built with Next.js & Prisma
        </p>
      </div>
    </footer>
  );
}
