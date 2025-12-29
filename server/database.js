const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Database file path
const dbDir = path.join(__dirname, '..', 'db');
const dbPath = path.join(dbDir, 'oshsharohi.db');

let db = null;
let SQL = null;

// Initialize database
async function initializeDatabase() {
  // Ensure db directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Initialize SQL.js
  SQL = await initSqlJs();

  // Load existing database or create new one
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      title TEXT,
      description TEXT,
      subteam TEXT NOT NULL,
      color TEXT DEFAULT 'brand-red',
      image_path TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sub_teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      description TEXT,
      goals TEXT,
      achievements TEXT
    );
  `);

  // Save database
  saveDatabase();

  console.log('Database initialized successfully');
  return db;
}

// Save database to file
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

// Get all team members
function getAllTeamMembers() {
  const stmt = db.prepare('SELECT * FROM team_members ORDER BY subteam, display_order');
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// Get team members by subteam
function getTeamMembersBySubteam(subteam) {
  const stmt = db.prepare('SELECT * FROM team_members WHERE subteam = ? ORDER BY display_order');
  stmt.bind([subteam]);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// Insert team member
function insertTeamMember(member) {
  db.run(`
    INSERT INTO team_members (name, role, title, description, subteam, color, image_path, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [member.name, member.role, member.title, member.description, member.subteam, member.color, member.image_path, member.display_order]);
  saveDatabase();
}

// Get all sub-teams
function getAllSubTeams() {
  const stmt = db.prepare('SELECT * FROM sub_teams');
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// Get sub-team by ID
function getSubTeamById(id) {
  const stmt = db.prepare('SELECT * FROM sub_teams WHERE id = ?');
  stmt.bind([id]);
  let result = null;
  if (stmt.step()) {
    result = stmt.getAsObject();
  }
  stmt.free();
  return result;
}

// Insert sub-team
function insertSubTeam(team) {
  db.run(`
    INSERT OR REPLACE INTO sub_teams (id, name, icon, description, goals, achievements)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [team.id, team.name, team.icon, team.description, team.goals, team.achievements]);
  saveDatabase();
}

// Clear tables
function clearTables() {
  db.run('DELETE FROM team_members');
  db.run('DELETE FROM sub_teams');
  saveDatabase();
  console.log('Tables cleared');
}

// Get database instance
function getDb() {
  return db;
}

module.exports = {
  initializeDatabase,
  saveDatabase,
  getDb,
  getAllTeamMembers,
  getTeamMembersBySubteam,
  insertTeamMember,
  getAllSubTeams,
  getSubTeamById,
  insertSubTeam,
  clearTables
};
