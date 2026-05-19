import type { Tables, TablesInsert } from "./database.ts";

export type InsertArticle = TablesInsert<'article'>

export type Article = Tables<'article'>