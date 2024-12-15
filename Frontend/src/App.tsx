import React from "react";
import { Button } from "./Components/Button";
import "./index.css";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";

const App: React.FC = () => {
  return (
    <>
      <div>
        <Button
          startIcon={<PlusIcon size="md" />}
          text="share content"
          size="md"
          variant="primary"
        />

        <Button
          startIcon={<ShareIcon size="md" />}
          text="add content"
          size="md"
          variant="secondary"
        />
      </div>
    </>
  );
};

export default App;
