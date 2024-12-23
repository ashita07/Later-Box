import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

// controlled component
interface propsF {
  open: boolean;
  onClose: () => void;
}
export function CreateContentModal(props: propsF) {
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
              <Input placeholder={"title"} />
              <Input placeholder={"link"} />
              <div className="flex justify-center">
                <Button variant="secondary" size="md" text="submit" />
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
