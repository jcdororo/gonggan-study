import { FaRegStar, FaStar } from "react-icons/fa";

interface StarProps {
  star: number;
}

export default function Star({ star }: StarProps) {
  const starArr = Array.from({ length: star }, (_, index) => (
    <FaStar key={`star-${index}`} size={20} />
  ));
  const emptyStarArr = Array.from({ length: 5 - star }, (_, index) => (
    <FaRegStar key={`empty-star-${index}`} size={20} />
  ));

  return (
    <>
      <div className="flex gap-2">
        <div className="flex">
          <div className="flex">{starArr}</div>
          <div className="flex">{emptyStarArr}</div>
        </div>
        <div className="text-sm mt-[1px]">{star}점</div>
      </div>
    </>
  );
}
