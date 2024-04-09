import { useSession } from "next-auth/react";

// only use for client model
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};