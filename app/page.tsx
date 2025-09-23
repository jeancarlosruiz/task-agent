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
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const [activeProject, setActiveProject] = useState({
    name: "Demo Project",
    tasks: [
      {
        id: "1",
        title: "Task 1",
        status: "draft",
        taskDescription: "",
        todos: [],
      },
    ],
  });

  const [completedTasks, setCompletedTasks] = useState([
    { id: "c1", text: "Completed task example" },
  ]);

  // ---- Mocked handlers ----
  const handleCloseTab = (e: any, taskId: string) => {
    e.stopPropagation();
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== taskId),
    }));
    if (activeTab === taskId && prev.tasks.length > 1) {
      setActiveTab(prev.tasks[0].id);
    }
  };

  const handleAddNewTab = () => {
    const newId = Date.now().toString();
    setActiveProject((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: newId,
          title: `Task ${prev.tasks.length + 1}`,
          status: "draft",
          taskDescription: "",
          todos: [],
        },
      ],
    }));
    setActiveTab(newId);
  };

  const updateTask = (taskId: string, updates: any) => {
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updates } : t,
      ),
    }));
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Add some dummy todos to first task
      setActiveProject((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === activeTab
            ? {
                ...t,
                status: "generated",
                todos: [
                  {
                    id: "todo1",
                    text: "First generated todo",
                    completed: false,
                  },
                  {
                    id: "todo2",
                    text: "Second generated todo",
                    completed: false,
                  },
                ],
              }
            : t,
        ),
      }));
    }, 1000);
  };

  const handleResetTask = () => {
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === activeTab ? { ...t, status: "draft", todos: [] } : t,
      ),
    }));
    setIsEditing(false);
  };

  const handleDownloadMarkdown = () => {
    alert("Download Markdown clicked");
  };

  const handleToggleTodo = (todoId: string) => {
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === activeTab
          ? {
              ...t,
              todos: t.todos.map((todo) =>
                todo.id === todoId
                  ? { ...todo, completed: !todo.completed }
                  : todo,
              ),
            }
          : t,
      ),
    }));
  };

  const handleEditTodoText = (todoId: string, newText: string) => {
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === activeTab
          ? {
              ...t,
              todos: t.todos.map((todo) =>
                todo.id === todoId ? { ...todo, text: newText } : todo,
              ),
            }
          : t,
      ),
    }));
  };

  const handleDeleteTodo = (todoId: string) => {
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === activeTab
          ? { ...t, todos: t.todos.filter((todo) => todo.id !== todoId) }
          : t,
      ),
    }));
  };

  const handleAddNewTodo = () => {
    if (!newTaskText.trim()) return;
    setActiveProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === activeTab
          ? {
              ...t,
              todos: [
                ...t.todos,
                {
                  id: Date.now().toString(),
                  text: newTaskText,
                  completed: false,
                },
              ],
            }
          : t,
      ),
    }));
    setNewTaskText("");
  };
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col h-full"
    >
      <div className="flex items-center border-b">
        <TabsList className="bg-transparent p-0 border-0 rounded-none">
          {activeProject.tasks.map((task) => (
            <TabsTrigger
              key={task.id}
              value={task.id}
              className="data-[state=active]:bg-background data-[state=active]:shadow-none -mb-px border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-10"
            >
              <Braces className="h-4 w-4 mr-2" />
              <span>{task.title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-2 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    onClick={(e) => handleCloseTab(e, task.id)}
                    disabled={activeProject.tasks.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close tab (⌘W)</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
          ))}
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-background data-[state=active]:shadow-none -mb-px border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-10"
          >
            <History className="h-4 w-4 mr-2" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddNewTab}
              className="ml-2 h-8 w-8 shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>New tab (⌘T)</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {activeProject.tasks.map((task) => (
        <TabsContent
          key={task.id}
          value={task.id}
          className="flex-1 mt-4 focus-visible:ring-0 overflow-y-auto"
        >
          <Card className="h-full border-0 shadow-none bg-transparent">
            <CardContent className="p-1 h-full">
              {task.status === "draft" ? (
                <div className="grid md:grid-cols-2 gap-6 h-full">
                  <div className="flex flex-col gap-4">
                    <Label
                      htmlFor={`task-description-${task.id}`}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      1. Paste your task
                    </Label>
                    <Textarea
                      id={`task-description-${task.id}`}
                      placeholder="e.g., 'Launch the new marketing campaign for Q3...'"
                      value={task.taskDescription}
                      onChange={(e) =>
                        updateTask(task.id, { taskDescription: e.target.value })
                      }
                      className="flex-1 text-base resize-none"
                      aria-label="Task Description"
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleGenerate}
                          disabled={isLoading}
                          className="w-full md:w-auto"
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                          )}
                          Generate TODO List
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate (⌘G)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="todo-list"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        2. Complete your tasks
                      </Label>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <p>Your generated tasks will appear here.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="todo-list"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Your generated TODO list
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetTask}
                      >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Start Over
                      </Button>
                      {isEditing ? (
                        <Button size="sm" onClick={() => setIsEditing(false)}>
                          <Save className="mr-2 h-4 w-4" />
                          Done
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadMarkdown}
                        disabled={!task.todos.length}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download MD
                      </Button>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div
                        droppableId={`droppable-${task.id}`}
                        isDropDisabled={isEditing}
                      >
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {task.todos.length > 0 ? (
                              <ScrollArea className="h-[calc(100vh-250px)]">
                                <div className="space-y-2">
                                  {task.todos.map((todo, index) => (
                                    <div
                                      key={todo.id}
                                      draggableId={todo.id}
                                      index={index}
                                      isDragDisabled={isEditing}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className="flex items-center group space-x-2 p-2 rounded-md bg-transparent hover:bg-muted"
                                        >
                                          {!isEditing && (
                                            <div
                                              {...provided.dragHandleProps}
                                              className="text-muted-foreground"
                                            >
                                              <GripVertical className="h-5 w-5" />
                                            </div>
                                          )}
                                          <Checkbox
                                            id={todo.id}
                                            checked={todo.completed}
                                            onCheckedChange={() =>
                                              handleToggleTodo(todo.id)
                                            }
                                            disabled={isEditing}
                                          />
                                          {isEditing ? (
                                            <Input
                                              value={todo.text}
                                              onChange={(e) =>
                                                handleEditTodoText(
                                                  todo.id,
                                                  e.target.value,
                                                )
                                              }
                                              className="h-8"
                                            />
                                          ) : (
                                            <Label
                                              htmlFor={todo.id}
                                              className={`flex-1 text-sm ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                                            >
                                              {todo.text}
                                            </Label>
                                          )}
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                                            onClick={() =>
                                              handleDeleteTodo(todo.id)
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                  {provided.placeholder}
                                  {isEditing && (
                                    <div className="flex items-center space-x-2 p-2">
                                      <PlusCircle className="h-5 w-5 text-muted-foreground" />
                                      <Input
                                        placeholder="Add new task"
                                        value={newTaskText}
                                        onChange={(e) =>
                                          setNewTaskText(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                          e.key === "Enter" &&
                                          handleAddNewTodo()
                                        }
                                        className="h-8 flex-1"
                                      />
                                      <Button
                                        size="sm"
                                        onClick={handleAddNewTodo}
                                      >
                                        Add
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </ScrollArea>
                            ) : (
                              <div className="flex items-center justify-center h-full text-muted-foreground">
                                {isEditing ? (
                                  <div className="flex items-center space-x-2 p-2 w-full">
                                    <PlusCircle className="h-5 w-5 text-muted-foreground" />
                                    <Input
                                      placeholder="Add new task"
                                      value={newTaskText}
                                      onChange={(e) =>
                                        setNewTaskText(e.target.value)
                                      }
                                      onKeyDown={(e) =>
                                        e.key === "Enter" && handleAddNewTodo()
                                      }
                                      className="h-8 flex-1"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={handleAddNewTodo}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                ) : (
                                  <p>
                                    No tasks here. Generate a new list to get
                                    started.
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
      <TabsContent
        value="history"
        className="flex-1 mt-4 focus-visible:ring-0 overflow-y-auto"
      >
        <Card className="h-full border-0 shadow-none bg-transparent">
          <CardContent className="p-1 h-full">
            <div className="flex flex-col gap-4 h-full">
              <Label className="text-sm font-medium text-muted-foreground">
                Completed Tasks for {activeProject.name}
              </Label>
              <Card className="flex-1">
                <CardContent className="p-4">
                  {completedTasks.length > 0 ? (
                    <ScrollArea className="h-[calc(100vh-220px)]">
                      <div className="space-y-2">
                        {completedTasks.map((task) => (
                          <div
                            key={task.id}
                            className="text-sm text-muted-foreground line-through"
                          >
                            {task.text}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>
                        Completed tasks for this project will be shown here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
