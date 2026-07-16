import * as LucideIcons from "lucide-react";

export function DynamicIcon({ name, className }: { name: string, className?: string }) {
  // @ts-expect-error - LucideIcons is not fully typed for dynamic access
  const IconComponent = LucideIcons[name] || LucideIcons.Wrench;
  return <IconComponent className={className} />;
}
