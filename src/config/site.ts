// Configuración del sitio para GitHub Pages
export const BASE_PATH = import.meta.env.BASE_URL || '/elecciones-2026';

// Helper para construir rutas con el base path
export function getPath(path: string): string {
  // Asegurar que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // Asegurar que termine con / (para trailingSlash)
  const pathWithSlash = normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
  // Si BASE_PATH es '/', no lo concatenamos
  return BASE_PATH === '/' ? pathWithSlash : `${BASE_PATH}${pathWithSlash}`;
}
