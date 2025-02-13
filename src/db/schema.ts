import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp, 
    date 
} from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    passwordHash: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

const projectsTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    dueDate: date("dueDate"),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

const tasksTable = pgTable("tasks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: integer().notNull(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    priority: integer().notNull(),
    dueDate: date("dueDate"),
    isCompleted: boolean().default(false),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull(),
    name: varchar({ length: 255 }).notNull(),
});

export {
    usersTable,
    projectsTable,
    tasksTable,
    categoriesTable
};