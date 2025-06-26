import React from 'react';

interface SEOImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  loading = 'lazy',
  priority = false,
  width,
  height,
  className = '',
  ...props
}) => {
  // Se for uma imagem prioritária (above the fold), usar eager loading
  const loadingStrategy = priority ? 'eager' : loading;
  
  return (
    <img
      src={src}
      alt={alt}
      loading={loadingStrategy}
      width={width}
      height={height}
      className={className}
      decoding="async"
      {...(priority && { fetchpriority: 'high' })}
      {...props}
    />
  );
};

export default SEOImage;
