import LayoutMaxWidth from "./LayoutMaxWidth";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutTopNavbar({ children }: LayoutProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-primary py-4 text-white shadow-lg md:max-h-[68px]">
      <LayoutMaxWidth>
        <div className="px-4">{children}</div>
      </LayoutMaxWidth>
    </div>
  );
}
