export default async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "https://docs.merawathafalan.my.id/",
    },
  };
}
