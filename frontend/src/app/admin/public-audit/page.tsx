'use client';
import React from 'react';
import Card from 'components/card';
import { MdHistory, MdOpenInNew } from 'react-icons/md';

const PublicAudit = () => {

    const [logs, setLogs] = React.useState<any[]>([]);

    React.useEffect(() => {
        const loadTransactions = async () => {
            try {
                const { fetchTransactions } = await import('utils/api');
                const data = await fetchTransactions();
                // Map API data to UI format
                // API returns: { txId, sender, receiver, amount, type, timestamp }
                const formatted = data.map((tx: any, index: number) => ({
                    id: index,
                    action: tx.type,
                    amount: tx.amount,
                    to: tx.receiver.substring(0, 10) + "...",
                    hash: tx.txId,
                    time: new Date(tx.timestamp).toLocaleTimeString()
                })).reverse(); // Newest first
                setLogs(formatted);
            } catch (e) {
                console.error("Failed to load audit logs", e);
            }
        };
        loadTransactions();
        // Poll for live updates
        const interval = setInterval(loadTransactions, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-5 grid h-full grid-cols-1 gap-5">
            <Card extra="w-full h-full p-4">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center">
                            <MdHistory className="h-6 w-6 text-brand-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">Public Audit Log</h4>
                            <p className="text-sm text-gray-500">Immutable transparency layer on Algorand (Simulated)</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 h-full overflow-y-auto">
                    {logs.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">No transactions recorded yet.</p>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 mb-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors border-b border-gray-100 dark:border-white/5 last:border-0">
                                <div className="flex items-center gap-4 mb-2 md:mb-0">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-navy-700 dark:text-white">{log.action}</span>
                                        <span className="text-xs text-gray-500">{log.time}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="flex flex-col items-end min-w-[100px]">
                                        <span className="text-sm font-bold text-navy-700 dark:text-white">{log.amount}</span>
                                        <span className="text-xs text-gray-400">Value</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="bg-gray-100 dark:bg-navy-900 px-3 py-1 rounded-md">
                                            <span className="font-mono text-xs text-brand-500">{log.hash}</span>
                                        </div>
                                        <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors" title="View on AlgoExplorer">
                                            <MdOpenInNew />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>

                <div className="mt-4 text-center">
                    <button className="text-sm font-medium text-brand-500 hover:text-brand-600">
                        Load More transactions...
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default PublicAudit;
