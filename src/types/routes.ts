import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Models } from 'node-appwrite';

export interface FileAuthRequest extends Request {
    files?: {
        [key: string]: UploadedFile;
    };
    user?: Models.User<Models.Preferences>;
} 