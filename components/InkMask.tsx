import type { CSSProperties } from "react";

type Props = {
  /** URL of a mask image (black or white where the ink should land, transparent elsewhere). */
  src: string;
  /** The ink colour, usually a CSS variable. */
  ink: string;
  className?: string;
  style?: CSSProperties;
  label?: string;
};

/**
 * A layer of ink in the shape of a generated mask. Used for the halftone screens and the
 * cyanotype prints, so their colour can follow the edition instead of being baked into the file.
 */
export function InkMask({ src, ink, className, style, label }: Props) {
  const mask = `url(${JSON.stringify(src)})`;
  return (
    <span
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: "block",
        background: ink,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
