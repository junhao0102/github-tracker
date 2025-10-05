import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "@/lib/api";

export default function Readme() {
  const { repoName } = useParams();
  const [readme, setReadme] = useState();
  const OWNER = import.meta.env.VITE_GITHUB_OWNER;

  async function fetchReadme() {
    try {
      const { data } = await api.get(
        `/repos/${OWNER}/${repoName}/contents/README.md`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      // Base64 → Uint8Array → UTF-8 string
      const bytes = Uint8Array.from(atob(data.content), (c) => c.charCodeAt(0));
      const decoded = new TextDecoder("utf-8").decode(bytes);
      setReadme(decoded);
    } catch (e) {
      setReadme(null);
      console.error("fetch readme error :" + e.message);
    }
  }
  useEffect(() => {
    fetchReadme();
  }, [repoName]);

  return readme ? (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>README.md</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
        </CardContent>
      </Card>
    </article>
  ) : (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>README.md</CardTitle>
        </CardHeader>
        <CardContent>
          <>沒有README.md</>
        </CardContent>
      </Card>
    </article>
  );
}
