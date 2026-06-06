import { useEffect, useRef } from 'react';

export const useScrollObserver = (callback?: (isVisible: boolean) => void) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            callback?.(true);
          } else {
            entry.target.classList.remove('scroll-visible');
            callback?.(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [callback]);

  return elementRef;
};
