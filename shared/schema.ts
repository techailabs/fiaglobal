import { pgTable, text, serial, integer, boolean, timestamp, uuid, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles enum
export const UserRole = z.enum([
  "admin",
  "csp_agent",
  "fi_agent",
  "auditor",
  "bank_officer",
  "customer"
]);

export const UserStatus = z.enum([
  "Active",
  "Suspended"
]);

export const TransactionType = z.enum([
  "AEPS",
  "BBPS",
  "Cash",
  "Withdrawal",
  "Direct Benefit"
]);

export const TransactionStatus = z.enum([
  "Completed",
  "Pending",
  "Failed"
]);

export const AuditStatus = z.enum([
  "Pending",
  "Completed",
  "NonCompliant"
]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<z.infer<typeof UserRole>>(),
  phone: text("phone").notNull(),
  status: text("status").notNull().$type<z.infer<typeof UserStatus>>().default("Active"),
  created_at: timestamp("created_at").defaultNow().notNull()
});

// Transactions Table
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  txn_type: text("txn_type").notNull().$type<z.infer<typeof TransactionType>>(),
  amount: integer("amount").notNull(),
  status: text("status").notNull().$type<z.infer<typeof TransactionStatus>>(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  gps_lat: doublePrecision("gps_lat"),
  gps_long: doublePrecision("gps_long"),
  description: text("description"),
  reference_id: text("reference_id"),
  csp_agent_id: uuid("csp_agent_id").references(() => users.id)
});

// Audits Table
export const audits = pgTable("audits", {
  id: uuid("id").primaryKey().defaultRandom(),
  auditor_id: uuid("auditor_id").references(() => users.id).notNull(),
  csp_id: uuid("csp_id").references(() => users.id).notNull(),
  photos: text("photos").array(),
  gps_lat: doublePrecision("gps_lat"),
  gps_long: doublePrecision("gps_long"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  hash: text("hash"),
  status: text("status").notNull().$type<z.infer<typeof AuditStatus>>(),
  findings: jsonb("findings"),
  scheduled_date: timestamp("scheduled_date")
});

// Complaints Table
export const complaints = pgTable("complaints", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  resolved_at: timestamp("resolved_at"),
  assigned_to: uuid("assigned_to").references(() => users.id)
});

// Alerts Table
export const alerts = pgTable("alerts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(),
  user_id: uuid("user_id").references(() => users.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  is_read: boolean("is_read").default(false)
});

// Face Checks Table
export const face_checks = pgTable("face_checks", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  transaction_id: uuid("transaction_id").references(() => transactions.id),
  check_result: boolean("check_result").notNull(),
  check_time: timestamp("check_time").defaultNow().notNull(),
  face_image_url: text("face_image_url")
});

// Relief Claims Table
export const relief_claims = pgTable("relief_claims", {
  id: uuid("id").primaryKey().defaultRandom(),
  csp_agent_id: uuid("csp_agent_id").references(() => users.id).notNull(),
  transaction_id: uuid("transaction_id").references(() => transactions.id),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull(),
  filed_date: timestamp("filed_date").defaultNow().notNull(),
  resolved_date: timestamp("resolved_date"),
  resolved_by: uuid("resolved_by").references(() => users.id)
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, created_at: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, timestamp: true });
export const insertAuditSchema = createInsertSchema(audits).omit({ id: true, timestamp: true });
export const insertComplaintSchema = createInsertSchema(complaints).omit({ id: true, created_at: true, resolved_at: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true, created_at: true });
export const insertFaceCheckSchema = createInsertSchema(face_checks).omit({ id: true, check_time: true });
export const insertReliefClaimSchema = createInsertSchema(relief_claims).omit({ id: true, filed_date: true, resolved_date: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Audit = typeof audits.$inferSelect;
export type InsertAudit = z.infer<typeof insertAuditSchema>;

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type FaceCheck = typeof face_checks.$inferSelect;
export type InsertFaceCheck = z.infer<typeof insertFaceCheckSchema>;

export type ReliefClaim = typeof relief_claims.$inferSelect;
export type InsertReliefClaim = z.infer<typeof insertReliefClaimSchema>;
