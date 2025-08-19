import React, { useState, useRef, useEffect } from 'react';
import { useCDN } from './CDNProvider';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  lazy?: boolean;
  placeholder?: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 85,
  format = 'webp',
  lazy = true,
  placeholder,
  className = '',
  ...props
}) => {
  const { getOptimizedImageUrl, isEnabled } = useCDN();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Generate optimized image URL
  const optimizedSrc = isEnabled && isInView 
    ? getOptimizedImageUrl(src, width, quality, format)
    : src;

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!isEnabled || !isInView) return undefined;
    
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .filter(size => !width || size <= width * 2)
      .map(size => `${getOptimizedImageUrl(src, size, quality, format)} ${size}w`)
      .join(', ');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && placeholder && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={isInView ? optimizedSrc : placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'}
        srcSet={generateSrcSet()}
        sizes={width ? `(max-width: ${width}px) 100vw, ${width}px` : '100vw'}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${error ? 'bg-gray-200' : ''}
        `}
        {...props}
      />

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;