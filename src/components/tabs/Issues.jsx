import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Issues() {
  const { repoName } = useParams();
  const [issues, setIssues] = useState([]);
  const OWNER = import.meta.env.VITE_GITHUB_OWNER;

  async function fetchIssues() {
    try {
      const response = await api.get(
        `/repos/${OWNER}/${repoName}/issues?state=all`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      console.log(response.data);
      setIssues(response.data);
    } catch (e) {
      setIssues([]);
      console.error("fetch issues error :" + e.message);
    }
  }

  useEffect(() => {
    fetchIssues();
  }, [repoName]);

  return issues.length !== 0 ? (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {issues.map((item) => (
            <Card className="m-2" key={item.id}>
              <CardContent className="space-y-3 pt-2 pb-2">
                <div className="flex gap-2 items-center">
                  <h2 className="text-lg font-semibold break-words">
                    {item.title}
                  </h2>
                  <span
                    className={`text-xs font-medium capitalize rounded-full px-2 py-0.5 border ${
                      item.state === "open"
                        ? "border-green-400 text-green-700 bg-green-50"
                        : "border-gray-300 text-gray-600 bg-gray-100"
                    }`}
                  >
                    {item.state}
                  </span>
                </div>

                {item.body ? (
                  <p className="text-sm text-muted-foreground border-l-2 border-muted pl-3 leading-relaxed line-clamp-3">
                    {item.body}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    (No description)
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <img
                      src={item.user?.avatar_url}
                      alt={item.user?.login}
                      className="w-6 h-6 rounded-full "
                    />
                    <span className="text-sm text-blue-600 mx-2">
                      {item.user?.login}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      opened on{" "}
                      {new Date(item.created_at).toLocaleDateString("zh-TW")}
                    </span>
                  </div>
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
                          {" "}
                          💬 {item.comments ?? 0} comments
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>在 GitHub 查看這個 Issue</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  ) : (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">沒有任何 issue </div>
        </CardContent>
      </Card>
    </article>
  );
}
