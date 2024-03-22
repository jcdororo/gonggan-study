
interface TitleProps {
  type: string;
}

export default function Title({ type }: TitleProps) {
  return (
    <div className="text-center font-semibold text-3xl my-4 p-10">{type}</div>
  );
}
