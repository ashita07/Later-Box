import React, { useEffect, useState } from "react";
import { Button } from "../Components/Button";

import { PlusIcon } from "../icons/plusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../Components/Card";
import { CreateContentModal } from "../Components/CreateContentModal";
import { SideBar } from "../Components/Sidebar";

import axios from "axios";
import { backend_url } from "../../config";
import { fetchContent } from "../hooks/useContent";

export const Dashboard: React.FC = () => {
  const [contents, setContents] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  async function loadContents() {
    try {
      const data = await fetchContent();
      setContents(data);
    } catch (error) {
      console.error("Failed to load contents", error);
    }
  }

  useEffect(() => {
    loadContents(); // fetch when page loads
  }, []);

  async function generateLink() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(
        `${backend_url}/api/v1/link/share`,
        {
          shareWholeContent: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data.shareLink;
      await navigator.clipboard.writeText(data);
      alert("Link copied to clipboard");
    } catch (error) {
      console.error("Error generating share link:", error);
      throw error; // or you can show a toast or alert to user
    }
  }

  return (
    <>
      <div>
        <SideBar />
      </div>
      <div className="ml-72 h-min-screen bg-grey-300 min-h-screen p-4">
        <CreateContentModal
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
            loadContents();
          }}
        />
        <div className="flex justify-end p-8 gap-4">
          <Button
            onClick={generateLink}
            startIcon={<ShareIcon size="md" />}
            text="share content"
            size="md"
            variant="primary"
          />

          <Button
            onClick={() => setModelOpen(true)}
            startIcon={<PlusIcon size="md" />}
            text="add content"
            size="md"
            variant="secondary"
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-start  ">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </>
  );
};
