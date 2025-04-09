import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const animeMovies = [
  {
    id: "sao-progressive",
    title: "Sword Art Online Progressive: Scherzo of Deep Night",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2023,
    rating: "HD",
    duration: "1h 41m",
    score: "7.4",
  },
  {
    id: "your-name",
    title: "Kimi no Na wa (Your Name)",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2016,
    rating: "HD",
    duration: "1h 47m",
    score: "9.2",
  },
  {
    id: "suzume",
    title: "Suzume no Tojimari",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 2022,
    rating: "HD",
    duration: "2h 2m",
    score: "8.6",
  },
  {
    id: "jujutsu-kaisen-0",
    title: "Jujutsu Kaisen 0",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2021,
    rating: "HD",
    duration: "1h 45m",
    score: "8.4",
  },
  {
    id: "demon-slayer-mugen-train",
    title: "Demon Slayer: Mugen Train",
    image: "https://ext.same-assets.com/1515222727/3156069097.jpeg",
    year: 2020,
    rating: "HD",
    duration: "1h 57m",
    score: "8.9",
  },
  {
    id: "weathering-with-you",
    title: "Tenki no Ko (Weathering With You)",
    image: "https://ext.same-assets.com/1515222727/467283363.jpeg",
    year: 2019,
    rating: "HD",
    duration: "1h 52m",
    score: "8.5",
  },
  {
    id: "one-piece-film-red",
    title: "One Piece Film: Red",
    image: "https://ext.same-assets.com/1515222727/847111745.jpeg",
    year: 2022,
    rating: "HD",
    duration: "1h 55m",
    score: "7.8",
  },
  {
    id: "kimetsu-no-yaiba-mugen-ressha-hen",
    title: "Kimetsu no Yaiba Movie: Mugen Ressha-hen",
    image: "https://ext.same-assets.com/1515222727/771550143.jpeg",
    year: 2020,
    rating: "HD",
    duration: "1h 57m",
    score: "8.7",
  },
];

export default function MoviesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-10">
        <div className="aniwatch-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Anime Movies</h1>
            <div className="flex items-center gap-2">
              <select className="bg-secondary text-sm rounded px-3 py-2 focus:ring-1 focus:ring-accent">
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {animeMovies.map((movie) => (
              <Link key={movie.id} href={`/anime/${movie.id}`}>
                <Card className="bg-card border-none overflow-hidden anime-card">
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] w-full">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-1.5 py-0.5 rounded">
                        {movie.rating}
                      </div>
                      <div className="absolute top-2 right-2 bg-secondary text-xs font-medium px-1.5 py-0.5 rounded">
                        {movie.year}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium bg-secondary px-1.5 py-0.5 rounded">
                            Movie
                          </span>
                          <span className="text-xs bg-accent/80 text-accent-foreground px-1.5 py-0.5 rounded">
                            Score: {movie.score}
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
                      <h3 className="font-medium text-sm line-clamp-2">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{movie.duration}</p>
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
