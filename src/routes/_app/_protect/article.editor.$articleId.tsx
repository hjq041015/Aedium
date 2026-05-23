import { createFileRoute } from '@tanstack/react-router';

import ArticleUpdate from '@/features/article/ArticleUpdate';

export const Route = createFileRoute('/_app/_protect/article/editor/$articleId')({
  component: ArticleUpdate,
});
