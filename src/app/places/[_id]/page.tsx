"use client";
import PlaceInfo from "@/app/components/Detail/PlaceInfo";
import PlaceReviews from "@/app/components/Detail/PlaceReviews";
import React from "react";

export default function PlacePage({ params }: { params: { _id: string } }) {
  const _id = params?._id;

  return (
    <>
      <div>
        <div className="darkMode m-auto mt-[40px] w-full md:max-w-2xl h-screen bg-white max-h-[100vh]">
          <PlaceInfo _id={_id} />
          <PlaceReviews _id={_id} />
        </div>
      </div>
    </>
  );
}
