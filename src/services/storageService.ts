import { storage, STORAGE_BUCKETS } from '../config/appwrite';
import { ID } from 'node-appwrite';
import { UploadedFile } from 'express-fileupload';

export class StorageService {
    async uploadFile(bucketId: string, file: UploadedFile) {
        try {
            const upload = await storage.createFile(
                bucketId,
                ID.unique(),
                new File([file.data], file.name)
            );
            return storage.getFileView(bucketId, upload.$id);
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async deleteFile(bucketId: string, fileId: string) {
        try {
            await storage.deleteFile(bucketId, fileId);
            return true;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    async getFilePreview(bucketId: string, fileId: string) {
        try {
            return storage.getFilePreview(bucketId, fileId);
        } catch (error) {
            console.error('Error getting file preview:', error);
            throw error;
        }
    }
} 