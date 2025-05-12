import {
  integer,
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Table Definition
export const files = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  // basic file?folder info
  name: text("name").notNull(),
  path: text("path").notNull(), // /documents/projects/resume.pdf
  size: integer("size").notNull(),
  type: text("type").notNull(), // file or folder

  //storage info
  fileUrl: text("file_url").notNull(), //  url to access file
  thumbnailUrl: text("thumbnail_url"), // url to access thumbnail

  //ownership info
  userId: uuid("user_id").notNull(), // user who uploaded the file
  parentId: uuid("parent_id"), // parent folder id if null for root item

  //file/folder flags
  isFolder: boolean("is_folder").notNull().default(false),
  isStarred: boolean("is_starred").notNull().default(false),
  isTrash: boolean("is_trash").notNull().default(false),

  // timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//Relations
export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),
  //relationship to child file/folder
  children: many(files),
}));

// Type Inference defination
export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
