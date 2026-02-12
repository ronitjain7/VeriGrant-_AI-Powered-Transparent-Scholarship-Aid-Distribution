
export interface Grant {
    id: string;
    title: string;
    description: string;
    pool: number;
    currency: 'ALGO' | 'USDC';
    deadline: string;
    applicants: number;
    image: string;
    tags: string[];
}

export interface Applicant {
    id: string;
    name: string;
    wallet: string;
    email: string;
    university: string;
    gpa: number;
    income: number;
    essay: string;
    aiMeritScore: number;
    aiNeedScore: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Funded';
    submissionDate: string;
}

export interface AuditLog {
    id: string;
    action: string;
    recipient: string;
    amount: number;
    currency: 'ALGO' | 'USDC';
    txHash: string;
    timestamp: string;
    status: 'Success' | 'Failed';
}

export const mockGrants: Grant[] = [
    {
        id: 'grant-001',
        title: 'Women in Tech Grant',
        description: 'Supporting the next generation of female leaders in blockchain and STEM fields.',
        pool: 5000,
        currency: 'ALGO',
        deadline: '2025-12-31',
        applicants: 124,
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000',
        tags: ['Diversity', 'STEM', 'Blockchain']
    },
    {
        id: 'grant-002',
        title: 'DeFi Innovation Fund',
        description: 'For students building decentralized finance applications on Algorand.',
        pool: 10000,
        currency: 'USDC',
        deadline: '2025-10-15',
        applicants: 89,
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
        tags: ['DeFi', 'Development', 'Smart Contracts']
    },
    {
        id: 'grant-003',
        title: 'Green Blockchain Research',
        description: 'Research grants for sustainable blockchain solutions and energy efficiency.',
        pool: 7500,
        currency: 'ALGO',
        deadline: '2025-11-30',
        applicants: 45,
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000',
        tags: ['Research', 'Sustainability', 'Environment']
    },
    {
        id: 'grant-004',
        title: 'Web3 Gaming Scholarship',
        description: 'Empowering game developers to build the future of gaming on Algorand.',
        pool: 3000,
        currency: 'USDC',
        deadline: '2025-09-01',
        applicants: 210,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000',
        tags: ['Gaming', 'Metaverse', 'NFTs']
    }
];

export const mockApplicants: Applicant[] = [
    {
        id: 'app-101',
        name: 'Alice Nakamoto',
        wallet: 'XA3...9L2',
        email: 'alice@mit.edu',
        university: 'MIT',
        gpa: 3.9,
        income: 45000,
        essay: 'I plan to revolutionize DeFi lending protocols...',
        aiMeritScore: 98,
        aiNeedScore: 65,
        status: 'Pending',
        submissionDate: '2025-02-10'
    },
    {
        id: 'app-102',
        name: 'Bob Buterin',
        wallet: 'B7K...2M1',
        email: 'bob@stanford.edu',
        university: 'Stanford',
        gpa: 3.7,
        income: 25000,
        essay: 'My goal is to build accessible DAOs for local communities...',
        aiMeritScore: 88,
        aiNeedScore: 92,
        status: 'Approved',
        submissionDate: '2025-02-08'
    },
    {
        id: 'app-103',
        name: 'Charlie Lee',
        wallet: 'C5P...8R4',
        email: 'charlie@berkeley.edu',
        university: 'UC Berkeley',
        gpa: 2.8,
        income: 80000,
        essay: 'Blockchain is cool.',
        aiMeritScore: 45,
        aiNeedScore: 20,
        status: 'Rejected',
        submissionDate: '2025-02-05'
    },
    {
        id: 'app-104',
        name: 'Diana Prince',
        wallet: 'D2X...1T9',
        email: 'diana@themiscira.edu',
        university: 'Themiscira Univ',
        gpa: 4.0,
        income: 15000,
        essay: 'Using blockchain for humanitarian aid distribution...',
        aiMeritScore: 95,
        aiNeedScore: 98,
        status: 'Funded',
        submissionDate: '2025-01-20'
    },
    {
        id: 'app-105',
        name: 'Evan Spiegel',
        wallet: 'E9J...3K5',
        email: 'evan@usc.edu',
        university: 'USC',
        gpa: 3.2,
        income: 120000,
        essay: 'Social media on chain.',
        aiMeritScore: 72,
        aiNeedScore: 10,
        status: 'Pending',
        submissionDate: '2025-02-11'
    }
];

export const mockAuditLogs: AuditLog[] = [
    {
        id: 'log-001',
        action: 'Scholarship Disbursed: STEM Grant 2024',
        recipient: 'XA3...9L2',
        amount: 500,
        currency: 'USDC',
        txHash: '8d7s...2k9a',
        timestamp: '2 mins ago',
        status: 'Success'
    },
    {
        id: 'log-002',
        action: 'Grant Funded: DeFi Innovation Fund',
        recipient: 'B7K...2M1',
        amount: 1000,
        currency: 'USDC',
        txHash: '3f4g...8j1p',
        timestamp: '1 hour ago',
        status: 'Success'
    },
    {
        id: 'log-003',
        action: 'Application Minted',
        recipient: 'D2X...1T9',
        amount: 0,
        currency: 'ALGO',
        txHash: '9h2l...5m7n',
        timestamp: '3 hours ago',
        status: 'Success'
    },
    {
        id: 'log-004',
        action: 'Admin Top-up',
        recipient: 'VeriGrant Vault',
        amount: 10000,
        currency: 'ALGO',
        txHash: '1a2b...3c4d',
        timestamp: '1 day ago',
        status: 'Success'
    }
];
