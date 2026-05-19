import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useQuery } from "@tanstack/react-query";
import { Route as ArticleRoute } from "../routes/_app/article.$articleId.tsx";
import { getArticleById } from "../services/apiArticle.ts";
import Loading from "./Loading.tsx";

function ArticleDetails() {
  const editor = useCreateBlockNote();
  const { articleId } = ArticleRoute.useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const article = await getArticleById(Number(articleId));
      editor.replaceBlocks(editor.document, JSON.parse(article.content));
      return article;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 className="text-center text-7xl font-serif">{article?.title}</h1>
      <BlockNoteView editor={editor} editable={false} />
    </>
  );
}
export default ArticleDetails;
