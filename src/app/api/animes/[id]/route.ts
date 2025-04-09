import { type NextRequest, NextResponse } from 'next/server';
import { AnimeService } from '@/lib/anime-service';

/**
 * GET /api/animes/[id]
 * Récupère les détails d'un anime par son ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const animeId = params.id;

    if (!animeId) {
      return NextResponse.json(
        { error: 'Anime ID is required' },
        { status: 400 }
      );
    }

    const anime = await AnimeService.getAnimeById(animeId);

    if (!anime) {
      return NextResponse.json(
        { error: 'Anime not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(anime);
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch anime details' },
      { status: 500 }
    );
  }
}
