import { prisma } from './prisma-client';

/**
 * Service pour gérer les interactions avec la base de données des épisodes
 */
export class EpisodeService {
  // Get all episodes with pagination and filtering
  static async getEpisodes({
    page = 1,
    limit = 20,
    animeId = null
  }: {
    page?: number;
    limit?: number;
    animeId?: string | null;
  }) {
    const skip = (page - 1) * limit;

    // Build the where clause based on filters
    const where: any = {};

    if (animeId) {
      where.animeId = animeId;
    }

    // Get total count for pagination
    const totalCount = await prisma.episode.count({ where });

    // Get episodes
    const episodes = await prisma.episode.findMany({
      where,
      orderBy: [
        { date: 'desc' },
        { number: 'desc' }
      ],
      skip,
      take: limit,
      include: {
        anime: {
          select: {
            id: true,
            title: true,
            image: true
          }
        }
      }
    });

    return {
      data: episodes,
      meta: {
        currentPage: page,
        totalItems: totalCount,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }

  // Get recent episodes
  static async getRecentEpisodes(limit = 20) {
    return prisma.episode.findMany({
      take: limit,
      orderBy: {
        date: 'desc'
      },
      include: {
        anime: {
          select: {
            id: true,
            title: true,
            image: true
          }
        }
      }
    });
  }

  // Get episode by ID
  static async getEpisodeById(id: string) {
    return prisma.episode.findUnique({
      where: { id },
      include: {
        anime: true
      }
    });
  }

  // Get episodes by anime ID
  static async getEpisodesByAnimeId(animeId: string) {
    return prisma.episode.findMany({
      where: { animeId },
      orderBy: {
        number: 'asc'
      }
    });
  }

  // Increment episode views
  static async incrementViews(id: string) {
    return prisma.episode.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    });
  }
}

export default EpisodeService;
