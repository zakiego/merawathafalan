import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

import LayoutTopNavbar from "../Layout/LayoutTopNavbar";

interface Props {
  title: string;
  href: string;
}

export default function QuizTopNavbar({ title, href }: Props) {
  return (
    <LayoutTopNavbar>
      <div className="flex items-center justify-between">
        <Link href={href} passHref>
          <div className="w-1/5 cursor-pointer">
            <div className="btn-hover max-w-max">
              <HiArrowLeft className="h-6 w-6" />
            </div>
          </div>
        </Link>
        <div className="w-3/5 text-center text-lg font-semibold capitalize md:text-xl">
          {title}
        </div>
        <div className="w-1/5" />
      </div>
    </LayoutTopNavbar>
  );
}
