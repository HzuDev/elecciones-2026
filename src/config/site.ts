// Configuración del sitio para GitHub Pages
export const BASE_PATH = import.meta.env.BASE_URL || '/elecciones-2026';

// Helper para construir rutas con el base path
export function getPath(path: string): string {
  // Normalizar el base path (quitar trailing slash si existe)
  const basePath = BASE_PATH.endsWith('/') && BASE_PATH !== '/' ? BASE_PATH.slice(0, -1) : BASE_PATH;
  
  // Asegurar que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Asegurar que termine con / (para trailingSlash)
  const pathWithSlash = normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
  
  // Si basePath es '/', retornar solo el path
  return basePath === '/' ? pathWithSlash : `${basePath}${pathWithSlash}`;
}
