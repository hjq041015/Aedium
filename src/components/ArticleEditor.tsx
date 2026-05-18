import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

import "@blocknote/core/fonts/inter.css";
import styles from "./ArticleEditor.module.css";
import RequireEmailVerify from "./RequireEmailVerify.tsx";
import { useDraft } from "../hooks/draft.ts";
import { useEffect } from "react";
import { debounce } from "es-toolkit";
import { isEditorEmpty } from "../utils/editorHelper.ts";
import { editorEmptySignalAtom, isEditorEmptyAtom } from "../atoms/editor.ts";
import { EDITOR_DEFAULT } from "../constants/editor.ts";
import { useAtomValue, useSetAtom } from "jotai";
import { en } from "@blocknote/core/locales";

function ArticleEditor() {
  const { draft, setDraft } = useDraft();
  const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom);
  const isEditorEmptySignal = useAtomValue(editorEmptySignalAtom);
  const locale = en;

  const editor = useCreateBlockNote({
    autofocus: true,
    initialContent: draft,

    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        // We override the default placeholder
        default: "Tell your story",
        // We override the heading placeholder
        heading: "Your title of story",
      },
    },
  });

  const saveDraft = debounce((document) => {
    if (isEditorEmpty(document)) {
      setDraft(EDITOR_DEFAULT);
      setIsEditorEmpty(true);
      return;
    }
    setDraft(document);
    setIsEditorEmpty(false);
  }, 500);

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

  function handleEditorChange(editorChange: typeof editor) {
    if (isEditorEmpty(editorChange.document)) {
      setDraft(EDITOR_DEFAULT);
      setIsEditorEmpty(true);
    }
    saveDraft(editorChange.document);
  }

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
