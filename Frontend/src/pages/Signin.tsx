import { useRef } from "react";
import { Button } from "../Components/Button";
import { backend_url } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(backend_url + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = "bearer " + response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/Dashboard");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center rounded">
      <div className="w-80 h-80 p-10 bg-white rounded shadow-lg">
        {/* Username Input */}
        <div className="mb-5 p-1 border rounded bg-gray-100">
          <input
            ref={usernameRef}
            placeholder="Username"
            className="w-full p-2 border-2 rounded focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="p-1 border rounded bg-gray-100">
          <input
            ref={passwordRef}
            placeholder="Password"
            type="password"
            className="w-full p-2 border-2 rounded focus:outline-none"
          />
        </div>
        <div className="flex justify-center item-center pt-10">
          <Button
            onClick={signin}
            text="Sign In"
            variant="secondary"
            size="md"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
