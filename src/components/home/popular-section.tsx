"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const popularAnime = [
  {
    id: "solo-leveling",
    title: "Solo Leveling Season 2: Arise from the Shadow",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    rating: "HD",
    episodes: "13/12",
    type: "TV",
    score: "9.8",
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    rating: "HD",
    episodes: "1124/1122",
    type: "TV",
    score: "9.5",
  },
  {
    id: "dragon-ball",
    title: "Dragon Ball Daima",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    rating: "HD",
    episodes: "20/13",
    type: "TV",
    score: "9.2",
  },
  {
    id: "blue-box",
    title: "Blue Box",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    rating: "HD",
    episodes: "7/12",
    type: "TV",
    score: "8.9",
  },
];

export default function PopularSection() {
  return (
    <section className="py-10">
      <div className="aniwatch-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Most Popular</h2>
          <Link href="/most-popular" className="text-sm text-accent hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularAnime.map((anime, index) => (
            <Card key={anime.id} className="bg-card border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  <div className="relative h-32 md:w-24 md:h-32 flex-shrink-0">
                    <Image
                      src={anime.image}
                      alt={anime.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    <div className="absolute top-0 left-0 bg-accent text-accent-foreground text-xs font-bold rounded-tl-md rounded-br-md px-2 py-1">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2">{anime.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-secondary px-2 py-0.5 rounded">{anime.type}</span>
                      <span className="bg-secondary px-2 py-0.5 rounded">EP {anime.episodes}</span>
                      <span className="bg-accent/80 text-accent-foreground px-2 py-0.5 rounded">
                        Score: {anime.score}
                      </span>
                    </div>
                    <div className="pt-2">
                      <Link
                        href={`/anime/${anime.id}`}
                        className="inline-flex items-center text-xs bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-accent/90 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1 h-3 w-3"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Watch Now
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
