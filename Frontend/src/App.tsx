import React, { useState } from "react";
import { Button } from "./Components/Button";
import "./index.css";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Card } from "./Components/Card";
import { CreateContentModal } from "./Components/CreateContentModal";

const App: React.FC = () => {
  const [modelOpen, setModelopen] = useState(true);
  return (
    <>
      <div>
        <CreateContentModal
          open={modelOpen}
          onClose={() => {
            setModelopen(false);
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
            onClick={() => setModelopen(true)}
            startIcon={<ShareIcon size="md" />}
            text="add content"
            size="md"
            variant="secondary"
          />
        </div>
        <div className="flex min-h-60 ">
          <Card
            type="twitter"
            link="https://x.com/nitesh_singh5/status/1868697579237896513"
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

export default App;
