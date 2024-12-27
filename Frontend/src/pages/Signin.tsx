import { Button } from "../Components/Button";

export function Signin() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center rounded">
      <div className="w-80 h-80 p-10 bg-white rounded shadow-lg">
        {/* Username Input */}
        <div className="mb-5 p-1 border rounded bg-gray-100">
          <input
            placeholder="Username"
            className="w-full p-2 border-2 rounded focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="p-1 border rounded bg-gray-100">
          <input
            placeholder="Password"
            type="password"
            className="w-full p-2 border-2 rounded focus:outline-none"
          />
        </div>
        <div className="flex justify-center item-center pt-10">
          <Button
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
