import React from "react";

export default function Layout(props) {
  return (
    <div>
      <div className="md:flex flex-row hidden">
        {props.children[0]}
        <div className="px-[0.5px] bg-white opacity-50" />
        {props.children[2]}
      </div>

      <div className="flex md:hidden flex-col">
        {props.children[1]}
        <div className="py-[0.5px] bg-white opacity-50" />
        {props.children[2]}
      </div>
    </div>
  );
}
