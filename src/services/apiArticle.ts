import { client } from "../utils/nenoHelper.ts";

export async function getArticles() {
  const { data, error } = await client.from("article").select("*");

  if (error) {
    throw error;
  }
  console.log(data);
  return data;
}
