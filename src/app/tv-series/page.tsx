import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const animeTVSeries = [
  {
    id: "solo-leveling",
    title: "Solo Leveling Season 2: Arise from the Shadow",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2025,
    rating: "HD",
    status: "Ongoing",
    score: "9.8",
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 1999,
    rating: "HD",
    status: "Ongoing",
    score: "9.5",
  },
  {
    id: "dragon-ball",
    title: "Dragon Ball Daima",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "9.2",
  },
  {
    id: "blue-box",
    title: "Blue Box",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "8.9",
  },
  {
    id: "dandadan",
    title: "Dandadan",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2023,
    rating: "HD",
    status: "Completed",
    score: "8.7",
  },
  {
    id: "bleach",
    title: "Bleach",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2004,
    rating: "HD",
    status: "Completed",
    score: "8.6",
  },
  {
    id: "wind-breaker",
    title: "Wind Breaker",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 2023,
    rating: "HD",
    status: "Completed",
    score: "8.5",
  },
  {
    id: "zenshu",
    title: "Zenshu",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2025,
    rating: "HD",
    status: "Ongoing",
    score: "8.3",
  },
];

export default function TVSeriesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-10">
        <div className="aniwatch-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">TV Series</h1>
            <div className="flex items-center gap-2">
              <select className="bg-secondary text-sm rounded px-3 py-2 focus:ring-1 focus:ring-accent">
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {animeTVSeries.map((series) => (
              <Link key={series.id} href={`/anime/${series.id}`}>
                <Card className="bg-card border-none overflow-hidden anime-card">
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] w-full">
                      <Image
                        src={series.image}
                        alt={series.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded">
                        {series.rating}
                      </div>
                      <div className="absolute top-2 right-2 bg-secondary text-xs font-medium px-1.5 py-0.5 rounded">
                        {series.year}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium bg-secondary px-1.5 py-0.5 rounded">
                            {series.status}
                          </span>
                          <span className="text-xs bg-accent/80 text-accent-foreground px-1.5 py-0.5 rounded">
                            Score: {series.score}
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
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2">{series.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{series.status}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <div className="flex gap-2">
              <Link
                href="#"
                className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded transition-colors"
              >
                1
              </Link>
              <Link
                href="#"
                className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded transition-colors"
              >
                2
              </Link>
              <Link
                href="#"
                className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded transition-colors"
              >
                3
              </Link>
              <Link
                href="#"
                className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded transition-colors"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
