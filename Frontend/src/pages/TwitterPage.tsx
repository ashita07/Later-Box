import { useEffect, useState } from "react";
import { fetchContentTwitter } from "../hooks/fetchContent";
interface content {
  _id: string;
  type: "twitter" | "youtube";
  link: string;
  title: string;
}
import { Card } from "../Components/Card";

export const TwitterPage: React.FC = () => {
  const [contents, setContents] = useState<content[]>([]);
  async function loadContents() {
    try {
      const data = await fetchContentTwitter();
      console.log(data);
      setContents(data);
    } catch (err) {
      console.error("failed to load content", err);
    }
  }
  useEffect(() => {
    loadContents();
  }, []);
  return (
    <div className="flex flex-wrap gap-6">
      {contents.length === 0 ? (
        <p>No Twitter content found.</p>
      ) : (
        contents.map(({ _id, type, link, title }, idx) => (
          <Card
            id={_id}
            key={idx}
            type={type}
            link={link}
            title={title}
            onDelete={(id) =>
              setContents((prev) => prev.filter((c) => c._id !== id))
            }
          />
        ))
      )}
    </div>
  );
};
