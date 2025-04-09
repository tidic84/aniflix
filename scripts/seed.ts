import { PrismaClient } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  try {
    // Read trending animes data
    const trendingAnimesPath = path.join(process.cwd(), 'src/data/trending-anime.json');
    const trendingAnimes = JSON.parse(fs.readFileSync(trendingAnimesPath, 'utf8'));

    // Read popular animes data
    const popularAnimesPath = path.join(process.cwd(), 'src/data/popular-anime.json');
    const popularAnimes = JSON.parse(fs.readFileSync(popularAnimesPath, 'utf8'));

    // Read anime categories data
    const animeCategoriesPath = path.join(process.cwd(), 'src/data/categories.json');
    const animeCategories = JSON.parse(fs.readFileSync(animeCategoriesPath, 'utf8'));

    // Read recent episodes data
    const recentEpisodesPath = path.join(process.cwd(), 'src/data/recent-episodes.json');
    const recentEpisodes = JSON.parse(fs.readFileSync(recentEpisodesPath, 'utf8'));

    console.log(`Found ${trendingAnimes.length} trending animes`);
    console.log(`Found ${popularAnimes.length} popular animes`);
    console.log(`Found ${recentEpisodes.length} recent episodes`);

    // Combined animes from all sources for seeding (remove duplicates by title)
    const animeMap = new Map();

    // Add trending animes
    for (const anime of trendingAnimes) {
      animeMap.set(anime.title, {
        ...anime,
        popularity: anime.popularity || 1000,
        score: parseFloat(anime.score) || 0,
        year: parseInt(anime.year) || 2023,
        episodes: parseInt(anime.episodes) || 12,
        currentEpisode: parseInt(anime.currentEpisode) || 1,
        studios: anime.studios || [],
        genres: anime.genres || []
      });
    }

    // Add popular animes
    for (const anime of popularAnimes) {
      if (!animeMap.has(anime.title)) {
        animeMap.set(anime.title, {
          ...anime,
          popularity: anime.popularity || 500,
          score: parseFloat(anime.score) || 0,
          year: parseInt(anime.year) || 2023,
          episodes: parseInt(anime.episodes) || 12,
          currentEpisode: parseInt(anime.currentEpisode) || 1,
          studios: anime.studios || [],
          genres: anime.genres || []
        });
      }
    }

    // Add category animes
    for (const category of animeCategories) {
      for (const anime of category.animes) {
        if (!animeMap.has(anime.title)) {
          animeMap.set(anime.title, {
            ...anime,
            popularity: anime.popularity || 100,
            score: parseFloat(anime.score) || 0,
            year: parseInt(anime.year) || 2023,
            episodes: parseInt(anime.episodes) || 12,
            currentEpisode: parseInt(anime.currentEpisode) || 1,
            studios: anime.studios || [],
            genres: anime.genres || []
          });
        }
      }
    }

    // Convert to array for processing
    const uniqueAnimes = Array.from(animeMap.values());
    console.log(`Parsed ${uniqueAnimes.length} unique animes for seeding`);

    // Create animes in database
    console.log('Creating animes in database...');

    // Clear existing data
    await prisma.episode.deleteMany({});
    await prisma.anime.deleteMany({});

    // Insert animes
    for (const animeData of uniqueAnimes) {
      const anime = await prisma.anime.create({
        data: {
          title: animeData.title,
          japaneseTitle: animeData.japaneseTitle || null,
          description: animeData.description || 'No description available',
          type: animeData.type || 'TV',
          status: animeData.status || 'Ongoing',
          year: animeData.year || 2023,
          season: animeData.season || 'Winter',
          episodes: animeData.episodes || 12,
          currentEpisode: animeData.currentEpisode || 1,
          duration: animeData.duration || '24m',
          rating: animeData.rating || 'PG-13',
          score: animeData.score || 0,
          popularity: animeData.popularity || 100,
          image: animeData.image,
          bannerImage: animeData.bannerImage || null,
          studios: animeData.studios || [],
          genres: animeData.genres || []
        }
      });

      console.log(`Created anime: ${anime.title}`);

      // Create episodes for this anime
      const episodeCount = animeData.currentEpisode || 1;
      for (let i = 1; i <= episodeCount; i++) {
        await prisma.episode.create({
          data: {
            number: i,
            title: `Episode ${i}`,
            thumbnail: animeData.image,
            date: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // One episode per week
            duration: animeData.duration || '24m',
            description: `Episode ${i} of ${animeData.title}`,
            views: Math.floor(Math.random() * 10000),
            animeId: anime.id
          }
        });
      }

      console.log(`Created ${episodeCount} episodes for ${anime.title}`);
    }

    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
