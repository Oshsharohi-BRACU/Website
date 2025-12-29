import { useState, useEffect } from 'react';
import {
    fetchTeamMembersGrouped,
    GroupedTeamMembers,
    TeamMember,
    getImageUrl
} from '../api/teamApi';

interface UseTeamMembersResult {
    members: GroupedTeamMembers | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook to fetch team members grouped by subteam
 */
export function useTeamMembers(): UseTeamMembersResult {
    const [members, setMembers] = useState<GroupedTeamMembers | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchTeamMembersGrouped();
            setMembers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch team members');
            console.error('Error fetching team members:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { members, loading, error, refetch: fetchData };
}

/**
 * Transform API data to the format expected by TeamTab component
 */
export function transformToLeadersFormat(members: GroupedTeamMembers) {
    const result: Array<{
        name: string;
        role: string;
        title: string;
        img: string;
        description: string;
        color: string;
        subteam: string;
    }> = [];

    for (const [subteam, teamMembers] of Object.entries(members)) {
        for (const member of teamMembers) {
            result.push({
                name: member.name,
                role: member.role,
                title: member.title,
                img: getImageUrl(member.img || member.image_path || ''),
                description: member.description,
                color: member.color,
                subteam: subteam
            });
        }
    }

    return result;
}

/**
 * Get members filtered by subteam
 */
export function filterBySubteam(members: GroupedTeamMembers, subteam: string): TeamMember[] {
    return members[subteam] || [];
}
