import { type NextRequest, NextResponse } from 'next/server';
import { animeData } from '@/lib/anime-data';

/**
 * GET /api/animes
 * Récupère la liste des animes avec pagination et filtres
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Number.parseInt(searchParams.get('limit') || '20', 10);
    const genre = searchParams.get('genre');
    const type = searchParams.get('type');

    // Convert the animeData object to an array
    const animeArray = Object.values(animeData);

    // Apply filters
    let filteredAnimes = animeArray;

    if (genre) {
      filteredAnimes = filteredAnimes.filter(anime =>
        anime.genres?.includes(genre)
      );
    }

    if (type) {
      filteredAnimes = filteredAnimes.filter(anime =>
        anime.type?.toLowerCase() === type.toLowerCase()
      );
    }

    // Apply limit
    const limitedAnimes = filteredAnimes.slice(0, limit);

    return NextResponse.json({
      data: limitedAnimes,
      meta: {
        currentPage: 1,
        totalItems: filteredAnimes.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(filteredAnimes.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching animes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch animes' },
      { status: 500 }
    );
  }
}
