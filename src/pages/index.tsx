import { useUser, SignUp, SignOutButton, SignInButton } from "@clerk/nextjs";
import Head from "next/head";
import PostsContainer from "~/components/organisms/PostsContainerOrganism";
import CreatePost from "~/components/CreatePost";

export default function Home() {
  const user = useUser();  
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen">
        <div className="border-x w-full md:max-w-2xl border-slate-700 h-full">
          <div className="border-b border-slate-700 p-4">
            { user ? <SignOutButton /> : <SignInButton /> }
            <CreatePost />
          </div>
          <div className="flex flex-col">
            <PostsContainer />
          </div>
        </div>
      </main>
    </>
  );
}
