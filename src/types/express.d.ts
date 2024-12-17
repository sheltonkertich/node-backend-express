import { Models } from 'node-appwrite';

declare global {
    namespace Express {
        interface Request {
            user?: Models.User<Models.Preferences>;
        }
    }
} 