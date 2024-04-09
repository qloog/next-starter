import { auth } from "@/auth"

// only use for server components
export const currentUser = async () => {
  const session = await auth()

  return session?.user
}

// export const currentRole = async () => {
//   const session = await auth()

//   return session?.user?.role;
// }