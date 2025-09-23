import { Sparkles } from "lucide-react";
// import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b shrink-0">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold tracking-tight">No se todavia</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* <CommandMenu /> */}
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
