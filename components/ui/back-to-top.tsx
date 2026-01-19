'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from './button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './tooltip';

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={scrollToTop}
                                size="icon"
                                className="fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
                                aria-label="Back to top"
                            >
                                <ChevronUp className="h-6 w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                            Back to Top
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            )}
        </>
    );
}
