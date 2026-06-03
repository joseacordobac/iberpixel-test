import componentsData from '../metadata/components.json';

export async function getAllComponents() {
  return componentsData;
}

export function getComponentConfig(type: 'atoms' | 'molecules', componentName: string) {
  return (componentsData as any)[type]?.[componentName] || null;
}
