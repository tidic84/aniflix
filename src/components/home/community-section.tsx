"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const communityPosts = [
  {
    id: "1",
    title: "Buffering Issues",
    content: "idk if this has been happening to everyone else but ive been getting an insane amount of buffering...",
    user: {
      name: "Tabukium",
      avatar: "https://ext.same-assets.com/2972811077/3652727976.jpeg",
      badge: "Starfish",
    },
    category: "Feedback",
    timeAgo: "a day ago",
    likes: 13,
  },
  {
    id: "2",
    title: "Site buffering too much",
    content: "It's it just me or is the anime on the site buffering alot cuz the final ep of ggo lasted 40 mins for me",
    user: {
      name: "LeoBoy09",
      avatar: "https://ext.same-assets.com/2972811077/207291543.jpeg",
      badge: "Turtle",
    },
    category: "General",
    timeAgo: "8 hours ago",
    likes: 1,
  },
  {
    id: "3",
    title: "Anime recommendation",
    content: "Can anyone suggest shows like Ancient Magus Bride, The Apothecary Diaries and My happy marriage?",
    user: {
      name: "N3BUL4",
      avatar: "https://ext.same-assets.com/2972811077/1948468858.jpeg",
      badge: "Whale",
    },
    category: "Suggestion",
    timeAgo: "9 hours ago",
    likes: 1,
  },
  {
    id: "4",
    title: "Buffering issue",
    content: "Lately aniwatch site is not working properly, whenever i try to watch anime the server automatically change...",
    user: {
      name: "SASUKE",
      avatar: "https://ext.same-assets.com/2972811077/3652727976.jpeg",
      badge: "Shark",
    },
    category: "General",
    timeAgo: "9 hours ago",
    likes: 0,
  },
];

export default function CommunitySection() {
  return (
    <section className="py-10">
      <div className="aniwatch-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Posts</h2>
          <Link href="/community" className="text-sm text-accent hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityPosts.map((post) => (
            <Card key={post.id} className="bg-card border-none">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} alt={post.user.name} />
                      <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-secondary text-xs px-2 py-0.5 rounded">
                        #{post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                      <div className="ml-auto flex items-center">
                        <span className="text-xs text-muted-foreground">{post.likes}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1 h-3 w-3 text-muted-foreground"
                        >
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                    <div className="mt-3 flex items-center text-xs">
                      <span className="text-muted-foreground">{post.user.name}</span>
                      <span className="bg-accent text-accent-foreground px-1.5 py-0.5 rounded ml-2">
                        {post.user.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
