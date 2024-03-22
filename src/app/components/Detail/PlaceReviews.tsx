import axios from "axios";
import { ReviewType } from "../../interface";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ReviewShape from "../Review/ReviewShape";
import { useSession } from "next-auth/react";
import ModalDelete from "@/app/mypage/ModalDelete";
import Star from "../Review/Star";
import Like from "../Review/Like";
import ModalPolice from "../ModalPolice";
import Image from "next/image";

interface PlaceProps {
  _id: string;
}

export default function PlaceReviews({ _id }: PlaceProps) {
  // 사용자 정보
  const { data: userData, status }: any = useSession();


  const getReviews = async () => {
    const { data } = await axios.get(`/api/reviews/findReviews?_id=${_id}`);
    return data as ReviewType[];
  };

  const { data: reviews } = useQuery<ReviewType[]>(
    `review-${_id}`,
    getReviews,
    {
      enabled: !!_id,
      refetchOnWindowFocus: false,
    }
  );


  const [limit, setLimit] = useState(5);

  const handleReadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const [reviewWrite, setReviewWrite] = useState(false);
  const [reviewModify, setReviewModify] = useState(false);
  const [reviewDelete, setReviewDelete] = useState(false);
  const [review, setReview] = useState<ReviewType>();
  const [policeWrite, setPoliceWrite] = useState(false);


  // 리뷰 모달
  const onClick = (
    e: React.MouseEvent<HTMLDivElement>,
    review?: ReviewType
  ) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    if (id == "write") {
      setReviewWrite(!reviewWrite);
    }

    if (id == "modify") {
      setReview(review);
      setReviewModify(!reviewModify);
    }

    if (id == "delete") {
      setReview(review);
      setReviewDelete(!reviewDelete);
    }

    if (id == "police") {
      setReview(review);
      setPoliceWrite(!policeWrite);
    }
  };

  // 평균 구하기
  const totalStars = reviews?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.star;
  }, 0);

  return (
    <>
      <div className="flex justify-between px-8 pt-10 pb-5 ">
        <div className="flex gap-3">
          <div className="text-3xl font-bold">리뷰</div>
          <div className="mt-3">
            { totalStars === 0
              ? ""
              : totalStars && reviews && <Star star={Math.floor(totalStars / reviews.length)} />
            }
          </div>
          <div className="mt-3">리뷰 {reviews?.length}개</div>
        </div>
        {status == "authenticated" && (
          <div
            className="m-2 pt-[6px] cursor-pointer"
            id="write"
            onClick={(e) => onClick(e)}
          >
            {/* 리뷰를 작성한 이력이 있으면 작성하기 버튼 안 보임 */}
            {reviews?.some((review) => review.writerid === userData.user?._id)
              ?  ""
              : "리뷰 작성하기"}
          </div>
        )}
      </div>
      {reviews && reviews.length > 0 ? (
        reviews
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((review, index) => (
            <div key={index}>
              <div className="m-auto w-[89%] p-5 border border-solid border-black rounded-md mb-5">
                <div className="flex justify-between mb-3">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <Image
                        className="rounded-full h-11 w-11"
                        src={review.writerpic ? review.writerpic : "/logo.png"}
                        width={400}
                        height={400}
                        alt="아이콘"
                      />
                    </div>
                    <div className="my-auto">
                      <div className="font-bold">
                        {review.writernickname}
                      </div>
                      <div className="items-center text-xs">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(new Date(review.date))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Like review={review} />
                  </div>
                </div>
                <div className="mb-3">
                  <Star star={review.star} />
                </div>
                <div className="mb-3">{review.content}</div>
                {userData && userData.user?._id == review.writerid ? (
                  <div className="flex justify-end gap-2 text-xs">
                    <div
                      id="modify"
                      onClick={(e) => onClick(e, review)}
                      className="flex justify-end cursor-pointer hover:opacity-80"
                    >
                      수정하기
                    </div>
                    <div
                      id="delete"
                      onClick={(e) => onClick(e, review)}
                      className="flex justify-end cursor-pointer hover:opacity-80"
                    >
                      삭제하기
                    </div>
                  </div>
                ) : (
                  <div
                    id="police"
                    onClick={(e) => onClick(e, review)}
                    className="flex justify-end text-xs cursor-pointer hover:opacity-80"
                  >
                    신고하기
                  </div>
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="text-center p-10 first-letter:text-lg">
          작성된 리뷰가 없습니다.
        </div>
      )}
      <div className="flex justify-center pt-1 pb-5 cursor-pointer">
        {reviews && limit < reviews.length && (
          <div className="flex justify-center w-[150px] p-2 bg-black/10 rounded-2xl">
            <div onClick={handleReadMore}>리뷰 더 보기 &nbsp; </div>
            <div className="flex items-center">
              <IoIosArrowDown />
            </div>
          </div>
        )}
      </div>

      {/* 모달 */}
      {reviewWrite ? (
        <ReviewShape
          onClick={onClick}
          _id={_id}
          userData={userData}
          type="write"
        />
      ) : (
        ""
      )}
      {reviewModify ? (
        <ReviewShape
          onClick={onClick}
          review={review}
          _id={_id}
          userData={userData}
          type="modify"
        />
      ) : (
        ""
      )}
      {reviewDelete ? (
        <ModalDelete targetContent={review} handleDelete={onClick} />
      ) : (
        ""
      )}
      {policeWrite ? (
        <ModalPolice targetContent={review} handleWrite={onClick} />
      ) : (
        ""
      )}
    </>
  );
}
