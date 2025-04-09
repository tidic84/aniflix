"use client";

import React from "react";
import ThirdPartyPlayer from "@/components/video/third-party-player";

interface VideoPlayerWrapperProps {
  sources: {
    name: string;
    type: "iframe" | "direct";
    url: string;
  }[];
  title: string;
  episode: number;
}

export default function VideoPlayerWrapper({
  sources,
  title,
  episode,
}: VideoPlayerWrapperProps) {
  return (
    <ThirdPartyPlayer
      sources={sources}
      title={title}
      episode={episode}
    />
  );
}
