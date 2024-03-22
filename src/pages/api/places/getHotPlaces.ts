// 좋아요 만은 순으로 장소 열 개 가져오기 가져오기
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function GET(request: any, response: any) {
  const db = (await connectDB).db("gonggan");

  try {
    const places = await db.collection("like_place").find().toArray();

    // place_id 별로 개수를 계산
    const placeIdCounts: Record<string, number> = places.reduce(
      (acc: Record<string, number>, place) => {
        const placeId = place.place_id;
        acc[placeId] = (acc[placeId] || 0) + 1;
        return acc;
      },
      {}
    );

    // 개수를 기준으로 내림차순 정렬
    const sortedPlaceIdCounts = Object.entries(placeIdCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // 상위 다섯 개의 place_id 추출
    const topTenPlaceIds = sortedPlaceIdCounts
      .slice(0, 12)
      .map(([placeId]) => placeId);

    // 상위 다섯 개의 place_id에 해당하는 장소만 추출
    const topTenPlaces = places.filter((place) =>
      topTenPlaceIds.includes(place.place_id)
    );

    // 중복된 place_id를 제거하기 위해 Set 사용
    const uniqueTopTenPlaces = Array.from(
      new Set(topTenPlaces.map((place) => place.place_id))
    ).map((placeId) =>
      topTenPlaces.find((place) => place.place_id === placeId)
    );

    const getPictures = await Promise.all(
      uniqueTopTenPlaces.map(
        async (uniquePlace) =>
          await db
            .collection("picture")
            .findOne({ place_id: uniquePlace?.place_id })
      )
    );

    response.status(200).json(getPictures);
    
  } catch (error) {
    response.status(500).json("error");
  }
}
