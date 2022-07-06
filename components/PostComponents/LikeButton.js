import { firestore, auth, increment } from "@lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { ThumbUp } from "tabler-icons-react";

// Allows user to heart or like a post
export default function Like({ postRef }) {
  // Listen to heart document for currently logged in user
  const likeRef = postRef.collection("likes").doc(auth.currentUser.uid);

  const [likeDoc] = useDocument(likeRef);

  // Create a user-to-post relationship
  const addLike = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(1) });
    batch.set(likeRef, { uid });

    console.log(batch);

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeLike = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(-1) });
    batch.delete(likeRef);

    await batch.commit();
  };

  return likeDoc?.exists ? (
    <div
      onClick={removeLike}
      className="flex flex-row gap-1 items-end hover:underline cursor-pointer "
    >
      <ThumbUp size={14} />
      ไม่ถูกใจ
    </div>
  ) : (
    <div
      onClick={addLike}
      className="flex flex-row gap-1 items-end hover:underline cursor-pointer "
    >
      <ThumbUp size={14} />
      ถูกใจ
    </div>
  );
}
