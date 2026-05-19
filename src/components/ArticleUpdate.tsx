import ArticleEditorView from "@/components/ArticleEditorView.tsx";
import Loading from "@/components/Loading.tsx";
import { useCurrentArticle } from "@/hooks/article.ts";
import { Route as ArticleEditorRoute } from "@/routes/_app/_protect/article.editor.$articleId.tsx";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

function ArticleUpdate() {
  const { articleId } = ArticleEditorRoute.useParams();
  const editor = useCreateBlockNote();
  const { article, isLoading } = useCurrentArticle(articleId);

  useEffect(() => {
    editor.replaceBlocks(editor.document, [
      { type: "heading", content: article.title, level: 1 },
      ...JSON.parse(article.content),
    ]);
  }, [article]);

  if (isLoading) {
    return <Loading />;
  }

  return <ArticleEditorView editor={editor} />;
}
export default ArticleUpdate;
