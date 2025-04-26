import axios from "axios";
import { backend_url } from "../../config";

export async function fetchContent() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  const response = axios.get(`${backend_url}/api/v1/viewContent`, {
    headers: {
      Authorization: token,
    },
  });
  return (await response).data.content;
}
