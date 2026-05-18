import { useLocalStorage } from "react-use";
import type { PartialBlock } from "@blocknote/core";
import { EDITOR_DEFAULT } from "../constants/editor.ts";
import { debounce } from "es-toolkit";
import { isEditorEmpty } from "../utils/editorHelper.ts";
import { useSetAtom } from "jotai";
import { isEditorEmptyAtom } from "../atoms/editor.ts";

const DRAFT_KEY = "draft";

export function useDraft() {
  const [draft, setDraft] = useLocalStorage<PartialBlock[]>(
    DRAFT_KEY,
    EDITOR_DEFAULT,
  );

  const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom);

  const saveDraft = debounce((document) => {
    if (isEditorEmpty(document)) {
      setDraft(EDITOR_DEFAULT);
      setIsEditorEmpty(true);
      return;
    }
    setDraft(document);
    setIsEditorEmpty(false);
  }, 500);

  return { draft, setDraft, saveDraft };
}
