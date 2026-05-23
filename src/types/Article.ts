import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.ts';

export type InsertArticle = TablesInsert<'article'>;

export type UpdateArticle = TablesUpdate<'article'>;

export type Article = Tables<'article'>;
