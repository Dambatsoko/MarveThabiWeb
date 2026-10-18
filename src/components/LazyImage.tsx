import React, { useState, useEffect } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio,
  fallbackSrc,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      className={`${className} ${isLoaded ? 'img-loaded' : 'img-loading'}`}
      style={{
        transition: 'opacity 0.3s ease, filter 0.3s ease',
        opacity: isLoaded ? 1 : 0.7,
        aspectRatio: aspectRatio || undefined,
        ...style,
      }}
      {...rest}
    />
  );
};

export default LazyImage;
