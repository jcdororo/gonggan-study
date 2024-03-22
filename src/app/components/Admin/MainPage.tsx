import React from "react";
import Category from "./Category";

export default function MainPage() {
  return (
    <>
      <div className="">
        <div className="">
          <div className="flex justify-center items-center h-[100vh] translate-y-[-15%]">
            <div className="w-1/3">
              <Category category="contact" />
            </div>
            <div className="w-1/3">
              <Category category="police" />
            </div>
            <div className="w-1/3">
              <Category category="propose" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
