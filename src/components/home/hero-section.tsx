"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const popularAnime = [
  {
    id: "solo-leveling",
    title: "Solo Leveling Season 2: Arise from the Shadow",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    rating: "HD",
    episodes: "13/12",
    description:
      "Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows stronger by the day with the supernatural powers he has gained. However, keeping his skills hidden becomes more difficult as dungeon-related incidents pile up around him.",
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    rating: "HD",
    episodes: "1124/1122",
    description:
      "Gold Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world.",
  },
  {
    id: "dragon-ball",
    title: "Dragon Ball Daima",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    rating: "HD",
    episodes: "20/13",
    description:
      "After saving the world from the destructive might of Majin Buu, Gokuu Son and his allies look forward to a well-earned rest. However, unbeknownst to them, their battle was recorded and observed by Gomah, an evil being who assumes the title of King in the Demon Realm.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-black to-zinc-900 py-10 md:py-16">
      <div className="aniwatch-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Featured Content */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-accent text-accent-foreground px-2 py-0.5 text-xs font-semibold rounded">
                #1 SPOTLIGHT
              </span>
              <span className="text-sm text-muted-foreground">TV • 24min • Jan 12, 2025</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{popularAnime[0].title}</h1>
            <p className="text-muted-foreground">{popularAnime[0].description}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center space-x-1">
                <span className="text-accent font-bold">{popularAnime[0].rating}</span>
                <span className="text-xs text-muted-foreground">Quality</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-accent font-bold">{popularAnime[0].episodes}</span>
                <span className="text-xs text-muted-foreground">Episodes</span>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`/anime/${popularAnime[0].id}`}>Watch Now</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/anime/${popularAnime[0].id}`}>Details</Link>
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src={popularAnime[0].image}
              alt={popularAnime[0].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>

        {/* Popular Anime Slider */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Trending</h2>
            <Link href="/trending" className="text-sm text-accent hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularAnime.map((anime) => (
              <Link key={anime.id} href={`/anime/${anime.id}`} className="trending-item">
                <Image
                  src={anime.image}
                  alt={anime.title}
                  fill
                  className="object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <h3 className="text-sm font-medium truncate">{anime.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs bg-accent text-accent-foreground px-1 rounded">
                      {anime.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">EP {anime.episodes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
