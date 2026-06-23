"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Menu, X, GraduationCap, Bookmark, GitCompareArrows, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/compare", label: "Compare", icon: GitCompareArrows },
    ...(isAuthenticated
      ? [{ href: "/saved", label: "Saved", icon: Bookmark }]
      : []),
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <GraduationCap className="h-7 w-7 text-accent transition-transform group-hover:scale-110" />
          <span className="text-lg font-semibold text-text-primary">
            College<span className="text-accent">Discovery</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200
                ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-muted hover:text-text-primary"
                }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-text-secondary">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-text-secondary transition-all hover:border-accent hover:text-accent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-muted md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slide-down border-t border-border bg-surface md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                  ${
                    isActive(link.href)
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-muted hover:text-text-primary"
                  }`}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {isAuthenticated ? (
              <>
                <span className="px-3 py-1 text-xs text-text-secondary">{user?.email}</span>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-muted hover:text-accent"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
