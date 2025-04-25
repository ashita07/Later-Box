import React, { useState } from "react";
import { Button } from "../Components/Button";

import { PlusIcon } from "../icons/plusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../Components/Card";
import { CreateContentModal } from "../Components/CreateContentModal";
import { SideBar } from "../Components/Sidebar";
import { useContent } from "../hooks/useContent";

export const Dashboard: React.FC = () => {
  const contents = useContent();
  const [modelOpen, setModelOpen] = useState(false);
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
          }}
        />
        <div className="flex justify-end p-8 gap-4">
          <Button
            startIcon={<PlusIcon size="md" />}
            text="share content"
            size="md"
            variant="primary"
          />

          <Button
            onClick={() => setModelOpen(true)}
            startIcon={<ShareIcon size="md" />}
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
