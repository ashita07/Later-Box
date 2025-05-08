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

export async function fetchContentTwitter() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  const response = axios.get(`${backend_url}/api/v1/ViewContent?type=twitter`, {
    headers: {
      Authorization: token,
    },
  });
  return (await response).data.content;
}

export async function fetchContentYoutube() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  const response = axios.get(`${backend_url}/api/v1/ViewContent?type=youtube`, {
    headers: {
      Authorization: token,
    },
  });
  return (await response).data.content;
}

export async function onDelete(contentId: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no auth token found");

  await axios.delete(`${backend_url}/api/v1/deleteContent`, {
    data: { contentId },
    headers: {
      Authorization: token,
    },
  });
}
