import { DeleteIcon } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card(props: CardProps) {
  return (
    <div className="p-4 m-4 bg-white rounded-md shadow-md outline-slate-200 border border-grey-400 max-w-80">
      <div className="flex justify-between">
        <div className="flex items-center ">
          <div className="pr-2 text-grey-500">
            <ShareIcon size="md" />
          </div>
          <div className="text-lg font-medium">{props.title}</div>
        </div>
        <div className="flex items-center text-grey-500">
          <div className="pr-2">
            <a href={props.link} target="_blank" />
            <ShareIcon size="md" />
          </div>

          <DeleteIcon />
        </div>
      </div>
      <div className="p-3">
        {props.type === "youtube" && (
          <div className="relative w-full">
            {/* The iframe displays the embedded video */}
            <iframe
              className=" w-full h-[315px] rounded-md" // Adjust height if needed
              src={props.link.replace("watch", "embed")}
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
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
