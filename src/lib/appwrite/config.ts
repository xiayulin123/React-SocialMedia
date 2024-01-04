import {Client, Account, Databases, Storage, Avatars} from 'appwrite';


export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
    postId: import.meta.env.VITE_APPWRITE_POSTS,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE,
    saveId: import.meta.env.VITE_APPWRITE_SAVES,
    postCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS,
}
// console.log("here is the id:     ",appwriteConfig.projectId)
export const client = new Client();

client.setProject(appwriteConfig.projectId!);
client.setEndpoint(appwriteConfig.url!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
