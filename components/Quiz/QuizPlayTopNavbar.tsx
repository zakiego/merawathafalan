import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

import LayoutTopNavbar from "../Layout/LayoutTopNavbar";

interface Props {
  title: string;
  href: string;
  questionNumber: number;
  amount: number;
}

export default function QuizPlayTopNavbar({
  title,
  href,
  amount,
  questionNumber,
}: Props) {
  return (
    <LayoutTopNavbar>
      <div className="z-20 flex items-center justify-between bg-primary">
        <Link href={href} passHref>
          <div className="w-1/5 cursor-pointer">
            <div className="btn-hover max-w-max">
              <HiArrowLeft className="h-6 w-6" />
            </div>
          </div>
        </Link>
        <div className="w-3/5 text-center text-lg font-semibold capitalize md:text-xl ">
          {title}
        </div>
        <div className="w-1/5 text-right">
          <span className="text-xl font-semibold">{questionNumber + 1}</span>
          <span className="opacity-70">/{amount}</span>
        </div>
      </div>
    </LayoutTopNavbar>
  );
}
