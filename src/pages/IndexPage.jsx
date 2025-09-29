// src/pages/IndexPage.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Keyboard, Bolt, BarChart3, Activity, Filter, GitBranch } from "lucide-react";
import { useState } from "react";

export default function IndexPage() {
  const nav = useNavigate();
  const [repoQuery, setRepoQuery] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Hero */}
      <section className="rounded-2xl border p-6 md:p-8 bg-background/60">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="secondary">GitHub Issues Tracker</Badge>
            <h1 className="text-2xl md:text-3xl font-semibold">
              輕鬆整合多個 Repo 的 Issue：更快分流、掌握健康度、即時協作
            </h1>
            <p className="text-sm md:text-base opacity-80">
              一個專注在工程日常的作業台（Command Center）。從 Triage、我的佇列，到 KPI 與趨勢，一頁搞定。
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button onClick={() => {/* TODO: 觸發 OAuth / 引導連 GitHub */}}>連接 GitHub</Button>
              <Button variant="outline" onClick={() => nav("/projects/---leetcode---")}>
                先看範例專案
              </Button>
              <span className="text-xs opacity-60">（可在 Sidebar 選擇其他專案）</span>
            </div>
          </div>
          <div className="hidden md:block">
            <Illustration />
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" /> 1. 連接 / 選擇 Repo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm opacity-80">
              透過 OAuth 連 GitHub 或直接從左側 Sidebar 選擇公開 Repo。
            </p>
            <div className="flex items-center gap-2">
              <Input
                placeholder="輸入 repo 名稱（如：coffee-shop）"
                value={repoQuery}
                onChange={(e) => setRepoQuery(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (!repoQuery) return;
                  nav(`/projects/${repoQuery}`);
                }}
              >
                開啟
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" /> 2. 建立 Saved View
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm opacity-80">
              組合條件（如：<code>is:open label:bug assignee:me</code>），儲存為常用檢視，一鍵切換。
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline">Bug</Button>
              <Button variant="outline">Unassigned</Button>
              <Button variant="outline">High Priority</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bolt className="h-5 w-5" /> 3. 一鍵 Triage / 協作
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm opacity-80">
              在列表直接指派、加標籤、關閉或加入 Project；右側 Drawer 可快速回覆與編輯。
            </p>
            <div className="text-xs rounded-xl border p-2">
              技巧：滑過卡片出現快捷操作；支援 <code>a</code> 指派、<code>l</code> 標籤、<code>/</code> 搜尋。
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* 功能區塊摘要 */}
      <section className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={<Bolt className="h-5 w-5" />}
          title="Triage 作業台"
          desc="未分派 / 高優先 / 新進 Issue 集中處理，減少來回跳頁。"
        />
        <FeatureCard
          icon={<BarChart3 className="h-5 w-5" />}
          title="團隊健康度 KPI"
          desc="開啟數、7/30 日趨勢、平均回應/關閉時間、SLA 逾時等。"
        />
        <FeatureCard
          icon={<Activity className="h-5 w-5" />}
          title="事件流"
          desc="與我相關的 @mention、標籤變更、狀態轉移，集中追蹤。"
        />
      </section>

      {/* 快捷鍵小抬頭 */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" /> 快捷鍵一覽
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm grid sm:grid-cols-3 gap-2">
          <Shortcut k="j / k" v="上下移動" />
          <Shortcut k="a" v="指派" />
          <Shortcut k="l" v="標籤" />
          <Shortcut k="/" v="搜尋" />
          <Shortcut k="c" v="關閉 Issue" />
          <Shortcut k="o" v="開啟 Drawer" />
        </CardContent>
      </Card>

      {/* 空狀態引導（可依條件顯示） */}
      <EmptyHints />
    </div>
  );
}

function Illustration() {
  return (
    <div className="h-28 w-40 rounded-xl border bg-gradient-to-br from-background to-muted/50" />
  );
}
function FeatureCard({ icon, title, desc }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{icon}{title}</CardTitle>
      </CardHeader>
      <CardContent><p className="text-sm opacity-80">{desc}</p></CardContent>
    </Card>
  );
}
function Shortcut({ k, v }) {
  return (
    <div className="flex items-center gap-3">
      <kbd className="rounded-md border px-2 py-1 text-xs bg-muted/40">{k}</kbd>
      <span className="opacity-80">{v}</span>
    </div>
  );
}
function EmptyHints() {
  return (
    <div className="rounded-2xl border p-4 text-sm flex flex-col gap-2">
      <div className="font-medium">第一次使用？</div>
      <ul className="list-disc pl-5 space-y-1 opacity-80">
        <li>點「連接 GitHub」授權（或先用 Sidebar 選公開 Repo）。</li>
        <li>在專案頁選擇 Saved View（如 Bugs / Unassigned）開始分流。</li>
        <li>打開右側 Drawer 直接留言、改標籤、指派或關閉。</li>
      </ul>
    </div>
  );
}
