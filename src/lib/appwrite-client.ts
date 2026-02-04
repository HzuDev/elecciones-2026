import { Client, Databases, Storage, Account } from 'appwrite';


const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://appwrite.sociest.org/v1';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '6977a7f000062ad2847d';

if (!ENDPOINT || ENDPOINT === 'undefined') {
  console.error('Appwrite endpoint missing');
  throw new Error('Appwrite endpoint no configurado');
}

if (!PROJECT_ID || PROJECT_ID === 'undefined') {
  console.error('Appwrite project ID missing');
  throw new Error('Appwrite project ID no configurado');
}

console.log('🔌 Connecting to Appwrite:', { endpoint: ENDPOINT, projectId: PROJECT_ID });

const client = new Client();

client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

// Servicios
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// IDs de base de datos y colecciones
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '6977a82d000f96ceae0f';
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || '6977a8d8001f6558aa42';

// Colecciones
export const COLLECTIONS = {
  CANDIDATES: 'candidates',
  POLITICAL_PARTIES: 'political_parties',
  LOCATIONS: 'locations',
  SURVEYS: 'surveys',
  SURVEY_RESULTS: 'survey_results',
  CANDIDATES_DETAILS: 'candidates_details',
  POLLSTERS: 'pollsters',
};

// Funciones helper para archivos
export async function getFileUrl(fileId: string): Promise<string> {
  return storage.getFileView(BUCKET_ID, fileId).toString();
}

export async function uploadFile(
  file: File,
  userId: string
): Promise<{ fileId: string; url: string }> {
  const response = await storage.createFile(BUCKET_ID, 'unique()', file, [
    // Permisos: lectura pública, escritura solo para el usuario
    `read("any")`,
    `update("user:${userId}")`,
    `delete("user:${userId}")`,
  ]);

  return {
    fileId: response.$id,
    url: await getFileUrl(response.$id),
  };
}

// Función para generar permisos
export function generateDocumentPermissions(
  userId: string,
  options: { publicRead?: boolean; ownerWrite?: boolean } = {}
): string[] {
  const { publicRead = true, ownerWrite = true } = options;
  const permissions: string[] = [];

  if (publicRead) {
    permissions.push(`read("any")`);
  }

  if (ownerWrite) {
    permissions.push(`update("user:${userId}")`);
    permissions.push(`delete("user:${userId}")`);
  }

  return permissions;
}

// Crear documento con permisos
export async function createDocumentWithPermissions(
  collectionId: string,
  data: Record<string, any>,
  userId: string,
  permissionOptions?: { publicRead?: boolean; ownerWrite?: boolean }
) {
  const permissions = generateDocumentPermissions(userId, permissionOptions);

  return databases.createDocument(DATABASE_ID, collectionId, 'unique()', data, permissions);
}

// Ejecutar transacción (simulada)
export async function executeTransaction(
  operations: Array<() => Promise<any>>
): Promise<{ success: boolean; results: any[]; error?: string }> {
  const results = [];
  const executedOperations = [];

  try {
    for (const operation of operations) {
      const result = await operation();
      results.push(result);
      executedOperations.push(operation);
    }

    return { success: true, results };
  } catch (error) {
    // En caso de error, devolver rollback (Appwrite no soporta transacciones reales)
    console.error('Transaction failed:', error);
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Actualizar documento de forma segura
export async function updateDocumentSafe(
  collectionId: string,
  documentId: string,
  data: Record<string, any>,
  userId: string
) {
  // Verificar que el usuario es el propietario del documento
  const doc = await databases.getDocument(DATABASE_ID, collectionId, documentId);

  if (doc.created_by !== userId) {
    throw new Error('Unauthorized: You are not the owner of this document');
  }

  return databases.updateDocument(DATABASE_ID, collectionId, documentId, data);
}

// Eliminar documento de forma segura
export async function deleteDocumentSafe(
  collectionId: string,
  documentId: string,
  userId: string
) {
  // Verificar que el usuario es el propietario del documento
  const doc = await databases.getDocument(DATABASE_ID, collectionId, documentId);

  if (doc.created_by !== userId) {
    throw new Error('Unauthorized: You are not the owner of this document');
  }

  return databases.deleteDocument(DATABASE_ID, collectionId, documentId);
}

export { client };
