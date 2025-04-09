"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ThirdPartyPlayerProps {
  sources: {
    name: string;
    type: "iframe" | "direct";
    url: string;
  }[];
  title: string;
  episode: number;
}

export default function ThirdPartyPlayer({ sources, title, episode }: ThirdPartyPlayerProps) {
  const [activeSource, setActiveSource] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleSourceChange = (index: number) => {
    setIsLoading(true);
    setActiveSource(index);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Video Player Container */}
      <div className="relative aspect-video w-full bg-black">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin mb-4" />
              <p className="text-sm">Loading video source...</p>
            </div>
          </div>
        )}

        {/* Iframe Player */}
        {sources[activeSource].type === "iframe" && (
          <iframe
            src={sources[activeSource].url}
            title={`${title} - Episode ${episode}`}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            onLoad={handleIframeLoad}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            aria-label={`Video player for ${title} episode ${episode}`}
          />
        )}

        {/* Direct Video Source */}
        {sources[activeSource].type === "direct" && (
          <video
            src={sources[activeSource].url}
            className="w-full h-full"
            controls
            autoPlay
            onCanPlay={() => setIsLoading(false)}
            aria-label={`Video player for ${title} episode ${episode}`}
          >
            <source src={sources[activeSource].url} type="video/mp4" />
            <track
              kind="captions"
              src={`/captions/${title.toLowerCase().replace(/\s+/g, '-')}-ep${episode}.vtt`}
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Server Selection */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Servers</h3>
        <div className="flex flex-wrap gap-2">
          {sources.map((source, index) => (
            <Button
              key={source.name}
              variant={activeSource === index ? "default" : "secondary"}
              className={activeSource === index ? "bg-accent text-accent-foreground" : ""}
              onClick={() => handleSourceChange(index)}
              aria-pressed={activeSource === index}
              aria-label={`Switch to ${source.name}`}
            >
              {source.name}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          If the current server doesn't work, try another one.
        </p>
      </div>

      {/* Video Information */}
      <div className="mt-4 bg-card rounded-md p-4">
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground">Episode {episode}</p>
        <p className="text-xs text-muted-foreground mt-2">
          All videos are hosted on third-party servers and are not stored on our servers.
          Video quality may vary depending on the source.
        </p>
      </div>
    </div>
  );
}
