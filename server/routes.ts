import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertTransactionSchema, 
  insertAuditSchema,
  insertComplaintSchema,
  insertAlertSchema,
  insertFaceCheckSchema,
  insertReliefClaimSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - all routes under /api
  const apiRouter = express.Router();
  app.use('/api', apiRouter);

  // User routes
  apiRouter.get('/users', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.get('/users/:id', async (req, res) => {
    try {
      const user = await storage.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.post('/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.patch('/users/:id', async (req, res) => {
    try {
      const user = await storage.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const updatedUser = await storage.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Transaction routes
  apiRouter.get('/transactions', async (req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.get('/transactions/:id', async (req, res) => {
    try {
      const transaction = await storage.getTransactionById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.post('/transactions', async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Audit routes
  apiRouter.get('/audits', async (req, res) => {
    try {
      const audits = await storage.getAllAudits();
      res.json(audits);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.get('/audits/:id', async (req, res) => {
    try {
      const audit = await storage.getAuditById(req.params.id);
      if (!audit) {
        return res.status(404).json({ error: 'Audit not found' });
      }
      res.json(audit);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.post('/audits', async (req, res) => {
    try {
      const auditData = insertAuditSchema.parse(req.body);
      const audit = await storage.createAudit(auditData);
      res.status(201).json(audit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Complaint routes
  apiRouter.get('/complaints', async (req, res) => {
    try {
      const complaints = await storage.getAllComplaints();
      res.json(complaints);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.post('/complaints', async (req, res) => {
    try {
      const complaintData = insertComplaintSchema.parse(req.body);
      const complaint = await storage.createComplaint(complaintData);
      res.status(201).json(complaint);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Alert routes
  apiRouter.get('/alerts', async (req, res) => {
    try {
      const alerts = await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.post('/alerts', async (req, res) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Face check routes
  apiRouter.post('/face-checks', async (req, res) => {
    try {
      const faceCheckData = insertFaceCheckSchema.parse(req.body);
      const faceCheck = await storage.createFaceCheck(faceCheckData);
      res.status(201).json(faceCheck);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Relief claim routes
  apiRouter.get('/relief-claims', async (req, res) => {
    try {
      const reliefClaims = await storage.getAllReliefClaims();
      res.json(reliefClaims);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  apiRouter.post('/relief-claims', async (req, res) => {
    try {
      const reliefClaimData = insertReliefClaimSchema.parse(req.body);
      const reliefClaim = await storage.createReliefClaim(reliefClaimData);
      res.status(201).json(reliefClaim);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
