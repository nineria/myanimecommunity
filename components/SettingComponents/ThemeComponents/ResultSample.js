import React from "react";
// Components
import Post from "@components/HomeComponents/Post";

export default function ResultSample({ samplePost }) {
  const samplePosts = samplePost.map((item, index) => (
    <Post dummyData={item} key={index} disabled={true} />
  ));

  return (
    <div className="bg-foreground px-4 py-2">
      <div className="bg-background p-4 rounded-sm">
        <div className="flex flex-col gap-2">{samplePosts}</div>
      </div>
    </div>
  );
}
