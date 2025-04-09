import { prisma } from './prisma-client';

export class AnimeService {
  // Get all animes with filtering and pagination
  static async getAnimes({
    page = 1,
    limit = 20,
    genre = null,
    type = null,
    season = null,
    status = null,
    year = null,
    sort = 'popularity',
    order = 'desc'
  }: {
    page?: number;
    limit?: number;
    genre?: string | null;
    type?: string | null;
    season?: string | null;
    status?: string | null;
    year?: number | null;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    const skip = (page - 1) * limit;

    // Build the where clause based on filters
    const where: any = {};

    if (genre) {
      where.genres = {
        has: genre
      };
    }

    if (type) {
      where.type = type;
    }

    if (season) {
      where.season = season;
    }

    if (status) {
      where.status = status;
    }

    if (year) {
      where.year = year;
    }

    // Build the orderBy object
    const orderBy: any = {};
    if (sort === 'title') {
      orderBy.title = order;
    } else if (sort === 'year') {
      orderBy.year = order;
    } else if (sort === 'score') {
      orderBy.score = order;
    } else {
      // Default sort by popularity
      orderBy.popularity = order;
    }

    // Get total count for pagination
    const totalCount = await prisma.anime.count({ where });

    // Get animes
    const animes = await prisma.anime.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        year: true,
        episodes: true,
        currentEpisode: true,
        image: true,
        score: true,
        genres: true
      }
    });

    return {
      data: animes,
      meta: {
        currentPage: page,
        totalItems: totalCount,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }

  // Get popular animes
  static async getPopularAnimes(limit = 10) {
    return prisma.anime.findMany({
      take: limit,
      orderBy: {
        popularity: 'desc'
      },
      select: {
        id: true,
        title: true,
        type: true,
        currentEpisode: true,
        image: true,
        score: true,
        genres: true
      }
    });
  }

  // Get top airing animes
  static async getTopAiringAnimes(limit = 10) {
    return prisma.anime.findMany({
      where: {
        status: 'Ongoing'
      },
      take: limit,
      orderBy: [
        { score: 'desc' },
        { popularity: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        type: true,
        currentEpisode: true,
        image: true,
        score: true,
        genres: true
      }
    });
  }

  // Get anime by ID
  static async getAnimeById(id: string) {
    return prisma.anime.findUnique({
      where: { id },
      include: {
        episodes_list: {
          orderBy: {
            number: 'asc'
          }
        }
      }
    });
  }

  // Search animes by title
  static async searchAnimes(query: string, limit = 20) {
    return prisma.anime.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: limit,
      orderBy: {
        popularity: 'desc'
      },
      select: {
        id: true,
        title: true,
        type: true,
        image: true,
        score: true
      }
    });
  }

  // Get animes by season and year
  static async getAnimesBySeason(season: string, year: number, limit = 20) {
    return prisma.anime.findMany({
      where: {
        season,
        year
      },
      take: limit,
      orderBy: {
        popularity: 'desc'
      },
      select: {
        id: true,
        title: true,
        type: true,
        currentEpisode: true,
        image: true,
        score: true,
        genres: true
      }
    });
  }

  // Get related animes (by genre)
  static async getRelatedAnimes(animeId: string, limit = 5) {
    const anime = await prisma.anime.findUnique({
      where: { id: animeId },
      select: { genres: true }
    });

    if (!anime) return [];

    return prisma.anime.findMany({
      where: {
        id: { not: animeId },
        genres: {
          hasSome: anime.genres
        }
      },
      take: limit,
      orderBy: {
        popularity: 'desc'
      },
      select: {
        id: true,
        title: true,
        type: true,
        image: true,
        score: true
      }
    });
  }
}
