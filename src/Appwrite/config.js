import { appwriteUrl, projectId } from './appwriteid'
import { Account, Client, Databases } from 'appwrite'


//Creating Client
export const client = new Client().setEndpoint(appwriteUrl).setProject(projectId)

//Creating Account For Client
export const account = new Account(client)

//Creating Database 
export const database = new Databases(client)

