import spacingData from '../metadata/spacing.json';

export async function getSpacing() {
  return spacingData;
}

export function getSpacingUnit(unitKey: string) {
  return (spacingData as any).units?.[unitKey] || null;
}
