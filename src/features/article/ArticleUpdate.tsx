import { editorUpdateSignalAtom } from "@/atoms/editor.ts";
import ArticleEditorView from "@/features/article/ArticleEditorView";
import Loading from "@/ui/Loading";
import { useCurrentArticle, useUpdateArticle } from "@/hooks/article.ts";
import { Route as ArticleEditorRoute } from "@/routes/_app/_protect/article.editor.$articleId.tsx";
import { isEditorEmpty } from "@/utils/editorHelper.ts";
import { useCreateBlockNote } from "@blocknote/react";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";

function ArticleUpdate() {
  const navigate = useNavigate();
  const { articleId } = ArticleEditorRoute.useParams();
  const editor = useCreateBlockNote();
  const { article, isLoading } = useCurrentArticle(articleId);
  const [editorUpdateSignal, setEditorUpdateSignal] = useAtom(
    editorUpdateSignalAtom,
  );
  const { handleUpdate } = useUpdateArticle();

  useEffect(() => {
    if (!isLoading && editorUpdateSignal && !isEditorEmpty(editor.document)) {
      handleUpdate(
        { articleId, editor },
        {
          onSuccess: () => {
            setEditorUpdateSignal(0);
            navigate({ to: "/article/$articleId", params: { articleId } });
          },
        },
      );
    }
  }, [editorUpdateSignal]);

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
