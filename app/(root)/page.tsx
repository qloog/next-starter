import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from '@/components/ui/button'

import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth';

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="container relative">
      <PageHeader className="max-w-4xl">
        <PageHeaderHeading className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create anything
        </PageHeaderHeading>
        <PageHeaderHeading className="">
        you can imagine with AI on your side
        </PageHeaderHeading>
        <PageHeaderDescription>
          AIGC is a new way to create, edit, collaborate and share.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
            <a href="/">Browse</a>
          </Button>
          <Button asChild variant="default" className='bg-indigo-500'>
            <a
              href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
              target="_blank"
            >
              Request a block
            </a>
          </Button>
        </PageActions>
      </PageHeader>
      <section className='flex justify-center items-center text-heading3 mt-10'>
        Main Content
      </section>
    </div>
  );
}
