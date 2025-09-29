import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import {
  uuid,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

const id = (field: string) =>
  text(field)
    .primaryKey()
    .$default(() => randomUUID());

const createdAt = () =>
  text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

export const users = pgTable("users", {
  id: id("id"),
  createdAt: createdAt(),
  userName: text("username").notNull(),
  email: text("email").notNull().unique(),
});

export const projects = pgTable("projects", {
  id: id("id"),
  createdAt: createdAt(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Relación con el usuario
  name: text("name").notNull(), //
});

// Tabla para las tareas
export const tasks = pgTable("tasks", {
  id: id("id"),
  createdAt: createdAt(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }), // Relación con el proyecto
  // El contenido de la tarea original de Linear lo puedes incluir aquí
  // o guardarlo directamente dentro del JSON generado si la IA lo incluye.
  // json: El JSON generado por la IA, que contendrá tu lista TODO en markdown
  // y cualquier otra meta-información.
  data: jsonb("data").notNull(), // Usamos jsonb para guardar directamente el JSON generado por la IA
});

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;
//
// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
