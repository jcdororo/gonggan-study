// 주변 공간 가져오기
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function GET(request: any, response: any) {
  const db = (await connectDB).db("gonggan");

  try {
    const places = await db.collection("place").find().toArray();

    const currentX: number = 126.952712; // 경도 Longitude
    const currentY: number = 37.48121; // 위도 Latitude

    const calculateDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ): number => {
      const R = 6371; // 지구의 반지름 (단위: km)
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    };

    const nearbyLocations = places?.filter((place) => {
      const distance = calculateDistance(
        currentY,
        currentX,
        Number(place.y),
        Number(place.x)
      );
      return distance <= 1;
    });

    const spaces = nearbyLocations?.map((place) => {
      const distance = calculateDistance(
        currentY,
        currentX,
        Number(place.y),
        Number(place.x)
      );
      const mDistance = Number(distance.toFixed(2)) * 1000 + "m";
      return { ...place, mDistance };
    });


    const getPictures = await Promise.all(
      spaces.map(
        async (space) =>
          await db
            .collection("picture")
            .findOne({ place_id: space?._id.toString() })
      )
    );

    response.status(200).json(getPictures);
  } catch (error) {
    response.status(500).json("error");
  }
}
