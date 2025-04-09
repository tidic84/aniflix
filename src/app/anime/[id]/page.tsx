import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would typically come from a database, but for our demo we'll use static data
import { animeData } from "@/lib/anime-data";

// Required for static site generation with dynamic routes
export function generateStaticParams() {
  return Object.keys(animeData).map((id) => ({ id }));
}

// Function to get anime data by ID or return null
const getAnimeData = (id: string) => {
  return animeData[id as keyof typeof animeData] || null;
};

// Updated type for page props to fix the build error
type AnimePageProps = {
  params: {
    id: string;
  };
};

export default function AnimeDetailPage({ params }: AnimePageProps) {
  const anime = getAnimeData(params.id);

  // If anime doesn't exist, we'd typically want to show a 404 page
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

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* Banner Section */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={anime.bannerImage}
              alt={anime.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="aniwatch-container relative h-full flex items-end z-10 pb-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative w-32 h-48 md:w-48 md:h-72 overflow-hidden rounded-md shadow-lg flex-shrink-0">
                <Image
                  src={anime.image}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">
                    {anime.type}
                  </span>
                  <span className="bg-secondary text-foreground text-xs font-semibold px-2 py-0.5 rounded">
                    {anime.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {anime.season} {anime.year}
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold">{anime.title}</h1>
                <h2 className="text-lg text-muted-foreground">{anime.japaneseTitle}</h2>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-accent font-bold">{anime.score}</span>
                    <span className="text-xs text-muted-foreground">Score</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-accent font-bold">{anime.rating}</span>
                    <span className="text-xs text-muted-foreground">Quality</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-accent font-bold">{anime.duration}</span>
                    <span className="text-xs text-muted-foreground">Duration</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-accent font-bold">{anime.currentEpisode}/{anime.episodes}</span>
                    <span className="text-xs text-muted-foreground">Episodes</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {anime.genres.map((genre) => (
                    <Link
                      key={genre}
                      href={`/genre/${genre.toLowerCase()}`}
                      className="text-xs bg-secondary hover:bg-secondary/80 px-2 py-1 rounded transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/watch/${anime.id}/1`}>
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
                        className="h-4 w-4 mr-2"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Watch Now
                    </Link>
                  </Button>
                  <Button variant="outline">
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
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    Add to List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Tabs Section */}
        <section className="py-10">
          <div className="aniwatch-container">
            <Tabs defaultValue="episodes" className="w-full">
              <TabsList className="mb-6 bg-card">
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="characters">Characters</TabsTrigger>
                <TabsTrigger value="similar">Similar</TabsTrigger>
              </TabsList>

              {/* Episodes Tab */}
              <TabsContent value="episodes" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {anime.episodeList.map((episode) => (
                    <Link key={episode.number} href={`/watch/${anime.id}/${episode.number}`}>
                      <Card className="bg-card border-none overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                              <Image
                                src={episode.thumbnail}
                                alt={`Episode ${episode.number}`}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
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
                                  className="h-8 w-8"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1 p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                                  EP {episode.number}
                                </span>
                                <span className="text-xs text-muted-foreground">{episode.duration}</span>
                              </div>
                              <h3 className="font-medium text-sm line-clamp-2">{episode.title}</h3>
                              <span className="text-xs text-muted-foreground block mt-2">
                                {episode.date}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="mt-0">
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Synopsis</h3>
                  <p className="text-muted-foreground mb-6">{anime.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Type:</span>
                          <span>{anime.type}</span>
                        </li>
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Episodes:</span>
                          <span>{anime.episodes}</span>
                        </li>
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Status:</span>
                          <span>{anime.status}</span>
                        </li>
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Aired:</span>
                          <span>{anime.season} {anime.year}</span>
                        </li>
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Duration:</span>
                          <span>{anime.duration} per ep</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Statistics</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Score:</span>
                          <span>{anime.score}</span>
                        </li>
                        <li className="flex">
                          <span className="text-muted-foreground w-28">Studios:</span>
                          <span>{anime.studios.join(", ")}</span>
                        </li>
                        <li className="flex flex-wrap">
                          <span className="text-muted-foreground w-28">Genres:</span>
                          <span>{anime.genres.join(", ")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Characters Tab */}
              <TabsContent value="characters" className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {anime.characters.map((character) => (
                    <Card key={character.name} className="bg-card border-none overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-40 w-full">
                          <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">{character.name}</h3>
                          <span className="text-xs text-muted-foreground">{character.role}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Similar Anime Tab */}
              <TabsContent value="similar" className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {anime.similarAnime.map((similar) => (
                    <Link key={similar.id} href={`/anime/${similar.id}`}>
                      <Card className="bg-card border-none overflow-hidden anime-card">
                        <CardContent className="p-0">
                          <div className="relative aspect-[2/3] w-full">
                            <Image
                              src={similar.image}
                              alt={similar.title}
                              fill
                              className="object-cover"
                            />
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
                                    className="h-4 w-4"
                                  >
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <h3 className="font-medium text-sm line-clamp-2">{similar.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
