import { Template } from "@/types/template";
import { ALL_TEMPLATES } from "@/templates/index";

/**
 * Get all available templates
 * Templates are imported directly to ensure they're included in the build
 */
export async function getAllTemplates(): Promise<Template[]> {
  return ALL_TEMPLATES;
}

/**
 * Get a specific template by ID
 */
export async function getTemplateById(id: string): Promise<Template | null> {
  const template = ALL_TEMPLATES.find(t => t.id === id);
  return template || null;
}

/**
 * Get templates by category
 */
export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  return ALL_TEMPLATES.filter(t => t.category === category);
}

/**
 * Get all unique template categories
 */
export async function getTemplateCategories(): Promise<string[]> {
  const categories = new Set(ALL_TEMPLATES.map(t => t.category));
  return Array.from(categories);
}
