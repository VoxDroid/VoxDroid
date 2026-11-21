import type React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { resolveReadmeUrl } from "@/lib/markdown-urls";
import rehypeLabelLinks from "@/lib/rehype-label-links";
import remarkAlerts from "@/lib/remark-alerts";

type Props = {
  children: string;
  className?: string;
  /** When rendering a repository README, relative URLs are resolved against it. */
  repo?: { repo: string; branch: string; readmePath: string };
};

/**
 * Renders Markdown (a README or a project write-up). Raw HTML is allowed but sanitized with
 * GitHub's own schema, so a README cannot inject scripts or styles into the page.
 */
/** Headings inside a page section start two levels down (a README's # becomes an h3), so the page keeps one h1. */
function shifted(level: number) {
  const Tag = `h${Math.min(6, level + 2)}` as "h3" | "h4" | "h5" | "h6";
  function Heading({
    node: _node,
    ...props
  }: React.ComponentProps<"h1"> & { node?: unknown }) {
    return <Tag {...props} />;
  }
  return Heading;
}

export function Markdown({ children, className, repo }: Props) {
  const components: Components = {
    h1: shifted(1),
    h2: shifted(2),
    h3: shifted(3),
    h4: shifted(4),
    h5: shifted(5),
    h6: shifted(6),
    // Code blocks and tables scroll sideways on narrow screens, so they must be reachable by keyboard.
    pre: ({ node: _node, ...props }) => <pre tabIndex={0} {...props} />,
    table: ({ node: _node, ...props }) => <table tabIndex={0} {...props} />,
    a: ({ node: _node, href, children: label, ...rest }) => {
      const external = !!href && /^https?:/i.test(href);
      return (
        <a
          href={href}
          {...rest}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>
      );
    },
    img: ({ node: _node, src, alt, width, height }) =>
      typeof src === "string" && src ? (
        // README images come from many hosts with unknown sizes, so they cannot go through next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      ) : null,
  };
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkAlerts]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSanitize,
          rehypeSlug,
          rehypeLabelLinks,
        ]}
        components={components}
        urlTransform={(url, key) =>
          repo
            ? resolveReadmeUrl(url, key === "src" ? "image" : "link", repo)
            : /^(https?:|mailto:|#|\/)/i.test(url)
              ? url
              : ""
        }
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
