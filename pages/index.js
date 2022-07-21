import { Footer } from "@components/Footer";

import HomeComponents from "@components/HomeComponents";
import Metatags from "@components/Metatags";
import Navbar from "@components/Navbar";
import { firestore, postToJSON } from "@lib/firebase";
import { useThemeContext } from "@lib/useTheme";

import { useState, useEffect } from "react";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("homePosts")
    .orderBy("createdAt", "asc")
    .limit(LIMIT);

  const homePosts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { homePosts }, // will be passed to the page component as props
  };
}

export default function HomePage(props) {
  const [posts, setPosts] = useState(props.homePosts);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  return (
    <>
      <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
        <Navbar />
        <Metatags />
        <HomeComponents homePosts={posts} />
      </div>
      <Footer />
    </>
  );
}
