"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Component-specific styles
const componentStyles = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface MusicArtworkProps {
  artist: string;
  music: string;
  albumArt: string;
  isSong: boolean;
  isLoading?: boolean;
  isPlaying?: boolean;
  dockMode?: boolean;
  showHoverExtras?: boolean;
  sizePreset?: "default" | "dock";
}

export default function MusicArtwork({
  artist,
  music,
  albumArt,
  isSong,
  isLoading = false,
  isPlaying,
  dockMode = false,
  showHoverExtras = true,
  sizePreset = "default",
}: MusicArtworkProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const vinylRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const isControlled = typeof isPlaying === "boolean";
  const effectivePlaying = isControlled ? isPlaying : internalIsPlaying;
  const shouldRenderHoverExtras = showHoverExtras && isHovered;
  const showVinyl = dockMode ? true : isHovered || effectivePlaying;
  const artworkSizeClass = sizePreset === "dock" ? "w-24 h-24 sm:w-28 sm:h-28" : "w-48 h-48 sm:w-64 sm:h-64";
  const vinylSizeClass =
    sizePreset === "dock"
      ? "w-[6.5rem] h-[6.5rem] sm:w-[7.5rem] sm:h-[7.5rem]"
      : "w-50 h-50 sm:w-70 sm:h-70";
  const vinylOffsetClass = sizePreset === "dock" ? "-left-8 sm:-left-9" : "-left-16 sm:-left-24";
  const tooltipVisible = shouldRenderHoverExtras && !dockMode;

  // Calculate spin duration based on type: songs (0.75 rev/sec) vs albums (0.55 rev/sec)
  const spinDuration = isSong ? 1 / 0.75 : 1 / 0.55; // Convert rev/sec to seconds per revolution

  const handlePlayPause = () => {
    if (isControlled) {
      return;
    }

    if (internalIsPlaying) {
      // Pause: capture current rotation
      if (vinylRef.current) {
        const computedStyle = window.getComputedStyle(vinylRef.current);
        const transform = computedStyle.transform;
        if (transform && transform !== "none") {
          const matrix = new DOMMatrix(transform);
          const angle = (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
          setRotation(angle < 0 ? angle + 360 : angle);
        }
      }
    } else {
      // Resume: set start time for animation
      startTimeRef.current = Date.now();
    }
    setInternalIsPlaying(!internalIsPlaying);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const tooltipWidth = 300; // Increased for more content
        const tooltipHeight = 60; // Increased for multiple lines
        const offset = 20;

        let x = e.clientX + offset;
        let y = e.clientY - tooltipHeight - 10;

        // Prevent tooltip from going off right edge
        if (x + tooltipWidth > window.innerWidth) {
          x = e.clientX - tooltipWidth - offset;
        }

        // Prevent tooltip from going off top edge
        if (y < 0) {
          y = e.clientY + offset;
        }

        // Prevent tooltip from going off bottom edge
        if (y + tooltipHeight > window.innerHeight) {
          y = e.clientY - tooltipHeight - offset;
        }

        setMousePosition({ x, y });
      });
    };

    if (tooltipVisible) {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tooltipVisible]);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="relative group">
          {/* Loading skeleton */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Component-specific styles */}
      <style jsx>{componentStyles}</style>

      {/* Enhanced Tooltip that follows cursor - Desktop only */}
      {tooltipVisible && (
        <div
          className="fixed z-50 pointer-events-none hidden sm:block"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translateZ(0)", // Force hardware acceleration
          }}
        >
          <div className="bg-neutral-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg border border-neutral-700/50 animate-in fade-in zoom-in-95 duration-200">
            <span className="font-bold">{artist}</span> &nbsp;•&nbsp; {music}
          </div>
        </div>
      )}

      {/* Main container */}
      <div className="relative group">
        {/* Vinyl record with enhanced animation and glow */}
        <div
          className={`absolute ${vinylOffsetClass} top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
            showVinyl ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 sm:translate-x-24"
          }`}
        >
          <div className={`relative ${vinylSizeClass}`}>
            <div
              ref={vinylRef}
              className="w-full h-full"
              style={{
                transform: effectivePlaying ? undefined : `rotate(${rotation}deg)`,
                animation: effectivePlaying ? `spin ${spinDuration}s linear infinite` : "none",
                animationDelay: effectivePlaying ? `${-rotation / (360 / spinDuration)}s` : undefined,
              }}
            >
              <Image
                src="https://pngimg.com/d/vinyl_PNG95.png"
                alt="Vinyl Record"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Album artwork */}
        <div
          className={`relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ease-out ${dockMode ? "bg-black/70" : "bg-black/40"} ${
            isControlled ? "cursor-default" : "cursor-pointer hover:scale-105 hover:shadow-3xl"
          } ${artworkSizeClass}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={isControlled ? undefined : handlePlayPause}
        >
          <Image
            src={albumArt}
            alt={`${music} Cover`}
            width={sizePreset === "dock" ? 112 : 256}
            height={sizePreset === "dock" ? 112 : 256}
            className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-110 ${
              !imageLoaded ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              // Handle error with fallback image
              setImageLoaded(true);
            }}
            priority={sizePreset === "dock"}
            unoptimized
          />

          {/* Loading state overlay */}
          {!imageLoaded && (
            <div className={`absolute inset-0 ${dockMode ? "bg-black/70" : "bg-neutral-200 dark:bg-neutral-800 animate-pulse"}`} />
          )}

          {/* Play/Pause button with text on mobile */}
          <div
            className={`absolute bottom-2 left-2 transition-opacity duration-300 ${
              shouldRenderHoverExtras ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              {/* Play/Pause button */}
              <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center shadow-lg">
                {effectivePlaying ? (
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-white rounded"></div>
                    <div className="w-0.5 h-3 bg-white rounded"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                )}
              </div>
              {/* Text for mobile only */}
              <div className="sm:hidden">
                <div className="text-white text-[10px] font-medium whitespace-nowrap bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                  <span className="font-bold">{artist}</span> • {music}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}
