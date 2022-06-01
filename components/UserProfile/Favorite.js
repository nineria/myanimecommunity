import { Tag } from "@chakra-ui/react";
import React from "react";

function Favorite({ children }) {
  const detail = React.Children.map(children, (child) =>
    child.type.displayName === "Detail" ? child : null
  );
  const button = React.Children.map(children, (child) =>
    child.type.displayName === "Button" ? child : null
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center mt-3">{detail}</div>
      <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer">
        {button}
      </div>
    </div>
  );
}

const Detail = ({ children }) => (
  <Tag className="cursor-pointer hover:translate-y-[1px] hover:opacity-75">
    <div>{children}</div>
  </Tag>
);
Detail.displayName = "Detail";
Favorite.Detail = Detail;

const Button = ({ children }) => children;
Button.displayName = "Button";
Favorite.Button = Button;

export default Favorite;
