import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

import "@blocknote/core/fonts/inter.css";
import styles from "./ArticleEditor.module.css";
import RequireEmailVerify from "./RequireEmailVerify.tsx";
import { useDraft } from "../hooks/draft.ts";
import { useEffect } from "react";
import { isEditorEmpty } from "../utils/editorHelper.ts";
import { editorEmptySignalAtom, isEditorEmptyAtom } from "../atoms/editor.ts";
import { EDITOR_DEFAULT } from "../constants/editor.ts";
import { useAtomValue, useSetAtom } from "jotai";
import { useEditor } from "../hooks/editor.ts";

function ArticleEditor() {
  const { draft, setDraft, saveDraft } = useDraft();
  const { editor, handleEditorChange } = useEditor(draft, setDraft, saveDraft);

  const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom);
  const isEditorEmptySignal = useAtomValue(editorEmptySignalAtom);

  useEffect(() => {
    if (!isEditorEmpty(editor.document)) {
      setIsEditorEmpty(false);
      return;
    }
    return () => {
      saveDraft.flush();
      saveDraft.cancel();
    };
  }, []);

  useEffect(() => {
    if (isEditorEmptySignal) {
      setDraft(EDITOR_DEFAULT);
      editor.replaceBlocks(editor.document, EDITOR_DEFAULT);
    }
  }, [isEditorEmptySignal]);

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
