import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { HiArrowRight } from "react-icons/hi";

// import { MerawatHafalan } from "~/components/Icon/merawathafalan";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
      <div className="rounded-2xl bg-white px-8 py-7">
        <div className="">
          <div className="text-center">
            {/* <MerawatHafalan className="mx-auto w-80" /> */}
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="mt-2">Salam</p>
            <div className="mt-8">
              <button className="btn-primary" onClick={() => signIn("google")}>
                <div className="group flex items-center justify-center space-x-2">
                  <FcGoogle className="h-6 w-6" />
                  <p>Masuk dengan akun Google</p>
                  <HiArrowRight className="" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
