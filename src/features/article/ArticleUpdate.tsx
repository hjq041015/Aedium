import { useCreateBlockNote } from '@blocknote/react';
import { useBlocker, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { editorUpdateSignalAtom } from '@/atoms/editor.ts';
import ArticleEditorView from '@/features/article/ArticleEditorView';
import { useCurrentArticle, useUpdateArticle } from '@/hooks/article.ts';
import { Route as ArticleEditorRoute } from '@/routes/_app/_protect/article.editor.$articleId.tsx';
import Loading from '@/ui/Loading';
import { buildArticleInsert, isEditorEmpty } from '@/utils/editorHelper.ts';

function ArticleUpdate() {
  const navigate = useNavigate();
  const { articleId } = ArticleEditorRoute.useParams();
  const editor = useCreateBlockNote();
  const { article, isLoading } = useCurrentArticle(articleId);
  const [editorUpdateSignal, setEditorUpdateSignal] = useAtom(editorUpdateSignalAtom);
  const { handleUpdate } = useUpdateArticle();
  const initalArticle = useRef<null | string>(null);
  const dirty = useRef(false);

  function handleEditorChange() {
    if (!article && !initalArticle.current) {
      return;
    }

    const currentArticleData = buildArticleInsert(editor, articleId);
    const currentArticle = JSON.stringify({
      title: currentArticleData.title,
      content: currentArticleData.content,
    });
    dirty.current = currentArticle !== initalArticle.current;
  }

  useEffect(() => {
    if (!isLoading && editorUpdateSignal && !isEditorEmpty(editor.document)) {
      handleUpdate(
        { articleId, editor },
        {
          onSuccess: () => {
            setEditorUpdateSignal(0);
            dirty.current = false;
            navigate({ to: '/article/$articleId', params: { articleId } });
          },
        },
      );
    }
  }, [editorUpdateSignal]);

  useEffect(() => {
    editor.replaceBlocks(editor.document, [
      { type: 'heading', content: article.title, level: 1 },
      ...JSON.parse(article.content),
    ]);
    if (!isLoading && article) {
      initalArticle.current = JSON.stringify({
        title: article.title,
        content: article.content,
      });
    }
  }, [article, isLoading]);

  useBlocker({
    shouldBlockFn: () => {
      if (!dirty.current) {
        return false;
      }
      const shouldBlock = !window.confirm(
        'You have unsaved changes. Are you sure you want to leave?',
      );

      return shouldBlock;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return <ArticleEditorView editor={editor} onChange={handleEditorChange} />;
}

export default ArticleUpdate;
