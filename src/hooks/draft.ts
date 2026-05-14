const DRAFT_KEY = "draft";
import { useLocalStorage } from "react-use";
import type { PartialBlock } from "@blocknote/core";

export function useDraft() {
  const [draft, setDraft] = useLocalStorage<PartialBlock[]>(DRAFT_KEY, [
    {
      type: "paragraph",
      content: "",
    },
  ]);

  return { draft, setDraft };
}
