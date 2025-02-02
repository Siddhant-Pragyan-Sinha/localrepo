import { ShareIcon } from "../icons/ShareIcon";
import { useEffect } from "react";

// Define the props interface with explanations
interface CardProps {
    title: string;    // Display title for the card
    link: string;     // Original URL of the content
    type: "twitter" | "youtube" | "instagram" | "discord"; // Content platform type
}

// YouTube Embed Component: Handles various YouTube URL formats
const YouTubeEmbed = ({ url }: { url: string }) => {
    // Convert any YouTube URL to embed format
    const getEmbedUrl = (link: string) => {
        try {
            const parsed = new URL(link);
            // Handle standard watch URLs (https://www.youtube.com/watch?v=ID)
            const videoId = parsed.searchParams.get('v') || 
                          // Handle shortened URLs (https://youtu.be/ID)
                          parsed.pathname.split('/').pop();
            return `https://www.youtube.com/embed/${videoId}`;
        } catch {
            // Fallback for malformed URLs using simple replacements
            return link.replace("watch", "embed")
                       .replace("youtu.be/", "youtube.com/embed/")
                       .replace("?v=", "/");
        }
    };

    return (
        <iframe
            className="w-full aspect-video"  // 16:9 aspect ratio
            src={getEmbedUrl(url)}
            title="YouTube video player"
            loading="lazy"  // Lazy-load iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

// Instagram Embed Component: Converts post URLs to embed format
const InstagramEmbed = ({ url }: { url: string }) => {
    // Extract post ID from URL and format for Instagram's embed endpoint
    const getEmbedUrl = (link: string) => {
        const postId = link.split('/').pop()?.split('?')[0]; // Remove any query parameters
        return `https://www.instagram.com/p/${postId}/embed/captioned/`;
    };

    return (
        <iframe
            className="w-full aspect-square" // Square aspect ratio for Instagram posts
            src={getEmbedUrl(url)}
            title="Instagram post"
            loading="lazy"
            style={{ overflow: "hidden" }}
                                         // scrolling="no" depreciated attribute removed before for style
            allow="encrypted-media"
        />
    );
};

// Discord Embed Component: Creates server widget from invite link
const DiscordEmbed = ({ url }: { url: string }) => {
    // Convert Discord invite URL to widget embed format
    const getEmbedUrl = (link: string) => {
        const inviteCode = link.split('/').pop()?.split('?')[0]; // Extract invite code
        return `https://discord.com/widget?id=${inviteCode}&theme=dark`;
    };

    return (
        <iframe
            className="w-full h-96"  // Fixed height for Discord widget
            src={getEmbedUrl(url)}
            title="Discord widget"
            loading="lazy"
            // Sandbox permissions for secure embedding
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
    );
};

// Twitter Embed Component: Handles tweet embedding with dynamic script loading
const TwitterEmbed = ({ url }: { url: string }) => {
    // Dynamically load Twitter's widgets.js script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
        
        // Cleanup: Remove script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        // Twitter's native embed markup
        <blockquote 
            className="twitter-tweet" 
            data-lang="en" 
            data-theme="light"
            data-dnt="true" // Respect Do Not Track
        >
            <a href={url.replace("x.com", "twitter.com")}>
                {url.split('/').pop()} {/* Display last part of URL as fallback text */}
            </a>
        </blockquote>
    );
};

// Main Card Component
export function Card({ title, link, type }: CardProps) {
    return (
        <div className="p-4 bg-white rounded-md border-gray-200 border max-w-72 min-w-72">
            {/* Header Section */}
            <div className="flex justify-between">
                {/* Left Side: Title with Share Icon */}
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon /> {/* Decorative icon before title */}
                    </div>
                    {title}
                </div>
                
                {/* Right Side: External Link Icon */}
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" // Security for external links
                            aria-label={`Open ${type} content in new tab`}
                        >
                            <ShareIcon /> {/* Interactive link icon */}
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Area: Dynamic Embed Rendering */}
            <div className="pt-4">
                {type === "youtube" && <YouTubeEmbed url={link} />}
                {type === "twitter" && <TwitterEmbed url={link} />}
                {type === "instagram" && <InstagramEmbed url={link} />}
                {type === "discord" && <DiscordEmbed url={link} />}
            </div>
        </div>
    );
}