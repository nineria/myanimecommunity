import React, { useEffect, useState } from "react";
import { auth, firestore, getUserWithUsername } from "lib/firebase";
import Layout from "./Layout";
import LeftMenu from "./Elements/LeftMenu";
import TopMenu from "./Elements/TopMenu";
import Body from "./Elements/Body";

export default function Comment({ post, comment }) {
  const [commentRef, setCommentRef] = useState();
  const [likes, setLikes] = useState();
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const userDoc = await getUserWithUsername(post.username);
      const comments = await userDoc.ref
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .doc(comment.slug);

      setCommentRef(comments);
    };

    const getLikes = async () => {
      const userStatistics = firestore
        .collection("users")
        .doc(post.uid)
        .collection("posts")
        .doc(post.slug)
        .collection("comments")
        .doc(comment.slug)
        .collection("likes");

      const userStatisticsPosts = await (
        await userStatistics.get()
      ).docs.map((data) => data.data());

      const uid = auth.currentUser.uid;

      userStatisticsPosts.map((like) => {
        if (like.uid === uid) {
          setLikeState(true);
          return;
        }
      });

      if (userStatisticsPosts.length === 0) setLikes(0);
      else setLikes(userStatisticsPosts.length);
    };

    getLikes();
    getComments();
  }, [post, comment]);

  return (
    <div className="bg-foreground rounded-sm">
      <Layout>
        {post && <LeftMenu comment={comment} likes={likes} />}
        {post && <TopMenu comment={comment} likes={likes} />}
        {post && (
          <Body
            comment={comment}
            commentRef={commentRef}
            post={post}
            likes={likes}
            setLikes={setLikes}
            likeState={likeState}
            setLikeState={setLikeState}
          />
        )}
      </Layout>
    </div>
  );
}
