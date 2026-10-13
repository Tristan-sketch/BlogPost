import { Beef, BookMarked, Dumbbell, Ellipsis, Users } from "lucide-react";

export const THEMES = [
  { value: "Dumbbell", label: "Sport & Fitness", Icon: Dumbbell },
  { value: "BookMarked", label: "Learning", Icon: BookMarked },
  { value: "Beef", label: "Food", Icon: Beef },
  { value: "Users", label: "Friends & Family", Icon: Users },
  { value: "Ellipsis", label: "Other", Icon: Ellipsis },
] as const;

export function isTheme(value: string) {
  return THEMES.some((theme) => theme.value === value);
}

export function ThemeIcon({ theme }: { theme: string | null }) {
  const { Icon } = THEMES.find((t) => t.value === theme) ?? THEMES[THEMES.length - 1];
  return <Icon />;
}
