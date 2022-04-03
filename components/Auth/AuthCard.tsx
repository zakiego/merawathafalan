import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { HiArrowRight } from "react-icons/hi";

export default function AuthCard() {
  return (
    <div className="rounded-2xl bg-white py-4 px-6 shadow-xl md:py-9 md:px-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">Login</h1>
        <p className="mt-2 text-[10px] opacity-60 md:mt-3 md:text-sm">
          {ucapan[rand]}
        </p>
        <div className="mt-6">
          <button className="btn-primary" onClick={() => signIn("google")}>
            <div className="group flex items-center justify-center space-x-2 text-xs md:text-base">
              <FcGoogle className="h-6 w-6" />
              <p>Masuk dengan akun Google</p>
              <HiArrowRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

const ucapan = [
  "Semoga Allah memudahkan urusan kita",
  "Semoga Allah selalu menjaga kita",
  "Semoga Allah mengampuni dosa-dosa kita",
  "Semoga Allah selalu merahmati kita",
];

const rand = Math.floor(Math.random() * ucapan.length);
