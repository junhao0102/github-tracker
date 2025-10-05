import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";

export default function Commits() {
  const { repoName } = useParams();
  const [commits, setCommits] = useState([]);
  const OWNER = import.meta.env.VITE_GITHUB_OWNER;

  async function fetchCommits() {
    try {
      const response = await api.get(`/repos/${OWNER}/${repoName}/commits`);
      setCommits(response.data);
    } catch (e) {
      console.error("fetch commits error :" + e.message);
    }
  }

  useEffect(() => {
    fetchCommits();
  }, [repoName]);
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-bold">Recent Commits</h2>
      {commits.map((item) => (
        <div key={item.sha} className="p-2 rounded-lg bg-gray-100">
          <a
            href={item.html_url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-600"
          >
            {item.commit.message}
          </a>
          <p className="text-sm text-gray-500">
            by {item.commit.author.name} ·{" "}
            {new Date(item.commit.author.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
