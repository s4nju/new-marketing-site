import { preload } from "react-dom";
import variants from "../../lib/phone-images.json";

const avifSrcSet = variants.avif
  .map((image) => `${image.src} ${image.width}w`).join(", ");
const webpSrcSet = variants.webp
  .map((image) => `${image.src} ${image.width}w`).join(", ");

// Prebuilt variants avoid runtime image conversion on the LCP request.
export default function PhoneImage({
  alt,
  sizes,
  eager = false,
}: {
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  if (eager) {
    preload(variants.avif[1].src, {
      as: "image", type: "image/avif", fetchPriority: "high",
      imageSrcSet: avifSrcSet, imageSizes: sizes,
    });
  }

  return (
    <picture style={{ display: "contents" }}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        alt={alt}
        src={variants.webp[1].src}
        srcSet={webpSrcSet}
        sizes={sizes}
        width={1206}
        height={2622}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
