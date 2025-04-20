import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";
import { backend_url } from "../../config";

// controlled component
interface propsF {
  open: boolean;
  onClose: () => void;
}
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModal(props: propsF) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function submit() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    await axios.post(
      `${backend_url}/api/v1/content`,
      { link, title, type },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  }

  return (
    <div>
      {props.open && (
        <div className="w-screen h-screen bg-slate-200/60 fixed top-0 left-0 z-30 flex justify-center items-center">
          {/* Semi-transparent backdrop using bg-opacity */}
          <div className="flex flex-col justify-center z-50 relative">
            {/* Foreground Content */}
            <span className="bg-white z-50 relative rounded p-4 shadow-lg">
              <div
                className="flex justify-end
                cursor-pointer"
                onClick={props.onClose}
              >
                <CrossIcon />
              </div>
              {/* Additional Content Here */}
              <Input ref={titleref} placeholder={"title"} />
              <Input ref={linkref} placeholder={"link"} />
              <h1>Type:</h1>
              <div className="flex justify-center p-2 gap-4 space-between">
                <Button
                  size="md"
                  onClick={() => {
                    setType(ContentType.Youtube);
                  }}
                  text="youtube"
                  variant={
                    type === ContentType.Youtube ? "secondary" : "primary"
                  }
                ></Button>
                <Button
                  size="md"
                  onClick={() => {
                    setType(ContentType.Twitter);
                  }}
                  text="Twitter"
                  variant={
                    type === ContentType.Twitter ? "secondary" : "primary"
                  }
                ></Button>{" "}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={submit}
                  variant="secondary"
                  size="md"
                  text="submit"
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
interface InputProps {
  onChange?: () => void;
  placeholder: string; // Type placeholder as string
}

function Input({ onChange, placeholder }: InputProps) {
  return (
    <div className="p-1">
      <input
        placeholder={placeholder}
        className="px-4 py-2 border m-2 rounded"
        onChange={onChange}
      />
    </div>
  );
}
