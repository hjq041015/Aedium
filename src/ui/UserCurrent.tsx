import { userAtom } from "@/atoms/user.ts";
import type { Article } from "@/types/Article.ts";
import { useAtomValue } from "jotai";

function UserCurrent({children,article}: {
    children: React.ReactNode,
    article: Article | undefined
}) {

    const user = useAtomValue(userAtom);

    if(!user || article?.author_id !== user.id) {
        return null;
    }
    
return children;
}
export default UserCurrent;
