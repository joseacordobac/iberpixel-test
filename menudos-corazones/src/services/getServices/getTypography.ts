import typographyData from '../metadata/typography.json';

export async function getTypography() {
  return typographyData;
}

export function getFontFamily(fontKey: string) {
  return (typographyData as any).fonts?.[fontKey] || null;
}

export function getFontSize(sizeKey: string) {
  return (typographyData as any).sizes?.[sizeKey] || null;
}
