import LayoutTopNavbar from "../Layout/LayoutTopNavbar";

interface Props {
  title: string;
}

export default function QuizResultTopNavbar({ title }: Props) {
  return (
    <LayoutTopNavbar>
      <div className="text-center text-xl font-semibold capitalize">
        {title}
      </div>
    </LayoutTopNavbar>
  );
}
