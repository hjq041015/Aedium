import { useCreateBlockNote } from "@blocknote/react";
import { useQuery } from "@tanstack/react-query";
import ArticleEditorView from "@/components/ArticleEditorView.tsx";
import Loading from "@/components/Loading.tsx";
import { Route as ArticleRoute } from "@/routes/_app/article.$articleId.tsx";
import { getArticleById } from "@/services/apiArticle.ts";
import {
  BookmarksIcon,
  NotePencilIcon,
  ThumbsUpIcon,
  TrashIcon,
} from "@phosphor-icons/react";

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
      <h1 className="text-center text-7xl mb-8 mt-8 font-serif">
        {article?.title}
      </h1>

      <div className="divider"></div>
      <div className="flex justify-center">
        <ul className="menu menu-horizontal  rounded-box mt-6">
          <li>
            <a className="tooltip" data-tip="Like">
              <ThumbsUpIcon size={24} />
            </a>
          </li>
          <li>
            <a className="tooltip" data-tip="Bookmark">
              <BookmarksIcon size={24} />
            </a>
          </li>
          <li>
            <a className="tooltip" data-tip="Edit">
              <NotePencilIcon size={24} />
            </a>
          </li>
          <li>
            <a className="tooltip" data-tip="Delete">
              <TrashIcon size={24} />
            </a>
          </li>
        </ul>
      </div>
      <div className="divider"></div>

      <ArticleEditorView editor={editor} editable={false} />
    </>
  );
}
export default ArticleDetails;
