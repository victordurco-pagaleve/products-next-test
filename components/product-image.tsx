"use client";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export default function ProductImage({
  src,
  alt,
  className,
  fallback = "https://placehold.co/600x600?text=No+Image",
}: ProductImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
    />
  );
}
