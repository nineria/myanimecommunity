import { Footer } from "@components/Footer";
import Navbar from "@components/Navbar";
import Post from "@components/Post";
import React from "react";

export default function PostPage() {
  return (
    <div className="bg-background">
      <Navbar />
      <Post />
    </div>
  );
}
