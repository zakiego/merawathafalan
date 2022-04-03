interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutMainPadding({ children }: LayoutProps) {
  return <div className="mt-5 px-4 pt-16 pb-16">{children}</div>;
}
