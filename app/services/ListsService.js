import { DataStore } from "./ApiService";

const dbName = "lists-app";

export const ListsService = new DataStore(dbName);
