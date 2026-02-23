import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Minimal schema to satisfy the build process.
// The frontend will actually use the mock data from @shared/mockData.ts.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
