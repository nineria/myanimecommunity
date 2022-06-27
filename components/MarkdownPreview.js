import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ markdown }) {
  return (
    <div
      className="prose-sm
      prose-headings:text-title
      prose-blockquote:bg-black/20
      prose-code:text-title
      prose-pre:bg-black/20
      prose-a:text-content
      prose-p:text-title
      prose-strong:text-title
      prose-li:text-title
      prose-th:font-bold
      prose-td:text-title
      "
    >
      <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
