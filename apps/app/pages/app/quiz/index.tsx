import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/app/quiz/mode-quiz",
    },
  };
};

export default function QuizIndex() {
  return <div />;
}
