import { 
  users, User, InsertUser, 
  transactions, Transaction, InsertTransaction,
  audits, Audit, InsertAudit,
  complaints, Complaint, InsertComplaint,
  alerts, Alert, InsertAlert,
  face_checks, FaceCheck, InsertFaceCheck,
  relief_claims, ReliefClaim, InsertReliefClaim
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  
  // Transaction methods
  getTransactionById(id: string): Promise<Transaction | undefined>;
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionsByUserId(userId: string): Promise<Transaction[]>;
  getTransactionsByCspAgentId(cspAgentId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Audit methods
  getAuditById(id: string): Promise<Audit | undefined>;
  getAllAudits(): Promise<Audit[]>;
  getAuditsByAuditorId(auditorId: string): Promise<Audit[]>;
  getAuditsByCspId(cspId: string): Promise<Audit[]>;
  createAudit(audit: InsertAudit): Promise<Audit>;
  updateAudit(id: string, auditData: Partial<Audit>): Promise<Audit>;
  
  // Complaint methods
  getComplaintById(id: string): Promise<Complaint | undefined>;
  getAllComplaints(): Promise<Complaint[]>;
  getComplaintsByUserId(userId: string): Promise<Complaint[]>;
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  updateComplaint(id: string, complaintData: Partial<Complaint>): Promise<Complaint>;
  
  // Alert methods
  getAlertById(id: string): Promise<Alert | undefined>;
  getAllAlerts(): Promise<Alert[]>;
  getAlertsByUserId(userId: string): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(id: string): Promise<Alert>;
  
  // Face Check methods
  getFaceCheckById(id: string): Promise<FaceCheck | undefined>;
  getFaceChecksByUserId(userId: string): Promise<FaceCheck[]>;
  createFaceCheck(faceCheck: InsertFaceCheck): Promise<FaceCheck>;
  
  // Relief Claim methods
  getReliefClaimById(id: string): Promise<ReliefClaim | undefined>;
  getAllReliefClaims(): Promise<ReliefClaim[]>;
  getReliefClaimsByCspAgentId(cspAgentId: string): Promise<ReliefClaim[]>;
  createReliefClaim(reliefClaim: InsertReliefClaim): Promise<ReliefClaim>;
  updateReliefClaim(id: string, reliefClaimData: Partial<ReliefClaim>): Promise<ReliefClaim>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;
  private audits: Map<string, Audit>;
  private complaints: Map<string, Complaint>;
  private alerts: Map<string, Alert>;
  private faceChecks: Map<string, FaceCheck>;
  private reliefClaims: Map<string, ReliefClaim>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.audits = new Map();
    this.complaints = new Map();
    this.alerts = new Map();
    this.faceChecks = new Map();
    this.reliefClaims = new Map();
    
    // Initialize with seed data
    this.seedData();
  }

  // User methods
  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const user: User = {
      id,
      ...userData,
      created_at: now
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    
    return updatedUser;
  }

  // Transaction methods
  async getTransactionById(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(tx => tx.user_id === userId);
  }

  async getTransactionsByCspAgentId(cspAgentId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(tx => tx.csp_agent_id === cspAgentId);
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const transaction: Transaction = {
      id,
      ...transactionData,
      timestamp: now
    };
    
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Audit methods
  async getAuditById(id: string): Promise<Audit | undefined> {
    return this.audits.get(id);
  }

  async getAllAudits(): Promise<Audit[]> {
    return Array.from(this.audits.values());
  }

  async getAuditsByAuditorId(auditorId: string): Promise<Audit[]> {
    return Array.from(this.audits.values()).filter(audit => audit.auditor_id === auditorId);
  }

  async getAuditsByCspId(cspId: string): Promise<Audit[]> {
    return Array.from(this.audits.values()).filter(audit => audit.csp_id === cspId);
  }

  async createAudit(auditData: InsertAudit): Promise<Audit> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const audit: Audit = {
      id,
      ...auditData,
      timestamp: now
    };
    
    this.audits.set(id, audit);
    return audit;
  }

  async updateAudit(id: string, auditData: Partial<Audit>): Promise<Audit> {
    const audit = this.audits.get(id);
    
    if (!audit) {
      throw new Error(`Audit with ID ${id} not found`);
    }
    
    const updatedAudit = { ...audit, ...auditData };
    this.audits.set(id, updatedAudit);
    
    return updatedAudit;
  }

  // Complaint methods
  async getComplaintById(id: string): Promise<Complaint | undefined> {
    return this.complaints.get(id);
  }

  async getAllComplaints(): Promise<Complaint[]> {
    return Array.from(this.complaints.values());
  }

  async getComplaintsByUserId(userId: string): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).filter(complaint => complaint.user_id === userId);
  }

  async createComplaint(complaintData: InsertComplaint): Promise<Complaint> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const complaint: Complaint = {
      id,
      ...complaintData,
      created_at: now,
      resolved_at: null
    };
    
    this.complaints.set(id, complaint);
    return complaint;
  }

  async updateComplaint(id: string, complaintData: Partial<Complaint>): Promise<Complaint> {
    const complaint = this.complaints.get(id);
    
    if (!complaint) {
      throw new Error(`Complaint with ID ${id} not found`);
    }
    
    const updatedComplaint = { ...complaint, ...complaintData };
    this.complaints.set(id, updatedComplaint);
    
    return updatedComplaint;
  }

  // Alert methods
  async getAlertById(id: string): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getAlertsByUserId(userId: string): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => alert.user_id === userId);
  }

  async createAlert(alertData: InsertAlert): Promise<Alert> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const alert: Alert = {
      id,
      ...alertData,
      created_at: now,
      is_read: false
    };
    
    this.alerts.set(id, alert);
    return alert;
  }

  async markAlertAsRead(id: string): Promise<Alert> {
    const alert = this.alerts.get(id);
    
    if (!alert) {
      throw new Error(`Alert with ID ${id} not found`);
    }
    
    const updatedAlert = { ...alert, is_read: true };
    this.alerts.set(id, updatedAlert);
    
    return updatedAlert;
  }

  // Face Check methods
  async getFaceCheckById(id: string): Promise<FaceCheck | undefined> {
    return this.faceChecks.get(id);
  }

  async getFaceChecksByUserId(userId: string): Promise<FaceCheck[]> {
    return Array.from(this.faceChecks.values()).filter(check => check.user_id === userId);
  }

  async createFaceCheck(faceCheckData: InsertFaceCheck): Promise<FaceCheck> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const faceCheck: FaceCheck = {
      id,
      ...faceCheckData,
      check_time: now
    };
    
    this.faceChecks.set(id, faceCheck);
    return faceCheck;
  }

  // Relief Claim methods
  async getReliefClaimById(id: string): Promise<ReliefClaim | undefined> {
    return this.reliefClaims.get(id);
  }

  async getAllReliefClaims(): Promise<ReliefClaim[]> {
    return Array.from(this.reliefClaims.values());
  }

  async getReliefClaimsByCspAgentId(cspAgentId: string): Promise<ReliefClaim[]> {
    return Array.from(this.reliefClaims.values()).filter(claim => claim.csp_agent_id === cspAgentId);
  }

  async createReliefClaim(reliefClaimData: InsertReliefClaim): Promise<ReliefClaim> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const reliefClaim: ReliefClaim = {
      id,
      ...reliefClaimData,
      filed_date: now,
      resolved_date: null
    };
    
    this.reliefClaims.set(id, reliefClaim);
    return reliefClaim;
  }

  async updateReliefClaim(id: string, reliefClaimData: Partial<ReliefClaim>): Promise<ReliefClaim> {
    const reliefClaim = this.reliefClaims.get(id);
    
    if (!reliefClaim) {
      throw new Error(`Relief claim with ID ${id} not found`);
    }
    
    const updatedReliefClaim = { ...reliefClaim, ...reliefClaimData };
    this.reliefClaims.set(id, updatedReliefClaim);
    
    return updatedReliefClaim;
  }

  // Seed data for demo
  private seedData() {
    // Create users with different roles
    const admin = this.createUser({
      full_name: 'Admin User',
      email: 'admin@fia.com',
      password: 'password123',
      role: 'admin',
      phone: '9876543210',
      status: 'Active'
    });

    const csp1 = this.createUser({
      full_name: 'Rohit Kumar',
      email: 'csp1@fia.com',
      password: 'password123',
      role: 'csp_agent',
      phone: '9876543211',
      status: 'Active'
    });

    const csp2 = this.createUser({
      full_name: 'Priya Sharma',
      email: 'csp2@fia.com',
      password: 'password123',
      role: 'csp_agent',
      phone: '9876543212',
      status: 'Active'
    });

    const fiAgent = this.createUser({
      full_name: 'Anjali Gupta',
      email: 'fi@fia.com',
      password: 'password123',
      role: 'fi_agent',
      phone: '9876543213',
      status: 'Active'
    });

    const auditor1 = this.createUser({
      full_name: 'Amit Verma',
      email: 'auditor@fia.com',
      password: 'password123',
      role: 'auditor',
      phone: '9876543214',
      status: 'Active'
    });

    const auditor2 = this.createUser({
      full_name: 'Neha Singh',
      email: 'auditor2@fia.com',
      password: 'password123',
      role: 'auditor',
      phone: '9876543215',
      status: 'Active'
    });

    const officer = this.createUser({
      full_name: 'Sunil Mehta',
      email: 'officer@fia.com',
      password: 'password123',
      role: 'bank_officer',
      phone: '9876543216',
      status: 'Active'
    });

    const customer1 = this.createUser({
      full_name: 'Ananya Patel',
      email: 'customer@fia.com',
      password: 'password123',
      role: 'customer',
      phone: '9876543217',
      status: 'Active'
    });

    const customer2 = this.createUser({
      full_name: 'Rajesh Kumar',
      email: 'customer2@fia.com',
      password: 'password123',
      role: 'customer',
      phone: '9876543218',
      status: 'Active'
    });

    const customer3 = this.createUser({
      full_name: 'Lakshmi Devi',
      email: 'customer3@fia.com',
      password: 'password123',
      role: 'customer',
      phone: '9876543219',
      status: 'Active'
    });

    // Create sample transactions
    this.createTransaction({
      user_id: customer1.id,
      txn_type: 'Cash',
      amount: 4000,
      status: 'Completed',
      gps_lat: 28.6139,
      gps_long: 77.2090,
      description: 'Cash Deposit - CSP Ganeshpur',
      reference_id: 'TXN-5639',
      csp_agent_id: csp1.id
    });

    this.createTransaction({
      user_id: customer2.id,
      txn_type: 'BBPS',
      amount: 1750,
      status: 'Completed',
      gps_lat: 28.6139,
      gps_long: 77.2090,
      description: 'Mobile Recharge - Jio',
      reference_id: 'TXN-5638',
      csp_agent_id: csp1.id
    });

    this.createTransaction({
      user_id: customer3.id,
      txn_type: 'Cash',
      amount: 5000,
      status: 'Pending',
      gps_lat: 28.6139,
      gps_long: 77.2090,
      description: 'Cash Deposit',
      reference_id: 'TXN-5637',
      csp_agent_id: csp2.id
    });

    this.createTransaction({
      user_id: customer1.id,
      txn_type: 'AEPS',
      amount: 3200,
      status: 'Failed',
      gps_lat: 28.6139,
      gps_long: 77.2090,
      description: 'Cash Withdrawal',
      reference_id: 'TXN-5636',
      csp_agent_id: csp2.id
    });

    this.createTransaction({
      user_id: customer2.id,
      txn_type: 'BBPS',
      amount: 249,
      status: 'Completed',
      gps_lat: 28.6139,
      gps_long: 77.2090,
      description: 'Mobile Recharge - Jio',
      reference_id: 'TXN-5635',
      csp_agent_id: csp1.id
    });

    this.createTransaction({
      user_id: customer1.id,
      txn_type: 'AEPS',
      amount: 2000,
      status: 'Completed',
      gps_lat: 28.6139,
      gps_long: 77.2090,
      description: 'Cash Withdrawal - CSP Ganeshpur',
      reference_id: 'TXN-5634',
      csp_agent_id: csp1.id
    });

    this.createTransaction({
      user_id: customer1.id,
      txn_type: 'Direct Benefit',
      amount: 2000,
      status: 'Completed',
      description: 'PM Kisan Credit',
      reference_id: 'TXN-5633'
    });

    // Create sample audits
    this.createAudit({
      auditor_id: auditor1.id,
      csp_id: csp1.id,
      photos: ["audit_photo_1.jpg", "audit_photo_2.jpg"],
      gps_lat: 28.6139,
      gps_long: 77.2090,
      hash: "a1b2c3d4e5f6g7h8i9j0",
      status: 'Completed',
      findings: { compliance: true, notes: "All operations in order" },
      scheduled_date: new Date("2023-05-01T10:00:00Z")
    });

    this.createAudit({
      auditor_id: auditor2.id,
      csp_id: csp2.id,
      photos: ["audit_photo_3.jpg", "audit_photo_4.jpg"],
      gps_lat: 19.0760,
      gps_long: 72.8777,
      hash: "k1l2m3n4o5p6q7r8s9t0",
      status: 'NonCompliant',
      findings: { compliance: false, issues: ["KYC documentation incomplete", "System not updated"] },
      scheduled_date: new Date("2023-04-28T14:00:00Z")
    });

    const futureDate1 = new Date();
    futureDate1.setDate(futureDate1.getDate() + 1);
    
    const futureDate2 = new Date();
    futureDate2.setDate(futureDate2.getDate() + 3);

    this.createAudit({
      auditor_id: auditor1.id,
      csp_id: csp1.id,
      status: 'Pending',
      scheduled_date: new Date()
    });

    this.createAudit({
      auditor_id: auditor1.id,
      csp_id: csp2.id,
      status: 'Pending',
      scheduled_date: futureDate1
    });

    this.createAudit({
      auditor_id: auditor2.id,
      csp_id: csp2.id,
      status: 'Pending',
      scheduled_date: futureDate2
    });

    // Create sample complaints
    this.createComplaint({
      user_id: customer1.id,
      subject: "Transaction failed but amount debited",
      description: "I tried to withdraw money but the transaction failed. However, the amount was debited from my account.",
      status: "Open",
      assigned_to: officer.id
    });

    this.createComplaint({
      user_id: customer2.id,
      subject: "CSP agent behavior",
      description: "The CSP agent was not helpful and refused to assist with my transaction.",
      status: "Under Review",
      assigned_to: officer.id
    });

    // Create sample alerts
    this.createAlert({
      title: "Face verification failed",
      description: "Face verification failed 3 times for CSP Agent Rohit Kumar (ID: CSP-128)",
      severity: "critical",
      user_id: admin.id
    });

    this.createAlert({
      title: "Unusual transaction pattern",
      description: "Unusual transaction pattern detected in Chandigarh (5 transactions)",
      severity: "warning",
      user_id: admin.id
    });

    this.createAlert({
      title: "System update completed",
      description: "System update to version 2.5.1 deployed successfully to all agents",
      severity: "info",
      user_id: admin.id
    });

    // Create sample face checks
    this.createFaceCheck({
      user_id: csp1.id,
      check_result: true,
      face_image_url: "face_check_1.jpg"
    });

    this.createFaceCheck({
      user_id: csp2.id,
      check_result: false,
      face_image_url: "face_check_2.jpg"
    });

    // Create sample relief claims
    this.createReliefClaim({
      csp_agent_id: csp1.id,
      amount: 2500,
      reason: "System error caused transaction failure",
      status: "Pending"
    });

    this.createReliefClaim({
      csp_agent_id: csp2.id,
      amount: 3750,
      reason: "Network issue led to duplicate transaction",
      status: "Under Review"
    });

    this.createReliefClaim({
      csp_agent_id: csp1.id,
      amount: 1200,
      reason: "Customer dispute resolution",
      status: "Pending"
    });

    this.createReliefClaim({
      csp_agent_id: csp2.id,
      amount: 4500,
      reason: "Power outage during transaction",
      status: "Under Review"
    });
  }
}

export const storage = new MemStorage();
