'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  pageLabel: string;
}

export function LoadingScreen({ pageLabel }: LoadingScreenProps) {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const lines = [
    '> storm-os initializing',
    `> loading ${pageLabel} .........`,
  ];

  useEffect(() => {
    // Skip if URL has a hash (in-page link)
    if (window.location.hash) {
      setIsVisible(false);
      return;
    }

    // Check if document is already loaded and page is visible
    if (document.readyState === 'complete') {
      // Page already loaded, skip loading screen entirely
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setStep(lines.length - 1);
      setProgress(100);
      setTimeout(() => setReady(true), 200);
      return;
    }

    const totalDuration = 1200;
    const stepInterval = 400;

    const stepTimer = setInterval(() => {
      setStep((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, stepInterval);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 100 / (totalDuration / 50);
        }
        clearInterval(progressInterval);
        setTimeout(() => setReady(true), 200);
        return 100;
      });
    }, 50);

    // Also listen for document load
    const handleLoad = () => {
      if (document.readyState === 'complete') {
        clearInterval(stepTimer);
        clearInterval(progressInterval);
        setStep(lines.length - 1);
        setProgress(100);
        setTimeout(() => setReady(true), 200);
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, [lines.length]);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative transition-opacity duration-200" style={{ opacity: ready ? 0 : 1, pointerEvents: ready ? 'none' : 'auto' }}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[400px] h-[400px] bg-[#BF5AF2]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 font-mono text-sm sm:text-base text-neutral-400 max-w-sm w-full px-6">
        <div className="space-y-1">
          {lines.map((line, index) => {
            const isCurrent = index === step;
            const isPast = index < step;
            const isLast = index === lines.length - 1;
            const showOk = !isLast && isPast;

            return (
              <div key={index} className="flex">
                <span style={{ opacity: isPast || isCurrent ? 1 : 0, transition: 'opacity 100ms' }}>
                  {line}
                  {showOk && <span className="text-[#BF5AF2]"> ok</span>}
                  {isCurrent && <span className="inline-block w-2 h-4 bg-[#BF5AF2] ml-1 animate-pulse" />}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#BF5AF2] transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
