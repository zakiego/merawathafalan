import Head from "next/head";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutOld({ children }: LayoutProps) {
  return (
    <div className="vercel flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-7 text-center md:px-20">
        {children}
      </main>
    </div>
  );
}
