import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeProvider";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between  gap-24">
      <Label htmlFor="theme-switch">
        {theme === "dark" ? "深色主題" : "淺色主題"}
      </Label>
      <Switch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="data-[state=checked]:bg-green-500 "
      />
    </div>
  );
}
