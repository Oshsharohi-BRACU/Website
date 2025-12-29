const express = require('express');
const cors = require('cors');
const path = require('path');
const {
    initializeDatabase,
    getAllTeamMembers,
    getTeamMembersBySubteam,
    getAllSubTeams,
    getSubTeamById
} = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

// Serve static assets (images)
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// API Routes

// Get all team members
app.get('/api/team-members', (req, res) => {
    try {
        const members = getAllTeamMembers();
        res.json({
            success: true,
            data: members,
            count: members.length
        });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch team members' });
    }
});

// Get team members by subteam
app.get('/api/team-members/:subteam', (req, res) => {
    try {
        const { subteam } = req.params;
        const members = getTeamMembersBySubteam(subteam);
        res.json({
            success: true,
            data: members,
            count: members.length
        });
    } catch (error) {
        console.error('Error fetching team members by subteam:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch team members' });
    }
});

// Get team members grouped by subteam
app.get('/api/team-members-grouped', (req, res) => {
    try {
        const members = getAllTeamMembers();

        // Group by subteam
        const grouped = members.reduce((acc, member) => {
            if (!acc[member.subteam]) {
                acc[member.subteam] = [];
            }
            acc[member.subteam].push({
                id: member.id,
                name: member.name,
                role: member.role,
                title: member.title,
                description: member.description,
                color: member.color,
                img: member.image_path
            });
            return acc;
        }, {});

        res.json({
            success: true,
            data: grouped
        });
    } catch (error) {
        console.error('Error fetching grouped team members:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch team members' });
    }
});

// Get all sub-teams
app.get('/api/sub-teams', (req, res) => {
    try {
        const subTeams = getAllSubTeams();

        // Parse JSON strings back to arrays
        const parsed = subTeams.map(team => ({
            ...team,
            goals: JSON.parse(team.goals || '[]'),
            achievements: JSON.parse(team.achievements || '[]')
        }));

        res.json({
            success: true,
            data: parsed,
            count: parsed.length
        });
    } catch (error) {
        console.error('Error fetching sub-teams:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch sub-teams' });
    }
});

// Get sub-team by ID with members
app.get('/api/sub-teams/:id', (req, res) => {
    try {
        const { id } = req.params;
        const subTeam = getSubTeamById(id);

        if (!subTeam) {
            return res.status(404).json({ success: false, error: 'Sub-team not found' });
        }

        // Get members for this subteam (map subteam id to subteam name)
        const subteamNameMap = {
            'chassis': 'Chassis & Suspension',
            'powertrain': 'Electronics & Powertrain',
            'dynamics': 'Chassis & Suspension',
            'autonomous': 'Electronics & Powertrain',
            'management': 'Business & Marketing',
            'rnd': 'Electronics & Powertrain'
        };

        const members = getTeamMembersBySubteam(subteamNameMap[id] || id);

        res.json({
            success: true,
            data: {
                ...subTeam,
                goals: JSON.parse(subTeam.goals || '[]'),
                achievements: JSON.parse(subTeam.achievements || '[]'),
                members: members.map(m => ({
                    id: m.id.toString(),
                    name: m.name,
                    role: m.title || m.role,
                    image: m.image_path
                }))
            }
        });
    } catch (error) {
        console.error('Error fetching sub-team:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch sub-team' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server after database is initialized
async function startServer() {
    try {
        await initializeDatabase();
        console.log('Database initialized');

        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏎️  OSHSHAROHI API Server                               ║
║   Server running on http://localhost:${PORT}               ║
║                                                           ║
║   Endpoints:                                              ║
║   • GET /api/team-members                                 ║
║   • GET /api/team-members/:subteam                        ║
║   • GET /api/team-members-grouped                         ║
║   • GET /api/sub-teams                                    ║
║   • GET /api/sub-teams/:id                                ║
║   • GET /api/health                                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
