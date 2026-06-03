import colorsData from '../metadata/colors.json';

export async function getColors() {
  return colorsData;
}

export function getColor(shade: string, palette = 'primary') {
  return (colorsData as any)[palette]?.[shade] || null;
}
