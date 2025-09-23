"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Braces,
  Download,
  Edit,
  GripVertical,
  History,
  Loader2,
  Plus,
  PlusCircle,
  RefreshCcw,
  Save,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import data from "../data.json";

export default function Home() {
  const rawContent = data[0].message.content;
  const jsonString = rawContent.replace(/^```json\s*/, "").replace(/```$/, "");
  const todoObject = JSON.parse(jsonString);

  console.log(todoObject);

  const tabsList = [
    {
      id: 1,
      title: "Task 1",
    },
    {
      id: 2,
      title: "Task 2",
    },
    {
      id: 3,
      title: "Task 3",
    },
  ];

  return (
    <Tabs defaultValue="Task 1" className="w-full">
      <TabsList className="w-full border-b gap-3 justify-start">
        {tabsList.map((t) => (
          <TabsTrigger key={t.id} value={t.title} className="max-w-[10rem]">
            {t.title}
          </TabsTrigger>
        ))}

        <TabsTrigger value="history" className="max-w-[10rem]">
          <History className="h-4 w-4 mr-2" />
          <span>History</span>
        </TabsTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-8 w-8 shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>New tab (⌘T)</p>
          </TooltipContent>
        </Tooltip>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
