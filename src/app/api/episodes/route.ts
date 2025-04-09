import { type NextRequest, NextResponse } from 'next/server';
import { animeData } from '@/lib/anime-data';

/**
 * GET /api/episodes
 * Récupère les derniers épisodes sortis
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Number.parseInt(searchParams.get('limit') || '20', 10);
    const animeId = searchParams.get('animeId');

    // Get all episodes from all animes
    let allEpisodes: any[] = [];

    // Function to process episodes
    const processAnime = (anime: any, id: string) => {
      if (anime.episodeList && Array.isArray(anime.episodeList)) {
        const episodes = anime.episodeList.map((episode: any) => ({
          ...episode,
          animeId: id,
          anime: {
            id,
            title: anime.title,
            image: anime.image
          }
        }));
        allEpisodes = [...allEpisodes, ...episodes];
      }
    };

    // If animeId is provided, only get episodes for that anime
    if (animeId && animeData[animeId]) {
      processAnime(animeData[animeId], animeId);
    } else {
      // Otherwise get episodes from all animes
      Object.entries(animeData).forEach(([id, anime]) => {
        processAnime(anime, id);
      });
    }

    // Sort by date (newest first)
    allEpisodes.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    // Apply limit
    const limitedEpisodes = allEpisodes.slice(0, limit);

    return NextResponse.json({
      data: limitedEpisodes,
      meta: {
        currentPage: 1,
        totalItems: allEpisodes.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(allEpisodes.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}
