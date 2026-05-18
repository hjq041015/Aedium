import type { PartialBlock } from "@blocknote/core";
import { en } from "@blocknote/core/locales";
import { useCreateBlockNote } from "@blocknote/react";
import { isEditorEmpty } from "../utils/editorHelper.ts";
import { EDITOR_DEFAULT } from "../constants/editor.ts";
import { useAtomValue, useSetAtom } from "jotai";
import { editorEmptySignalAtom, isEditorEmptyAtom } from "../atoms/editor.ts";
import type { DebouncedFunction } from "es-toolkit";
import { useEffect } from "react";

export function useEditor(
  draft: PartialBlock[] | undefined,
  setDraft: (draft: PartialBlock[]) => void,
  saveDraft: DebouncedFunction<(document: any) => void>,
) {
  const locale = en;
  let isRestoring = false;
  const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom);
  const isEditorEmptySignal = useAtomValue(editorEmptySignalAtom);

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

  function resetEditor() {
    setDraft(EDITOR_DEFAULT);
    setIsEditorEmpty(true);
    editor.replaceBlocks(editor.document, EDITOR_DEFAULT);
    saveDraft.cancel();
  }

  // Reset editor
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

  // discard draft
  useEffect(() => {
    if (isEditorEmptySignal) {
      resetEditor();
    }
  }, [isEditorEmptySignal]);

  function handleEditorChange(editorChange: typeof editor) {
    if (isRestoring) {
      isRestoring = false;
      return;
    }
    if (isEditorEmpty(editorChange.document)) {
      isRestoring = true;
      resetEditor();
      return;
    }
    saveDraft(editorChange.document);
  }

  return { editor, handleEditorChange, resetEditor };
}
