'use client';
import React, { useState, useEffect } from 'react';
import { MdFilterList, MdRefresh } from 'react-icons/md';
import Card from 'components/card';
import { fetchApplicants } from 'utils/api';

const CommandCenter = () => {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [selectedApp, setSelectedApp] = useState<any>(null);

    useEffect(() => {
        loadApplicants();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredApplicants(applicants);
        } else {
            setFilteredApplicants(applicants.filter(a => a.status === filter));
        }
    }, [filter, applicants]);

    const loadApplicants = async () => {
        setLoading(true);
        try {
            const data = await fetchApplicants();
            setApplicants(data);
            setFilteredApplicants(data);
        } catch (error) {
            console.error('Failed to load applicants', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Excellent':
                return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
            case 'Good':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
        }
    };

    return (
        <div className="mt-3">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                    🎓 Application Management
                </h3>
                <button
                    onClick={loadApplicants}
                    className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 transition-all"
                >
                    <MdRefresh className="h-5 w-5" />
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-4">
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">{applicants.length}</p>
                        </div>
                        <div className="text-4xl">📝</div>
                    </div>
                </Card>
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Excellent</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {applicants.filter(a => a.status === 'Excellent').length}
                            </p>
                        </div>
                        <div className="text-4xl">⭐</div>
                    </div>
                </Card>
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Good</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {applicants.filter(a => a.status === 'Good').length}
                            </p>
                        </div>
                        <div className="text-4xl">👍</div>
                    </div>
                </Card>
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Low Fit</p>
                            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                                {applicants.filter(a => a.status === 'Low Fit').length}
                            </p>
                        </div>
                        <div className="text-4xl">📉</div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card extra="p-4 mb-5">
                <div className="flex items-center gap-2">
                    <MdFilterList className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Filter by Status:</span>
                    {['All', 'Excellent', 'Good', 'Low Fit'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${filter === status
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-navy-800 dark:text-gray-300 dark:hover:bg-navy-700'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Applications Table */}
            <Card extra="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-white/10">
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Wallet Address</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">GPA</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Income</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Essay Score</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Final Score</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Status</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Date</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="pt-4 text-center text-gray-500">Loading applications...</td>
                                </tr>
                            ) : filteredApplicants.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="pt-4 text-center text-gray-500">
                                        {filter === 'All' ? 'No applications yet' : `No ${filter} applications`}
                                    </td>
                                </tr>
                            ) : (
                                filteredApplicants.map((app, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-navy-900 transition-colors">
                                        <td className="py-3 text-sm font-mono text-navy-700 dark:text-white">
                                            {app.walletAddress?.slice(0, 8)}...{app.walletAddress?.slice(-6)}
                                        </td>
                                        <td className="py-3 text-sm text-navy-700 dark:text-white">{app.gpa}</td>
                                        <td className="py-3 text-sm text-navy-700 dark:text-white">
                                            ${app.familyIncome?.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-sm text-navy-700 dark:text-white">{app.essayScore || 'N/A'}</td>
                                        <td className="py-3 text-sm font-bold text-brand-500">{app.score}/100</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(app.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="py-3">
                                            <button
                                                onClick={() => setSelectedApp(app)}
                                                className="text-sm text-brand-500 hover:text-brand-600 font-medium"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Application Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <Card extra="p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                                Application Details
                            </h3>
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Wallet */}
                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Wallet Address</label>
                                <p className="text-sm font-mono text-navy-700 dark:text-white mt-1">{selectedApp.walletAddress}</p>
                            </div>

                            {/* Scores */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">GPA</label>
                                    <p className="text-lg font-bold text-navy-700 dark:text-white mt-1">{selectedApp.gpa}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Family Income</label>
                                    <p className="text-lg font-bold text-navy-700 dark:text-white mt-1">
                                        ${selectedApp.familyIncome?.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Final Score</label>
                                    <p className="text-2xl font-bold text-brand-500 mt-1">{selectedApp.score}/100</p>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Status</label>
                                    <p className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedApp.status)}`}>
                                            {selectedApp.status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Essay */}
                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Essay</label>
                                <div className="mt-2 p-4 bg-gray-50 dark:bg-navy-900 rounded-xl">
                                    <p className="text-sm text-navy-700 dark:text-white whitespace-pre-wrap">
                                        {selectedApp.essay || 'No essay provided'}
                                    </p>
                                </div>
                            </div>

                            {/* Timestamp */}
                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Submitted</label>
                                <p className="text-sm text-navy-700 dark:text-white mt-1">
                                    {new Date(selectedApp.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="rounded-xl bg-gray-200 dark:bg-navy-800 px-6 py-2 text-navy-700 dark:text-white hover:bg-gray-300 dark:hover:bg-navy-700 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CommandCenter;
