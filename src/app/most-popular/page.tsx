import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const popularAnime = [
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 1999,
    rating: "HD",
    status: "Ongoing",
    score: "9.5",
    views: "2.1M",
    rank: 1,
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling Season 2: Arise from the Shadow",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2025,
    rating: "HD",
    status: "Ongoing",
    score: "9.8",
    views: "1.8M",
    rank: 2,
  },
  {
    id: "dragon-ball",
    title: "Dragon Ball Daima",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "9.2",
    views: "1.5M",
    rank: 3,
  },
  {
    id: "bleach",
    title: "Bleach",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2004,
    rating: "HD",
    status: "Completed",
    score: "8.6",
    views: "1.4M",
    rank: 4,
  },
  {
    id: "sakamoto-days",
    title: "Sakamoto Days",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "8.8",
    views: "1.3M",
    rank: 5,
  },
  {
    id: "apothecary-diaries",
    title: "The Apothecary Diaries Season 2",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "8.7",
    views: "1.2M",
    rank: 6,
  },
  {
    id: "happy-marriage",
    title: "My Happy Marriage Season 2",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "8.5",
    views: "1.1M",
    rank: 7,
  },
  {
    id: "arifureta",
    title: "Arifureta: From Commonplace to World's Strongest Season 3",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "8.3",
    views: "950K",
    rank: 8,
  },
  {
    id: "blue-box",
    title: "Blue Box",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2024,
    rating: "HD",
    status: "Ongoing",
    score: "8.9",
    views: "920K",
    rank: 9,
  },
  {
    id: "dandadan",
    title: "Dandadan",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2023,
    rating: "HD",
    status: "Completed",
    score: "8.7",
    views: "900K",
    rank: 10,
  },
  {
    id: "wind-breaker",
    title: "Wind Breaker",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 2023,
    rating: "HD",
    status: "Completed",
    score: "8.5",
    views: "850K",
    rank: 11,
  },
  {
    id: "zenshu",
    title: "Zenshu",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2025,
    rating: "HD",
    status: "Ongoing",
    score: "8.3",
    views: "800K",
    rank: 12,
  },
];

export default function MostPopularPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-10">
        <div className="aniwatch-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Most Popular Anime</h1>
            <div className="flex items-center gap-2">
              <select className="bg-secondary text-sm rounded px-3 py-2 focus:ring-1 focus:ring-accent">
                <option value="all-time">All Time</option>
                <option value="this-season">This Season</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {popularAnime.map((anime) => (
              <Link key={anime.id} href={`/anime/${anime.id}`}>
                <Card className="bg-card border-none overflow-hidden hover:bg-card/80 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 flex items-center justify-center">
                        <span className={`text-lg font-bold ${anime.rank <= 3 ? 'text-accent' : 'text-muted-foreground'}`}>
                          #{anime.rank}
                        </span>
                      </div>
                      <div className="relative h-24 w-16 flex-shrink-0">
                        <Image
                          src={anime.image}
                          alt={anime.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1 line-clamp-1">{anime.title}</h3>
                        <div className="flex flex-wrap gap-2 text-xs mb-2">
                          <span className="bg-secondary px-2 py-0.5 rounded">{anime.status}</span>
                          <span className="bg-secondary px-2 py-0.5 rounded">{anime.year}</span>
                          <span className="bg-accent/80 text-accent-foreground px-2 py-0.5 rounded">
                            Score: {anime.score}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
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
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {anime.views} views
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center">
                        <div className="bg-accent text-accent-foreground rounded-full p-2">
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
                            className="h-4 w-4"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
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
