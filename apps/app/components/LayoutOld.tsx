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

      <main className="flex w-full flex-1 flex-col items-center justify-center px-12 text-center md:px-20">
        {children}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="ml-2">
            <Image
              height={16}
              width={70.75}
              src="/vercel.svg"
              alt="Vercel Logo"
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
