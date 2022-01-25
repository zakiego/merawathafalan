export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "https://docs.merawathafalan.my.id/",
    },
  };
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-900 md:text-2xl">
      <div className="m-auto text-center text-white/90">
        Move to{" "}
        <a
          href="https://docs.merawathafalan.my.id/"
          className="rounded-md bg-blue-800/70 py-1 px-2"
        >
          docs.merawathafalan.my.id
        </a>{" "}
        🚀
      </div>
    </div>
  );
}
