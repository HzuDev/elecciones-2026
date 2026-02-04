import { useCallback } from 'react';
import { databases, DATABASE_ID } from '../lib/appwrite-client';
import type { Models } from 'appwrite';

interface UseCollectionResult<T> {
  listDocuments: (queries?: string[]) => Promise<T[]>;
  getDocument: (documentId: string) => Promise<T>;
  createDocument: (data: Partial<T>, documentId?: string) => Promise<T>;
  updateDocument: (documentId: string, data: Partial<T>) => Promise<T>;
  deleteDocument: (documentId: string) => Promise<void>;
}

export function useCollection<T extends Models.Document>(
  collectionId: string
): UseCollectionResult<T> {
  const listDocuments = useCallback(
    async (queries: string[] = []) => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          collectionId,
          queries
        );
        return response.documents as unknown as T[];
      } catch (error) {
        console.error(`Error listing documents from ${collectionId}:`, error);
        throw error;
      }
    },
    [collectionId]
  );

  const getDocument = useCallback(
    async (documentId: string) => {
      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          collectionId,
          documentId
        );
        return response as unknown as T;
      } catch (error) {
        console.error(`Error getting document ${documentId}:`, error);
        throw error;
      }
    },
    [collectionId]
  );

  const createDocument = useCallback(
    async (data: Partial<T>, documentId: string = 'unique()') => {
      try {
        const response = await databases.createDocument(
          DATABASE_ID,
          collectionId,
          documentId,
          data as any
        );
        return response as unknown as T;
      } catch (error) {
        console.error(`Error creating document in ${collectionId}:`, error);
        throw error;
      }
    },
    [collectionId]
  );

  const updateDocument = useCallback(
    async (documentId: string, data: Partial<T>) => {
      try {
        const response = await databases.updateDocument(
          DATABASE_ID,
          collectionId,
          documentId,
          data as any
        );
        return response as unknown as T;
      } catch (error) {
        console.error(`Error updating document ${documentId}:`, error);
        throw error;
      }
    },
    [collectionId]
  );

  const deleteDocument = useCallback(
    async (documentId: string) => {
      try {
        await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
      } catch (error) {
        console.error(`Error deleting document ${documentId}:`, error);
        throw error;
      }
    },
    [collectionId]
  );

  return {
    listDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
  };
}
