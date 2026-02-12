import axios from 'axios';

const API_URL = 'http://localhost:8000'; // FastAPI Backend URL

export interface ApplicationData {
    fullName: string;
    email: string;
    walletAddress: string;
    gpa: number;
    familyIncome: number;
    essay: string;
}

export interface ApplicationResponse {
    message: string;
    hash: string;
    score: number;
}

export const submitApplication = async (data: ApplicationData): Promise<ApplicationResponse> => {
    try {
        const response = await axios.post(`${API_URL}/submit`, data);
        return response.data;
    } catch (error) {
        console.error("Error submitting application:", error);
        throw error;
    }
};

export const fetchApplicants = async () => {
    try {
        const response = await axios.get(`${API_URL}/applicants`);
        return response.data;
    } catch (error) {
        console.error("Error fetching applicants:", error);
        throw error;
    }
};

export const triggerPayout = async () => {
    try {
        const response = await axios.post(`${API_URL}/payout`);
        return response.data;
    } catch (error) {
        console.error("Error triggering payout:", error);
        throw error;
    }
};

export const fetchTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};
