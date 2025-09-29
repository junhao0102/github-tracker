import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Title({ repoInfo }) {
  return (
    <div className="flex items-center gap-5">
      <Avatar>
        <AvatarImage src={repoInfo.owner.avatar_url} />
      </Avatar>
      <div className="flex items-end gap-3">
        <h1 className="text-3xl">{repoInfo.name}</h1>
        <span className="text-xs border bg-green-600 text-white rounded-full px-2 py-1 ">
          {repoInfo.visibility}
        </span>
      </div>
    </div>
  );
}

export function Nav({ readme }) {
  return (
    <Tabs defaultValue="repo">
      <TabsList className="w-full">
        <TabsTrigger value="repo" className="w-1/3">
          Repo
        </TabsTrigger>
        <TabsTrigger value="issue" className="w-1/3">
          Issues
        </TabsTrigger>
        <TabsTrigger value="PR" className="w-1/3">
          Pull Request
        </TabsTrigger>
      </TabsList>
      <TabsContent value="repo">
        {readme ? (
          <article>
            <Card>
              <CardHeader>
                <CardTitle>README.md</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readme}
                </ReactMarkdown>
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
        )}
      </TabsContent>
      <TabsContent value="issue">issue</TabsContent>
      <TabsContent value="PR">pr</TabsContent>
    </Tabs>
  );
}

export default function ProjectPage() {
  const { repoName } = useParams();
  const [repoInfo, setRepoInfo] = useState(null);
  const [readme, setReadme] = useState(null);
  const OWNER = import.meta.env.VITE_GITHUB_OWNER;

  async function fetchRepoInfo() {
    try {
      const url = `/repos/${OWNER}/${repoName}`;
      const response = await api.get(url);
      setRepoInfo(response.data);
    } catch (e) {
      console.error("fetch repo info error :" + e.message);
    }
  }
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
    fetchRepoInfo();
    fetchReadme();
  }, [repoName]);

  useEffect(() => {}, [readme]);

  return (
    <div>
      {repoInfo ? (
        <div className="space-y-10">
          <Title repoInfo={repoInfo} />
          <Nav readme={readme} />
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}
