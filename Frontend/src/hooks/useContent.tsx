import axios from "axios";
import { useEffect, useState } from "react";
import { backend_url } from "../../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/viewContent`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setContents(response.data.content));
  }, [contents]);

  return contents;
}
