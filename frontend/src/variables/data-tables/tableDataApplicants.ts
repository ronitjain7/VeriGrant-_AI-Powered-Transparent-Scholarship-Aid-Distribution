type ApplicantObj = {
    wallet: string;
    aiScore: number;
    reasoning: string;
    status: string;
};

const tableDataApplicants: ApplicantObj[] = [
    {
        wallet: 'XA3...9L2',
        aiScore: 98,
        reasoning: 'High GPA, exceptional essay on DeFi impact, strong references.',
        status: 'Excellent',
    },
    {
        wallet: 'B7K...2M1',
        aiScore: 92,
        reasoning: 'Great academic record, clear goals, active in community.',
        status: 'Excellent',
    },
    {
        wallet: 'R9P...5Q4',
        aiScore: 85,
        reasoning: 'Solid application but essay lacks specific implementation details.',
        status: 'Good',
    },
    {
        wallet: 'L2N...8X3',
        aiScore: 45,
        reasoning: 'Essay appears AI-generated, low keyword match with requirements.',
        status: 'Low Fit',
    },
    {
        wallet: 'M5J...1Y9',
        aiScore: 78,
        reasoning: 'Good potential, but academic history is brief.',
        status: 'Good',
    },
];
export default tableDataApplicants;
