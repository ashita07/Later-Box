import { ReactElement } from "react";

interface items {
  text: string;
  icon: ReactElement;
}

export function SidebarItem(props: items) {
  return (
    <div className="flex text-lg p-1  border-grey-400 text-grey-400 px-9 hover:bg-grey-400 rounded-md transition duration-500 cursor-pointer">
      <div className="p-2">{props.icon}</div>
      <div className="content-center text-grey-500 font-medium">
        {props.text}
      </div>
    </div>
  );
}
