export const formatDriveImageUrl = (url: string): string => {
  if (!url) return '';
  
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  
  const viewMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (viewMatch && viewMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${viewMatch[1]}`;
  }
  
  return url;
};

export const isGoogleDriveUrl = (url: string): boolean => {
  return url.includes('drive.google.com');
};