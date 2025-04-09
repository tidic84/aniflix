"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const animeGenres = [
  { name: "Action", href: "/genre/action" },
  { name: "Adventure", href: "/genre/adventure" },
  { name: "Comedy", href: "/genre/comedy" },
  { name: "Drama", href: "/genre/drama" },
  { name: "Fantasy", href: "/genre/fantasy" },
  { name: "Horror", href: "/genre/horror" },
  { name: "Isekai", href: "/genre/isekai" },
  { name: "Mystery", href: "/genre/mystery" },
  { name: "Romance", href: "/genre/romance" },
  { name: "Sci-Fi", href: "/genre/sci-fi" },
  { name: "Slice of Life", href: "/genre/slice-of-life" },
  { name: "Supernatural", href: "/genre/supernatural" },
];

export default function GenresSection() {
  return (
    <section className="py-10 bg-card">
      <div className="aniwatch-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Genres</h2>
          <Link href="/genres" className="text-sm text-accent hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeGenres.map((genre) => (
            <Button
              key={genre.name}
              variant="outline"
              className="justify-start hover:text-accent h-auto py-2"
              asChild
            >
              <Link href={genre.href}>{genre.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
