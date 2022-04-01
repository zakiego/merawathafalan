import Link from "next/link";
import LayoutOld from "~/components/LayoutOld";
import SEO from "~/components/SEO/SEO";

export default function Index() {
  return (
    <LayoutOld>
      <SEO />
      <Link href="/app">
        <a className="rounded-lg bg-gray-800 px-4 py-1.5 text-white hover:bg-gray-700">
          Login
        </a>
      </Link>
    </LayoutOld>
  );
}
