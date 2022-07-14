import AuthCheck from "@components/AuthCheck";
import { Footer } from "@components/Footer";

import HomeComponents from "@components/HomeComponents";
import Navbar from "@components/Navbar";
import { firestore, fromMillis, postToJSON } from "@lib/firebase";
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
  // const [loading, setLoading] = useState(false);

  // const [postsEnd, setPostsEnd] = useState(false);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, [setTheme]);

  // const getMorePosts = async () => {
  //   setLoading(true);
  //   const last = posts[posts.length - 1];

  //   const cursor =
  //     typeof last.createdAt === "number"
  //       ? fromMillis(last.createdAt)
  //       : last.createdAt;

  //   const query = firestore
  //     .collectionGroup("posts")
  //     .where("published", "==", true)
  //     .orderBy("createdAt", "desc")
  //     .startAfter(cursor)
  //     .limit(LIMIT);

  //   const newPosts = (await query.get()).docs.map((doc) => doc.data());

  //   setPosts(posts.concat(newPosts));
  //   setLoading(false);

  //   if (newPosts.length < LIMIT) setPostsEnd(true);
  // };

  return (
    <>
      <div className="bg-background min-h-[1024px] mb-[235px] pb-10">
        <Navbar />
        <HomeComponents homePosts={posts} />
      </div>
      <Footer />
    </>
  );
}
