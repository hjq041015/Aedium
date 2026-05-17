import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUser } from "../utils/userHelper.ts";

import { toast } from "sonner";
import type { User } from "../types/User.ts";
import { useUploadUserAvatar } from "./userAvatar.ts";
import { authClient } from "../utils/nenoHelper.ts";

export function useUserInfo() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUser();
      if (!user) {
        throw new Error("No user found");
      }
      return user;
    },
  });

  return { user, isLoading };
}

export function useUserUpdate(user: User, currentAvatarFile: File | null) {
  const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const [username, setUsername] = useState(user.name || "");
  const { isUploading, uploadAvatar } = useUploadUserAvatar(
    currentAvatarFile,
    user.id,
  );

  const queryClient = useQueryClient();

  const { isPending, mutate: handleUpdate } = useMutation({
    mutationFn: async () => {
      let newName = "";
      let newAvatarUrl = "";
      if (!username.length) {
        throw new Error("Username can not be empty");
      }

      if (username !== user.name) {
        newName = username;
      }

      if (!newName && !currentAvatarFile) {
        throw new Error("No changes found");
      }

      if (currentAvatarFile) {
        const updateAvatar = await uploadAvatar();
        newAvatarUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${updateAvatar.fullPath}`;
      }

      const { data, error } = await authClient.updateUser({
        ...(newName && { name: newName }),
        ...(newAvatarUrl && { image: newAvatarUrl }),
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Username updated successfully", {
        position: "top-center",
        richColors: true,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        richColors: true,
      });
    },
  });

  return { isPending, handleUpdate, username, setUsername, isUploading };
}
