import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoPlayerWrapper from "@/components/video/video-wrapper";

// This would typically come from a database, but for our demo we'll use static data
import { animeData } from "@/lib/anime-data";

// Sample video sources (these are examples and not real streaming sources)
// In a real app, these would be populated from a backend API
const getVideoSources = (animeId: string, episodeNumber: number) => {
  // This is just a mock function - in a real app, you would fetch the actual video sources from a backend
  return [
    {
      name: "Server 1 (Stape)",
      type: "iframe" as const,
      url: "https://example.com/embed/stape/anime",
    },
    {
      name: "Server 2 (VidHub)",
      type: "iframe" as const,
      url: "https://example.com/embed/vidhub/anime",
    },
    {
      name: "Server 3 (AnimeCloud)",
      type: "iframe" as const,
      url: "https://example.com/embed/animecloud/anime",
    },
    {
      name: "Server 4 (StreamFast)",
      type: "iframe" as const,
      url: "https://example.com/embed/streamfast/anime",
    },
  ];
};

// Required for static site generation with dynamic routes
export function generateStaticParams() {
  const params: { id: string; episode: string }[] = [];

  // Generate params for each anime and its episodes
  for (const animeId of Object.keys(animeData)) {
    const anime = animeData[animeId as keyof typeof animeData];
    if (anime) {
      for (let i = 1; i <= anime.currentEpisode; i++) {
        params.push({
          id: animeId,
          episode: i.toString(),
        });
      }
    }
  }

  return params;
}

// Updated type for page props to fix the build error
type WatchPageProps = {
  params: {
    id: string;
    episode: string;
  };
};

export default function WatchPage({
  params,
}: WatchPageProps) {
  // Get the anime data based on ID
  const anime = animeData[params.id as keyof typeof animeData] || null;
  if (!anime) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow py-20">
          <div className="aniwatch-container">
            <h1 className="text-3xl font-bold text-center">Anime Not Found</h1>
            <p className="text-center mt-4">
              The anime you are looking for does not exist or has been removed.
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Convert episode parameter to number and validate
  const episodeNumber = Number.parseInt(params.episode, 10);
  if (
    Number.isNaN(episodeNumber) ||
    episodeNumber < 1 ||
    episodeNumber > anime.episodes
  ) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow py-20">
          <div className="aniwatch-container">
            <h1 className="text-3xl font-bold text-center">
              Episode Not Found
            </h1>
            <p className="text-center mt-4">
              The episode you are looking for does not exist or has been removed.
            </p>
            <div className="flex justify-center mt-8">
              <Link href={`/anime/${anime.id}`}>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  View All Episodes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Find the episode data
  const episode = anime.episodeList.find(
    (ep) => ep.number === episodeNumber
  ) || {
    number: episodeNumber,
    title: `Episode ${episodeNumber}`,
    thumbnail: anime.image,
    date: "Unknown date",
    duration: anime.duration,
  };

  // Get previous and next episode numbers
  const prevEpisode = episodeNumber > 1 ? episodeNumber - 1 : null;
  const nextEpisode =
    episodeNumber < anime.currentEpisode ? episodeNumber + 1 : null;

  // Get video sources for this episode
  const videoSources = getVideoSources(anime.id, episodeNumber);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-background">
        {/* Video Player Section */}
        <section className="bg-black">
          <div className="w-full mx-auto max-w-[1280px]">
            <VideoPlayerWrapper
              sources={videoSources}
              title={anime.title}
              episode={episodeNumber}
            />
          </div>
        </section>

        {/* Episode Info Section */}
        <section className="py-4 border-b border-border">
          <div className="aniwatch-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold">{anime.title}</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {episode.title} • {episode.duration} • {episode.date}
                </p>
              </div>
              <div className="flex gap-2">
                {prevEpisode && (
                  <Link href={`/watch/${anime.id}/${prevEpisode}`}>
                    <Button variant="outline" size="sm">
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
                        className="mr-1 h-4 w-4"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Previous
                    </Button>
                  </Link>
                )}
                <Link href={`/anime/${anime.id}`}>
                  <Button variant="outline" size="sm">
                    All Episodes
                  </Button>
                </Link>
                {nextEpisode && (
                  <Link href={`/watch/${anime.id}/${nextEpisode}`}>
                    <Button variant="outline" size="sm">
                      Next
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
                        className="ml-1 h-4 w-4"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Download Options */}
        <section className="py-6">
          <div className="aniwatch-container">
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Download</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button variant="outline" size="sm">
                  1080p (HD)
                </Button>
                <Button variant="outline" size="sm">
                  720p
                </Button>
                <Button variant="outline" size="sm">
                  480p
                </Button>
                <Button variant="outline" size="sm">
                  360p
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Episode List Section */}
        <section className="py-6 bg-card">
          <div className="aniwatch-container">
            <h2 className="text-lg font-bold mb-4">Episodes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {anime.episodeList.map((ep) => (
                <Link
                  key={ep.number}
                  href={`/watch/${anime.id}/${ep.number}`}
                  className={ep.number === episodeNumber ? "pointer-events-none" : ""}
                >
                  <Card
                    className={`${
                      ep.number === episodeNumber
                        ? "border-2 border-accent"
                        : "border-none"
                    } bg-card overflow-hidden`}
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={ep.thumbnail}
                            alt={`Episode ${ep.number}`}
                            fill
                            className="object-cover"
                          />
                          {ep.number === episodeNumber && (
                            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                              <div className="bg-accent text-accent-foreground rounded-full p-1">
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
                                  className="h-4 w-4"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-2 flex-1">
                          <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                            EP {ep.number}
                          </span>
                          <h3 className="text-sm mt-1 line-clamp-1">
                            {ep.title}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-6">
          <div className="aniwatch-container">
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            <div className="bg-card p-4 rounded-lg">
              <div className="mb-4">
                <textarea
                  className="w-full bg-secondary rounded-lg p-3 min-h-[100px] text-sm"
                  placeholder="Add a comment..."
                />
                <div className="flex justify-end mt-2">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Post Comment
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
