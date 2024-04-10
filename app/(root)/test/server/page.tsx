import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth';

export default async function Home() {
  const user = await currentUser();

  return (
    <section className='flex justify-center items-center text-heading3 mt-10'>
      <UserInfo
        label="💻 Server component"
        user={user}
      />
    </section>
  );
}
