"use client";

import { useEffect } from "react";

export default function ClientFavicon() {
    useEffect(() => {
        const frames = [
            "/frame1.png",
            "/frame2.png",
        ];

        let currentFrame = 0;
        const favicon = document.getElementById("favicon");

        const animateFavicon = () => {
            if (favicon) {
                favicon.setAttribute("href", frames[currentFrame]);
                currentFrame = (currentFrame + 1) % frames.length;
            }
        };

        const interval = setInterval(animateFavicon, 10);

        return () => clearInterval(interval);
    }, []);

    return null;
}
