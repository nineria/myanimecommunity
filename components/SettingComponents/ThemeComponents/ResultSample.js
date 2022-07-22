import Post from "@components/HomeComponents/Post";

export default function ResultSample({ posts }) {
  return (
    <div className="bg-foreground px-4 py-2">
      <div className="bg-background p-4 rounded-sm">
        <div className="flex flex-col gap-2">
          {posts &&
            posts.map((item, index) => (
              <Post homePosts={item} key={index} disabled={true} />
            ))}
        </div>
      </div>
    </div>
  );
}
