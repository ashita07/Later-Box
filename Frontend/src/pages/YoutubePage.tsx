import { useEffect, useState } from "react";
import { fetchContentYoutube } from "../hooks/fetchContent";
import { Card } from "../Components/Card";

export const YoutubePage: React.FC = () => {
  const [contents, setContents] = useState([]);
  async function loadContents() {
    try {
      const data = await fetchContentYoutube();
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
        <p>No Youtube content found.</p>
      ) : (
        contents.map(({ type, link, title }, idx) => (
          <Card key={idx} type={type} link={link} title={title} />
        ))
      )}
    </div>
  );
};

export default YoutubePage;
