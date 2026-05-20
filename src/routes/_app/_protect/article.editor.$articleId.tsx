import ArticleUpdate from "@/features/article/ArticleUpdate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/_protect/article/editor/$articleId",
)({
  component: ArticleUpdate,
});
