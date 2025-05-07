import { useEffect } from "react";
import { DeleteIcon } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";
/* eslint-disable */

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card(props: CardProps) {
  const videoId = props.link.split("v=")[1]?.split("&")[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  useEffect(() => {
    if (props.type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow-md outline-slate-200 border border-gray-400 max-w-80 gap-4 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <ShareIcon size="md" />

          <div className="text-lg break-words font-medium max-w-[200px]">
            {props.title}
          </div>
        </div>
        <div className="flex items-center text-grey-500 gap-2">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <ShareIcon size="md" />
          </a>

          <DeleteIcon />
        </div>
      </div>
      <div>
        {props.type === "youtube" && (
          <div className="relative w-full">
            {/* The iframe displays the embedded video */}
            <iframe
              className=" w-full h-[200px] rounded-md" // Adjust height if needed
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            {/* The overlay captures clicks and redirects */}
            <div
              className="absolute inset-0 cursor-pointer z-10"
              onClick={() => window.open(props.link, "_blank")} // Opens the YouTube video in a new tab
            ></div>
          </div>
        )}
        {props.type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")} />
          </blockquote>
        )}
      </div>
    </div>
  );
}
