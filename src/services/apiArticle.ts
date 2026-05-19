import type { InsertArticle } from "../types/Article.ts";
import { client } from "../utils/nenoHelper.ts";

const TABLE_NAME = "article";

export async function getArticles() {
  const { data, error } = await client.from(TABLE_NAME).select("*");

  if (error) {
    throw error;
  }
  console.log(data);
  return data;
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
