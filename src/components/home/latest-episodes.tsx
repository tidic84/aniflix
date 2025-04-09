"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const latestEpisodes = [
  {
    id: "zenshu",
    title: "Zenshu",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    episode: "12",
    rating: "HD",
    type: "TV",
  },
  {
    id: "solo-leveling",
    title: "The 100 Girlfriends Who Really, Really, Really, Really, Really Love You Season 2",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    episode: "11",
    rating: "HD",
    type: "TV",
  },
  {
    id: "one-piece",
    title: "Sword of the Demon Hunter: Kijin Gentosho",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    episode: "12",
    rating: "HD",
    type: "TV",
  },
  {
    id: "dragon-ball",
    title: "Blue Box",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    episode: "7",
    rating: "HD",
    type: "TV",
  },
  {
    id: "mashle-magic-and-muscles",
    title: "Mashle: Magic and Muscles Season 2",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    episode: "6",
    rating: "HD",
    type: "TV",
  },
  {
    id: "the-elusive-samurai",
    title: "The Elusive Samurai",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    episode: "12",
    rating: "HD",
    type: "TV",
  },
];

export default function LatestEpisodes() {
  return (
    <section className="py-10">
      <div className="aniwatch-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Episodes</h2>
          <Link href="/latest" className="text-sm text-accent hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {latestEpisodes.map((anime) => (
            <Link key={anime.id} href={`/anime/${anime.id}`}>
              <Card className="bg-card border-none overflow-hidden anime-card">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={anime.image}
                      alt={anime.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded">
                      {anime.rating}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium bg-secondary px-1.5 py-0.5 rounded">
                          {anime.type}
                        </span>
                        <span className="text-xs bg-accent/80 text-accent-foreground px-1.5 py-0.5 rounded">
                          EP {anime.episode}
                        </span>
                      </div>
                    </div>
                    <div className="anime-card-overlay">
                      <div className="flex flex-col items-center">
                        <div className="bg-accent text-accent-foreground rounded-full p-2 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <span className="text-xs">Watch Now</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm line-clamp-2">{anime.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
