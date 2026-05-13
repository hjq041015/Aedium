import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

import "@blocknote/core/fonts/inter.css";
import styles from "./ArticleEditor.module.css";
import RootLayout from "./RootLayout";
import RequireLogin from "./RequireLogin.tsx";
import RequireEmailVerify from "./RequireEmailVerify.tsx";
import { useDraft } from "../hooks/draft.ts";
import { useEffect } from "react";
import { debounce } from "es-toolkit";

function ArticleEditor() {
  const { draft, setDraft } = useDraft();

  const editor = useCreateBlockNote({
    autofocus: true,
    initialContent: draft,
  });

  const saveDraft = debounce((document) => {
    setDraft(document);
  }, 1000);

  useEffect(() => {
    return () => {
      saveDraft.flush();
      saveDraft.cancel();
    };
  });

  return (
    <RequireLogin>
      <RequireEmailVerify>
        <RootLayout>
          <BlockNoteView
            onChange={() => saveDraft(editor.document)}
            className={styles.editor}
            editor={editor}
          />
        </RootLayout>
      </RequireEmailVerify>
    </RequireLogin>
  );
}

export default ArticleEditor;
