import { type NextRequest, NextResponse } from 'next/server';
import { EpisodeService } from '@/lib/episode-service';

/**
 * GET /api/episodes/[id]
 * Récupère les détails d'un épisode par son ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const episodeId = params.id;

    if (!episodeId) {
      return NextResponse.json(
        { error: 'Episode ID is required' },
        { status: 400 }
      );
    }

    // Incrémenter les vues pour cet épisode
    await EpisodeService.incrementEpisodeViews(episodeId);

    // Récupérer l'épisode mis à jour
    const episode = await EpisodeService.getEpisodeById(episodeId);

    if (!episode) {
      return NextResponse.json(
        { error: 'Episode not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(episode);
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episode details' },
      { status: 500 }
    );
  }
}
