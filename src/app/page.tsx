import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import LatestEpisodes from "@/components/home/latest-episodes";
import GenresSection from "@/components/home/genres-section";
import PopularSection from "@/components/home/popular-section";
import CommunitySection from "@/components/home/community-section";

// Ce composant sera directement rendu en tant que route App
export default async function Home() {
  try {
    // Récupérer les animes populaires depuis l'API avec URL absolue
    const popularAnimesResponse = await fetch('http://localhost:3000/api/animes?limit=5', {
      next: { revalidate: 3600 } // Revalider toutes les heures
    });
    const popularAnimes = await popularAnimesResponse.json();

    // Récupérer les derniers épisodes depuis l'API avec URL absolue
    const latestEpisodesResponse = await fetch('http://localhost:3000/api/episodes?limit=12', {
      next: { revalidate: 3600 }
    });
    const latestEpisodes = await latestEpisodesResponse.json();

    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <HeroSection />
          <LatestEpisodes episodes={latestEpisodes?.data || []} />
          <GenresSection />
          <PopularSection animes={popularAnimes?.data || []} />
          <CommunitySection />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    // Fallback en cas d'erreur
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <HeroSection />
          <LatestEpisodes episodes={[]} />
          <GenresSection />
          <PopularSection animes={[]} />
          <CommunitySection />
        </div>
        <Footer />
      </main>
    );
  }
}
