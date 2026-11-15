/**
 * Image loader: returns local image paths unchanged, except in the
 * GitHub Pages preview build where NEXT_PUBLIC_BASE_PATH prefixes them
 * so they resolve under the /zuhayn subpath. Root builds (PC preview,
 * zuhayn.com) set no base path, so their URLs stay exactly as before.
 */
export default function imageLoader({ src }: { src: string }): string {
  if (!src.startsWith("/")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${src}`;
}
