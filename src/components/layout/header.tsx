"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiMenu } from "react-icons/fi";

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "TV Series", href: "/tv-series" },
  { name: "Most Popular", href: "/most-popular" },
  { name: "Top Airing", href: "/top-airing" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // window.location.href = `/search?keyword=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className="bg-background sticky top-0 z-50 border-b border-border">
      <div className="aniwatch-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-10">
              <img
                src="https://ext.same-assets.com/2972811077/3736915175.png"
                alt="AniWatch"
                className="object-contain h-full w-full"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="nav-link text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-72">
            <Input
              type="search"
              placeholder="Search anime..."
              className="search-bar pl-10 pr-4 py-2 w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              aria-label="Search"
            >
              <FiSearch />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <FiMenu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="nav-link text-sm font-medium px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 px-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search anime..."
                  className="search-bar pl-10 pr-4 py-2 w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  aria-label="Search"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
