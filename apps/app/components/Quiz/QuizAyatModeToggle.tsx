import { ayatMode } from "~/lib/ayatmode";

interface Props {
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  clearSelectState(): void;
  showTab: string[];
}

export default function QuizAyatModeToggle({
  menu,
  setMenu,
  clearSelectState,
  showTab,
}: Props) {
  return (
    <div className="flex rounded-2xl bg-gray-100/80 py-1.5 ">
      {showTab.map((x) => {
        // active
        if (x == menu) {
          return (
            <button key={x} className="w-full px-1.5 text-center capitalize">
              <div className="rounded-xl bg-white py-2 shadow-md shadow-gray-500/20">
                {x}
              </div>
            </button>
          );
        }

        // inactive
        return (
          <button
            key={x}
            onClick={() => {
              setMenu(x);
              clearSelectState();
            }}
            className="w-full px-1.5 text-center capitalize"
          >
            <div className="rounded-xl py-2">{x}</div>
          </button>
        );
      })}
    </div>
  );
}
