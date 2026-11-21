"use client";

/** Opens the browser's print dialog, where the CV can be printed or saved as a PDF. */
export function PrintButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      {children}
    </button>
  );
}
