import React from "react";

function Information({ children }) {
  const detail = React.Children.map(children, (child) =>
    child.type.displayName === "Detail" ? child : null
  );
  const button = React.Children.map(children, (child) =>
    child.type.displayName === "Button" ? child : null
  );

  return (
    <div className="flex flex-col gap-2 mt-3">
      {detail}
      <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer">
        {button}
      </div>
    </div>
  );
}

const Detail = ({ children }) => (
  <div className="flex flex-row gap-2">{children}</div>
);
Detail.displayName = "Detail";
Information.Detail = Detail;

const Button = ({ children }) => children;
Button.displayName = "Button";
Information.Button = Button;

export default Information;
