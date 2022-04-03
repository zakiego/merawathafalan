import Link from "next/link";
import LayoutOld from "~/components/LayoutOld";
import SEO from "~/components/SEO/SEO";

export default function Index() {
  return (
    <LayoutOld>
      <SEO />
      <h1 className="text-2xl font-bold">Aplikasi masih tahap pengembangan</h1>
      <p className="mt-8">
        Sehingga akan ditemui beberapa <span className="italic">error</span>{" "}
        atau fitur yang belum berfungsi dengan baik. Silahkan sampaikan{" "}
        <span className="italic">error</span> tersebut kepada pihak pengembang
        agar bisa diperbaiki.
      </p>

      <p className="mt-4">Terima kasih sudah bersedia mencoba!</p>

      <Link href="/app">
        <a className="mt-7 rounded-lg bg-gray-800 px-4 py-1.5 text-white hover:bg-gray-700">
          Klik di sini untuk login
        </a>
      </Link>
    </LayoutOld>
  );
}
