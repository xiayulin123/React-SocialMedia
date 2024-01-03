import { INewUser } from "@/types";
import {ID, Query} from 'appwrite'
import { account, appwriteConfig, avatars, databases } from "./config";
export async function createUserAccount(user: INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if(!newAccount){
            throw Error;
        }
        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}){
    try {
        // console.log(user.email," here is the mail")
        // console.log(user," here is the user")

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: {
    email: string;
    password: string;
}){
    try {
        const session = await account.createEmailSession(user.email, user.password);
        console.log(session)
        return session;


    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        console.log(currentAccount, "here is current account")
        console.log("information  ", appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,)
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        console.log("listed documents", currentUser)
        
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export async function signOutAccount(){
    try {
       const session = await account.deleteSession("current")
       return session;
    } catch (error) {
        console.log(error)
    }
}