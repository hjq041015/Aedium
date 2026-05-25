import { useCreateBlockNote } from '@blocknote/react';
import { BookmarksIcon, NotePencilIcon, ThumbsUpIcon, TrashIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import ArticleEditorView from '@/features/article/ArticleEditorView';
import { useCurrentArticle, useDeleteArticle } from '@/hooks/article.ts';
import { Route as ArticleRoute } from '@/routes/_app/article.$articleId.tsx';
import Avatar from '@/ui/Avatar.tsx';
import Loading from '@/ui/Loading';
import UserCurrent from '@/ui/UserCurrent.tsx';

function ArticleDetails() {
  const editor = useCreateBlockNote();
  const { articleId } = ArticleRoute.useParams();
  const { articleDisplay, isLoading } = useCurrentArticle(articleId);
  const { handleDelete, isDeleteing } = useDeleteArticle();
  const navigate = useNavigate();

  useEffect(() => {
    if (articleDisplay) {
      editor.replaceBlocks(editor.document, JSON.parse(articleDisplay.content));
    }
  }, [articleDisplay]);

  const articleUpdateTime = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (isLoading || !articleDisplay) return <Loading />;

  return (
    <>
      <h1 className="text-center text-7xl mb-8 mt-8 font-serif">{articleDisplay.title}</h1>

      <div className="flex justify-center items-center gap-4">
        <Avatar
          avatarUrl={articleDisplay.author.image ?? ''}
          username={articleDisplay.author.name}
        />
        <div>
          <div className="text-4xl">{articleDisplay.author.name}</div>
          <div className="opacity-50">
            {articleUpdateTime.format(new Date(articleDisplay.update_at))}
          </div>
        </div>
      </div>

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
          <UserCurrent article={articleDisplay}>
            <li>
              <Link
                to="/article/editor/$articleId"
                params={{ articleId }}
                className="tooltip"
                data-tip="Edit"
              >
                <NotePencilIcon size={24} />
              </Link>
            </li>
          </UserCurrent>
          <UserCurrent article={articleDisplay}>
            <li>
              <button
                onClick={() =>
                  handleDelete(
                    { articleId: articleId },
                    {
                      onSuccess: () => navigate({ to: '/' }),
                    },
                  )
                }
                disabled={isDeleteing}
                className="tooltip"
                data-tip="Delete"
              >
                <TrashIcon size={24} />
              </button>
            </li>
          </UserCurrent>
        </ul>
      </div>
      <div className="divider"></div>

      <ArticleEditorView editor={editor} editable={false} />
    </>
  );
}
export default ArticleDetails;
