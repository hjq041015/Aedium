import type { InsertArticle, UpdateArticle } from "@/types/Article.ts";
import { client } from "@/utils/nenoHelper.ts";

const TABLE_NAME = "article";

export async function getArticles() {
  const { data, error } = await client.from(TABLE_NAME).select("*");

  if (error) {
    throw error;
  }
  return data;
}

export async function getArticleById(articleId: Number) {
  const { data, error } = await client.from(TABLE_NAME).select("*").eq("id", articleId);

  if (error) {
    throw error;
  }
  return data[0];
}

export async function InsertArticle(insertArcile: InsertArticle) {
  const { data, error } = await client
    .from(TABLE_NAME)
    .insert(insertArcile)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function UpdateArticle(updateArticle: UpdateArticle, articleId: Number) {
  const { data, error } = await client
    .from(TABLE_NAME)
    .update(updateArticle)
    .eq("id", articleId)
    .select();

  if (error) {
    throw error;
  }

  return data;
}


