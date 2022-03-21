import { HiCheck, HiClock, HiLightningBolt, HiX } from "react-icons/hi";

import LayoutMaxWidth from "~/components/Layout/LayoutMaxWidth";

export default function Result() {
  const cards = [
    { name: "Benar", value: 3, icon: HiCheck },
    { name: "Salah", value: 3, icon: HiX },
    { name: "Waktu", value: "10 Menit 30 Detik", icon: HiClock },
  ];

  return (
    <div>
      {/* <LayoutMaxWidth> */}
      <div className="flex min-h-screen flex-col bg-gray-100">
        <div className="m-auto ">
          <div className="space-y-3 text-center">
            <h1 className="text-2xl font-bold">Latihan Selesai!</h1>
            <h2 className="card-result mx-auto">Mode</h2>
            <h2 className="card-result mx-auto bg-primary  text-white">
              Sambung Ayat
            </h2>
          </div>
          <div className="mt-14 flex items-center justify-center">
            <HiLightningBolt className="h-9 w-9" />
            <h1 className="text-4xl font-bold">+60</h1>
          </div>
          <div className="mt-6">
            <div className="">
              <div className="bg-gray-200 py-1 px-3">
                <div className="flex items-center justify-center space-x-1">
                  <HiCheck className="h-6 w-6 text-green-500" />
                  <p className="font-medium">3</p>
                </div>
                <div>Benar</div>
              </div>
              {/* <div className="card-result">Salah</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </LayoutMaxWidth> */}
    </div>
  );
}
