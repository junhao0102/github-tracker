import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Readme from "@/components/tabs/Readme";
import Commits from "@/components/tabs/Commits";
export function RepositoryHeader({ repoInfo }) {
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

export function RepositoryTabs() {
  return (
    <Tabs defaultValue="repo">
      <TabsList className="w-full">
        <TabsTrigger value="repo" className="w-1/4">
          Repo
        </TabsTrigger>
        <TabsTrigger value="commit" className="w-1/4">
          commit
        </TabsTrigger>
        <TabsTrigger value="issue" className="w-1/4">
          Issues
        </TabsTrigger>
        <TabsTrigger value="PR" className="w-1/4">
          Pull Request
        </TabsTrigger>
      </TabsList>
      <TabsContent value="repo">
        <Readme />
      </TabsContent>
      <TabsContent value="commit">
        <Commits />
      </TabsContent>
      <TabsContent value="issue">issue</TabsContent>
      <TabsContent value="PR">pr</TabsContent>
    </Tabs>
  );
}

export default function Repository() {
  const { repoName } = useParams();
  const [repoInfo, setRepoInfo] = useState();

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

  useEffect(() => {
    fetchRepoInfo();
  }, [repoName]);

  return (
    <div>
      {repoInfo ? (
        <div className="space-y-10">
          <RepositoryHeader repoInfo={repoInfo} />
          <RepositoryTabs />
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}
