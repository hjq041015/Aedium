import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

import "@blocknote/core/fonts/inter.css";
import styles from "./ArticleEditor.module.css";
import RequireEmailVerify from "./RequireEmailVerify.tsx";
import { useDraft } from "../hooks/draft.ts";
import { useEditor } from "../hooks/editor.ts";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { isEditorEmpty } from "../utils/editorHelper.ts";
import { editorPublishSignalAtom } from "../atoms/editor.ts";
import { userAtom } from "../atoms/user.ts";
import { usePublishArticle } from "../hooks/article.ts";
import { toast } from "sonner";

function ArticleEditor() {
  const { draft, setDraft, saveDraft } = useDraft();
  const { editor, handleEditorChange, resetEditor } = useEditor(
    draft,
    setDraft,
    saveDraft,
  );
  const user = useAtomValue(userAtom);

  const [editorPublishSignal, setEditorPublishSignal] = useAtom(
    editorPublishSignalAtom,
  );

  const { handlePublish } = usePublishArticle(user, editor);

  useEffect(() => {
    if (user && editorPublishSignal && !isEditorEmpty(editor.document)) {
      handlePublish(
        {},
        {
          onSuccess: () => {
            toast.success("Article published successfully", {
              position: "top-center",
              richColors: true,
            });
            resetEditor();
            setEditorPublishSignal(0);
          },
        },
      );
    }
  }, [editorPublishSignal]);

  return (
    <RequireEmailVerify>
      <BlockNoteView
        onChange={handleEditorChange}
        className={styles.editor}
        editor={editor}
      />
    </RequireEmailVerify>
  );
}

export default ArticleEditor;
