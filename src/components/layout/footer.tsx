"use client";

import React from "react";
import Link from "next/link";
import { FaTwitter, FaReddit, FaFacebookF, FaTelegram } from "react-icons/fa";

const socialLinks = [
  { icon: <FaReddit size={18} />, href: "#", label: "Reddit" },
  { icon: <FaTwitter size={18} />, href: "#", label: "Twitter" },
  { icon: <FaFacebookF size={18} />, href: "#", label: "Facebook" },
  { icon: <FaTelegram size={18} />, href: "#", label: "Telegram" },
];

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "TV Series", href: "/tv-series" },
  { name: "Most Popular", href: "/most-popular" },
  { name: "Top Airing", href: "/top-airing" },
  { name: "A-Z List", href: "/az-list" },
  { name: "Community", href: "/community" },
];

export default function Footer() {
  return (
    <footer className="bg-card mt-10 border-t border-border">
      <div className="aniwatch-container py-10">
        {/* Upper Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold flex items-center">
              <span className="text-accent">Ani</span>Watch
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              The best site to watch anime online for free
            </p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={`social-${link.label}`}
                href={link.href}
                aria-label={link.label}
                className="bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors p-2 rounded-full"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="border-t border-border pt-6">
          <nav className="flex flex-wrap justify-center gap-6 mb-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="nav-link text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground pt-6 border-t border-border">
          <p>© AniWatch.to. All rights reserved.</p>
          <p className="mt-2">
            Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  );
}
