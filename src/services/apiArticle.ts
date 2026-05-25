import type {
  ArticleDisplay,
  ArticleWithAuthorProfile,
  InsertArticle,
  UpdateArticle,
} from '@/types/Article.ts';

import { client } from '@/utils/nenoHelper.ts';

const TABLE_NAME = 'article';

export async function getArticles() {
  const { data, error } = await client.from('article_with_user_profile').select('*');

  if (error) {
    throw error;
  }
  return data.map((row) => mapToArticleDisplay(row));
}

export async function getArticleById(articleId: Number) {
  const { data, error } = await client
    .from('article_with_user_profile')
    .select('*')
    .eq('article_id', articleId)
    .single();

  if (error) {
    throw error;
  }
  return mapToArticleDisplay(data);
}

export async function InsertArticle(insertArcile: InsertArticle) {
  const { data, error } = await client.from(TABLE_NAME).insert(insertArcile).select();

  if (error) {
    throw error;
  }

  return data;
}

export async function UpdateArticle(updateArticle: UpdateArticle, articleId: Number) {
  const { data, error } = await client
    .from(TABLE_NAME)
    .update(updateArticle)
    .eq('id', articleId)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteArticleById(articleId: number) {
  const { error } = await client.from(TABLE_NAME).delete().eq('id', articleId);

  if (error) {
    throw error;
  }
}

function mapToArticleDisplay(row: ArticleWithAuthorProfile): ArticleDisplay {
  if (
    !row.article_id ||
    !row.author_id ||
    !row.title ||
    !row.content ||
    !row.create_at ||
    !row.update_at ||
    !row.name
  ) {
    throw new Error('Invalid article data');
  }
  return {
    id: row.article_id,
    author_id: row.author_id,
    title: row.title,
    content: row.content,
    create_at: row.create_at,
    update_at: row.update_at,
    author: {
      name: row.name,
      image: row.image ?? null,
    },
  };
}
