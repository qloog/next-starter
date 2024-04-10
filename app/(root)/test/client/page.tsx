"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return ( 
    <section className='flex justify-center items-center text-heading3 mt-10'>
      <UserInfo
        label="📱 Client component"
        user={user}
      />
    </section>
   );

}
 
export default ClientPage;