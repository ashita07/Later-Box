import React, { useState } from "react";
import { Button } from "../Components/Button";

import { PlusIcon } from "../icons/plusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../Components/Card";
import { CreateContentModal } from "../Components/CreateContentModal";
import { SideBar } from "../Components/Sidebar";

export const Dashboard: React.FC = () => {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <>
      <div>
        <SideBar />
      </div>
      <div className="ml-72 h-min-screen bg-grey-400 min-h-screen p-4">
        <CreateContentModal
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-evenly p-8">
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
        <div className="flex min-h-60 ">
          <Card
            type="twitter"
            link="https://x.com/ThakurAbhay342/status/1913533899197890917"
            title="first tweet"
          />
          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=DjYZk8nrXVY&ab_channel=AshishPratapSingh"
            title="Youtube video"
          />
        </div>
      </div>
    </>
  );
};
