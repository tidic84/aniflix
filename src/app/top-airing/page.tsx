import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const topAiringAnime = [
  {
    id: "solo-leveling",
    title: "Solo Leveling Season 2: Arise from the Shadow",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2025,
    rating: "HD",
    airDay: "Saturday",
    score: "9.8",
    views: "1.8M",
    rank: 1,
    latestEpisode: 12,
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 1999,
    rating: "HD",
    airDay: "Sunday",
    score: "9.5",
    views: "2.1M",
    rank: 2,
    latestEpisode: 1122,
  },
  {
    id: "dragon-ball",
    title: "Dragon Ball Daima",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2024,
    rating: "HD",
    airDay: "Friday",
    score: "9.2",
    views: "1.5M",
    rank: 3,
    latestEpisode: 13,
  },
  {
    id: "sakamoto-days",
    title: "Sakamoto Days",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2024,
    rating: "HD",
    airDay: "Tuesday",
    score: "8.8",
    views: "1.3M",
    rank: 4,
    latestEpisode: 7,
  },
  {
    id: "apothecary-diaries",
    title: "The Apothecary Diaries Season 2",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2024,
    rating: "HD",
    airDay: "Wednesday",
    score: "8.7",
    views: "1.2M",
    rank: 5,
    latestEpisode: 9,
  },
  {
    id: "happy-marriage",
    title: "My Happy Marriage Season 2",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 2024,
    rating: "HD",
    airDay: "Thursday",
    score: "8.5",
    views: "1.1M",
    rank: 6,
    latestEpisode: 8,
  },
  {
    id: "arifureta",
    title: "Arifureta: From Commonplace to World's Strongest Season 3",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2024,
    rating: "HD",
    airDay: "Sunday",
    score: "8.3",
    views: "950K",
    rank: 7,
    latestEpisode: 6,
  },
  {
    id: "blue-box",
    title: "Blue Box",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2024,
    rating: "HD",
    airDay: "Monday",
    score: "8.9",
    views: "920K",
    rank: 8,
    latestEpisode: 7,
  },
  {
    id: "zenshu",
    title: "Zenshu",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2025,
    rating: "HD",
    airDay: "Friday",
    score: "8.3",
    views: "800K",
    rank: 9,
    latestEpisode: 12,
  },
];

export default function TopAiringPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-10">
        <div className="aniwatch-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Top Airing Anime</h1>
            <div className="flex items-center gap-2">
              <select className="bg-secondary text-sm rounded px-3 py-2 focus:ring-1 focus:ring-accent">
                <option value="all">All Days</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {topAiringAnime.map((anime) => (
              <Card key={anime.id} className="bg-card border-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-36 h-52 md:w-40 md:h-60 flex-shrink-0">
                      <Image
                        src={anime.image}
                        alt={anime.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-accent text-accent-foreground text-xs font-bold rounded-br-md px-2 py-1">
                        #{anime.rank}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-2 py-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                            {anime.rating}
                          </span>
                          <span className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                            EP {anime.latestEpisode}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
                        {anime.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className="bg-secondary px-2 py-0.5 rounded">{anime.year}</span>
                        <span className="bg-secondary px-2 py-0.5 rounded">{anime.airDay}</span>
                        <span className="bg-accent/80 text-accent-foreground px-2 py-0.5 rounded">
                          Score: {anime.score}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-4">
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
                      <div className="flex gap-2">
                        <Link
                          href={`/anime/${anime.id}`}
                          className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded hover:bg-accent/90 transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/watch/${anime.id}/1`}
                          className="text-sm bg-secondary hover:bg-secondary/80 px-3 py-1 rounded transition-colors flex items-center"
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
