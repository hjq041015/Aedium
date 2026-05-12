import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUser } from "../utils/userHelper.ts";
import { authClient } from "../auth.ts";
import { toast } from "sonner";

export function useUserInfo() {
    const [username, setUsername] = useState("");

  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUser();
      if (!user) {
        throw new Error("No user found");
      }
      setUsername(user.name);
      return user;
    },
  });

  const { isPending, mutate: handleUpdate } = useMutation({
    mutationFn: async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (username.trim() === "") {
        throw new Error("Username can not be empty");
      }
      const { data, error } = await authClient.updateUser({
        name: username,
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

  return { user, isLoading, username, setUsername, handleUpdate, isPending };
}