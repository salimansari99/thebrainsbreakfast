import { z } from "zod";

export const ThoughtSchema = z.object({
  title: z.string().min(2),
  excerpt: z.string().min(2),
  content: z.string().min(2),
  category: z.string(),
  imageUrl: z.string().optional(),
  publishDate: z.string().optional(),
  author: z.string().optional(),
});
