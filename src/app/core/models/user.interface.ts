export interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface ContributionDay {
    date: string;
    count: number;
    colorLevel: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
    days: ContributionDay[];
}

export interface ContributionGraph {
    totalContributions: number;
    weeks: ContributionWeek[];
}

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    html_url: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    url: string;
}

export interface Fork {
    parent?: {
        name: string;
        full_name?: string;
    }
}