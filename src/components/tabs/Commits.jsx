import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import defaultAvatar from "@/asset/anonymous.jpeg";

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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Commits</CardTitle>
        </CardHeader>
        <CardContent>
          {commits.map((item) => (
            <Card className="relative w-[1000px] h-28 m-4" key={item.sha}>
              <CardContent className="flex flex-col p-4">
                <div className="flex justify-between">
                  <h2 className="text-xl break-words max-w-[70%]">
                    {item.commit.message}
                  </h2>
                  <div className="absolute top-10 right-5 flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-gray-100 text-black hover:bg-gray-300"
                          asChild
                        >
                          <a
                            href={item.html_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <code>{item.sha.slice(0, 7)}</code>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>在 GitHub 查看這個 Commit</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() =>
                            navigator.clipboard.writeText(item.sha)
                          }
                          className="bg-gray-100 text-black hover:bg-gray-300"
                        >
                          <Copy />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>複製完整 SHA {item.sha.slice(0, 7)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className=" absolute bottom-1 flex gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={item.author?.avatar_url || defaultAvatar}
                    />
                  </Avatar>
                  <span className="flex text-sm items-center gap-1">
                    <span className="text-sm text-blue-700">
                      {item.commit.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      has committed on{" "}
                      {new Date(item.commit.author.date).toLocaleDateString(
                        "zh-TW"
                      )}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
