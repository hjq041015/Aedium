import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUser } from "../utils/userHelper.ts";
import { authClient } from "../auth.ts";
import { toast } from "sonner";
import type { User } from "../types/User.ts";

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
  const [username, setUsername] = useState(user.name || "");

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

      const { data, error } = await authClient.updateUser({
        name: newName,
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

  return { isPending, handleUpdate, username, setUsername };
}
