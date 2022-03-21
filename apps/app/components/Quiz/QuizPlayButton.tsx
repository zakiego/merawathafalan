import { playStatus } from "~/lib/playstatus";

interface Props {
  isButtonDisable: boolean;
  status: playStatus;
  buttonHandler(status: playStatus): void;
  isLoadingSubmit: boolean;
}

export default function QuizPlayButton({
  isButtonDisable,
  status,
  buttonHandler,
  isLoadingSubmit,
}: Props) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => buttonHandler(status)}
        disabled={isButtonDisable || isLoadingSubmit}
        className="btn-primary flex w-3/5 items-center justify-center py-2 text-center disabled:cursor-not-allowed disabled:opacity-70 "
      >
        <LoadingIcon isLoadingSubmit={isLoadingSubmit} />
        {textButton(status, isLoadingSubmit)}
      </button>
    </div>
  );
}

function textButton(status: playStatus, isLoadingSubmit: boolean) {
  if (isLoadingSubmit) {
    return "Loading...";
  }
  if (status == "check") {
    return "Cek";
  }
  if (status == "next") {
    return "Lanjutkan";
  }

  if (status == "finish") {
    return "Selesai";
  }
}

function LoadingIcon({ isLoadingSubmit }: { isLoadingSubmit: boolean }) {
  if (isLoadingSubmit) {
    return (
      <svg
        className="mr-3 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  }
  return <div />;
}
