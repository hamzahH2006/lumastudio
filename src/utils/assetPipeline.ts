const UPLOAD_URL = '/__luma/upload';

export type AssetKind = 'icons' | 'screenshots' | 'binaries';

const mimeExtension = (content: string): string => {
  const match = content.match(/^data:([^;,]+);/);
  if (!match) return '.bin';
  const mime = match[1];
  if (mime.includes('svg')) return '.svg';
  if (mime.includes('png')) return '.png';
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('jpeg') || mime.includes('jpg')) return '.jpg';
  if (mime.includes('gif')) return '.gif';
  if (mime.includes('zip')) return '.zip';
  if (mime.includes('apk')) return '.apk';
  if (mime.includes('x-msdos') || mime.includes('dll') || mime.includes('ms-dos')) return '.exe';
  return '.bin';
};

// Uploads a single data-URL (or already-public /apps/... path) into the app's
// GitHub-style asset folder under public/apps/<slug>/<kind>/. Any string that
// is not an uploadable local payload (remote URLs, /apps/ paths) is returned
// untouched. Falls back to the original content when the dev pipeline is
// unavailable (e.g. static hosting), so the site keeps working everywhere.
export const uploadLumaAsset = async (
  slug: string,
  kind: AssetKind,
  filename: string,
  content: string
): Promise<string> => {
  if (!content.startsWith('data:')) return content;

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, folder: kind, filename, content }),
    });
    if (!res.ok) return content;
    const json = await res.json();
    return json && json.ok && json.url ? json.url : content;
  } catch {
    return content;
  }
};

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

export const iconFilename = (slug: string, content: string): string =>
  `icon-${slug}${mimeExtension(content)}`;

export const screenshotFilename = (index: number, content: string): string =>
  `screen-${index + 1}-${Date.now()}${mimeExtension(content)}`;