// API configuration
const API_BASE_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 'http://localhost:3001';

// Types
export interface TeamMember {
    id: number;
    name: string;
    role: string;
    title: string;
    description: string;
    subteam: string;
    color: string;
    img: string;
    image_path?: string;
}

export interface SubTeam {
    id: string;
    name: string;
    icon: string;
    description: string;
    goals: string[];
    achievements: string[];
    members?: {
        id: string;
        name: string;
        role: string;
        image: string;
    }[];
}

export interface GroupedTeamMembers {
    [subteam: string]: TeamMember[];
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
    error?: string;
}

// API Functions

/**
 * Fetch all team members
 */
export async function fetchAllTeamMembers(): Promise<TeamMember[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/team-members`);
        const result: ApiResponse<TeamMember[]> = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch team members');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching team members:', error);
        throw error;
    }
}

/**
 * Fetch team members grouped by subteam
 */
export async function fetchTeamMembersGrouped(): Promise<GroupedTeamMembers> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/team-members-grouped`);
        const result: ApiResponse<GroupedTeamMembers> = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch team members');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching grouped team members:', error);
        throw error;
    }
}

/**
 * Fetch team members by subteam name
 */
export async function fetchTeamMembersBySubteam(subteam: string): Promise<TeamMember[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/team-members/${encodeURIComponent(subteam)}`);
        const result: ApiResponse<TeamMember[]> = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch team members');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching team members by subteam:', error);
        throw error;
    }
}

/**
 * Fetch all sub-teams
 */
export async function fetchSubTeams(): Promise<SubTeam[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sub-teams`);
        const result: ApiResponse<SubTeam[]> = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch sub-teams');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching sub-teams:', error);
        throw error;
    }
}

/**
 * Fetch a single sub-team with its members
 */
export async function fetchSubTeamWithMembers(id: string): Promise<SubTeam> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sub-teams/${encodeURIComponent(id)}`);
        const result: ApiResponse<SubTeam> = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch sub-team');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching sub-team:', error);
        throw error;
    }
}

/**
 * Get image URL (converts relative path to full URL)
 */
export function getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    // Remove leading slash if present for consistency
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${API_BASE_URL}/${cleanPath}`;
}

/**
 * Health check
 */
export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const result = await response.json();
        return result.status === 'ok';
    } catch {
        return false;
    }
}
