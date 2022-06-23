import React from "react";

function ContentStat({ children }) {
  const posts = React.Children.map(children, (child) =>
    child.type.displayName === "Posts" ? child : null
  );
  const comments = React.Children.map(children, (child) =>
    child.type.displayName === "Comments" ? child : null
  );
  const editDate = React.Children.map(children, (child) =>
    child.type.displayName === "EditDate" ? child : null
  );
  return (
    <div className="flex flex-row gap-4 text-title">
      <div className="flex text-sm lg:flex-col lg:items-center items-center gap-1">
        <div>{posts}</div>
        <div className="text-xs text-title opacity-50">โพสต์</div>
      </div>
      <div className="lg:border-r-[1px] lg:border-[#aaa]" />
      <div className="flex text-sm lg:flex-col lg:items-center items-center gap-1">
        <div>{comments}</div>
        <div className="text-xs text-title opacity-50">ข้อความ</div>
      </div>
      <div className="flex text-sm lg:flex-col lg:items-center items-center gap-1 ">
        <span>แก้ไขล่าสุด</span>
        <span className="text-xs text-title opacity-50">{editDate}</span>
      </div>
    </div>
  );
}

const Posts = ({ children }) => children;
Posts.displayName = "Posts";
ContentStat.Posts = Posts;

const Comments = ({ children }) => children;
Comments.displayName = "Comments";
ContentStat.Comments = Comments;

const EditDate = ({ children }) => children;
EditDate.displayName = "EditDate";
ContentStat.EditDate = EditDate;

export default ContentStat;
