import { ShareIcon } from "../icons/shareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card(props: CardProps) {
  return (
    <div className="p-4 bg-white rounded-md shadow-md outline-slate-200 border border-grey-400 max-w-80">
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

          <ShareIcon size="md" />
        </div>
      </div>
      {props.type === "youtube" && (
        <iframe
          className="w-full pt-3"
          src={props.link.replace("watch", "embed")}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
      {props.type === "twitter" && (
        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/username/status/807811447862468608"></a>
        </blockquote>
      )}
    </div>
  );
}
