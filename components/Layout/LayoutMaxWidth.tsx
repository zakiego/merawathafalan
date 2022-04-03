interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutMaxWidth({ children }: LayoutProps) {
  return <div className="mx-auto max-w-xl ">{children}</div>;
}
