// Back-compat barrel — existing imports of "@/lib/data" keep working.
// New code should import from the specific module instead.

export { siteConfig, navItems } from "@/lib/site-config";
export { experiences } from "@/lib/content/experiences";
export { skillCategories } from "@/lib/content/skills";
export { projects } from "@/lib/content/projects";
