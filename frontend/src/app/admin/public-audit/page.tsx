'use client';
import React, { useState, useEffect } from 'react';
import { MdRefresh, MdOpenInNew, MdSearch } from 'react-icons/md';
import { SiAlgorand } from 'react-icons/si';
import Card from 'components/card';
import { fetchTransactions, fetchApplicants } from 'utils/api';

const PublicAudit = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchWallet, setSearchWallet] = useState('');
    const [searchResult, setSearchResult] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [txData, appData] = await Promise.all([
                fetchTransactions(),
                fetchApplicants()
            ]);
            setTransactions(txData);
            setApplicants(appData);
        } catch (error) {
            console.error('Failed to load audit data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!searchWallet.trim()) {
            setSearchResult(null);
            return;
        }

        const tx = transactions.find(t =>
            t.receiver?.toLowerCase().includes(searchWallet.toLowerCase())
        );

        if (tx) {
            setSearchResult({ found: true, transaction: tx });
        } else {
            setSearchResult({ found: false });
        }
    };

    const totalDistributed = transactions
        .filter(t => t.status === 'Success')
        .reduce((sum, t) => sum + parseFloat(t.amount?.replace(' ALGO', '') || '0'), 0);

    const totalStudents = transactions.filter(t => t.status === 'Success').length;
    const avgGrant = totalStudents > 0 ? (totalDistributed / totalStudents).toFixed(2) : '0';

    return (
        <div className="mt-3">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                        🔍 Public Audit Trail
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Transparent blockchain-verified scholarship distribution
                    </p>
                </div>
                <button
                    onClick={loadData}
                    className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 transition-all"
                >
                    <MdRefresh className="h-5 w-5" />
                    Refresh
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-4">
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Distributed</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {totalDistributed.toFixed(2)} ALGO
                            </p>
                        </div>
                        <SiAlgorand className="h-10 w-10 text-brand-500" />
                    </div>
                </Card>
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Students Funded</p>
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">{totalStudents}</p>
                        </div>
                        <div className="text-4xl">🎓</div>
                    </div>
                </Card>
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Grant</p>
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">{avgGrant} ALGO</p>
                        </div>
                        <div className="text-4xl">💰</div>
                    </div>
                </Card>
                <Card extra="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">{transactions.length}</p>
                        </div>
                        <div className="text-4xl">📊</div>
                    </div>
                </Card>
            </div>

            {/* Wallet Verification Tool */}
            <Card extra="p-6 mb-5">
                <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                    🔐 Verify Funding Status
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Enter a wallet address to check if it has received scholarship funding
                </p>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={searchWallet}
                        onChange={(e) => setSearchWallet(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Enter Algorand wallet address..."
                        className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-900 px-4 py-3 text-sm text-navy-700 dark:text-white outline-none focus:border-brand-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-white hover:bg-brand-600 transition-all"
                    >
                        <MdSearch className="h-5 w-5" />
                        Search
                    </button>
                </div>

                {searchResult && (
                    <div className={`mt-4 p-4 rounded-xl ${searchResult.found
                            ? 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20'
                            : 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20'
                        }`}>
                        {searchResult.found ? (
                            <div>
                                <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">
                                    ✅ Funding Confirmed
                                </p>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <p><span className="font-bold">Amount:</span> {searchResult.transaction.amount}</p>
                                    <p><span className="font-bold">Date:</span> {new Date(searchResult.transaction.timestamp).toLocaleString()}</p>
                                    <p><span className="font-bold">Status:</span> {searchResult.transaction.status}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm font-bold text-red-700 dark:text-red-400">
                                ❌ No funding record found for this wallet address
                            </p>
                        )}
                    </div>
                )}
            </Card>

            {/* Transaction History */}
            <Card extra="p-6">
                <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                    📜 Complete Transaction History
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-white/10">
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Transaction ID</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Recipient</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Amount</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Type</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Status</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Timestamp</th>
                                <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Explorer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="pt-4 text-center text-gray-500">Loading transactions...</td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="pt-4 text-center text-gray-500">No transactions yet</td>
                                </tr>
                            ) : (
                                transactions.map((tx, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-navy-900 transition-colors">
                                        <td className="py-3 text-sm font-mono text-navy-700 dark:text-white">
                                            {tx.txId === 'FAILED' ? 'N/A' : `${tx.txId?.slice(0, 8)}...`}
                                        </td>
                                        <td className="py-3 text-sm font-mono text-navy-700 dark:text-white">
                                            {tx.receiver?.slice(0, 8)}...{tx.receiver?.slice(-6)}
                                        </td>
                                        <td className="py-3 text-sm font-bold text-green-600 dark:text-green-400">
                                            {tx.amount}
                                        </td>
                                        <td className="py-3 text-sm text-navy-700 dark:text-white">
                                            {tx.type || 'Grant'}
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${tx.status === 'Success'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(tx.timestamp).toLocaleString()}
                                        </td>
                                        <td className="py-3">
                                            {tx.txId && tx.txId !== 'FAILED' && (
                                                <a
                                                    href={`https://testnet.algoexplorer.io/tx/${tx.txId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-brand-500 hover:text-brand-600 text-sm font-medium"
                                                >
                                                    View <MdOpenInNew className="h-4 w-4" />
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Smart Contract Info */}
            <div className="mt-5">
                <Card extra="p-6">
                    <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                        ⚙️ Smart Contract Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Network</label>
                            <p className="text-sm text-navy-700 dark:text-white mt-1">Algorand TestNet</p>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Contract Type</label>
                            <p className="text-sm text-navy-700 dark:text-white mt-1">AlgoPy Smart Contract</p>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Total Applications</label>
                            <p className="text-sm text-navy-700 dark:text-white mt-1">{applicants.length}</p>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Platform Status</label>
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-bold">🟢 Active</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PublicAudit;
