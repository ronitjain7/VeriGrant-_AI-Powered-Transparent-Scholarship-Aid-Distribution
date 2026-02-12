
import React, { useState } from 'react';
import Card from 'components/card';
import { mockAuditLogs } from 'data/mockData';
import { MdCheckCircle, MdOpenInNew, MdHistory } from 'react-icons/md';

const PublicAudit = () => {
    const [logs, setLogs] = useState(mockAuditLogs);

    return (
        <div className="mt-5 grid h-full grid-cols-1 gap-5">
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white px-2">
                Public Audit Log
            </h2>
            <Card extra="w-full h-full p-4">
                <div className="flex items-center justify-between px-2 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                            <MdHistory className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">VeriGrant Blockchain Ledger</h4>
                            <p className="text-sm text-gray-500">Immutable transparency layer on Algorand Mainnet</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded border border-green-100 dark:border-green-800">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Live Sync
                        </span>
                    </div>
                </div>

                <div className="h-full overflow-y-auto pr-2">
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="relative group overflow-hidden">
                                <div className="absolute left-[19px] top-8 bottom-[-20px] w-0.5 bg-gray-100 dark:bg-white/10 group-last:hidden"></div>

                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                                    {/* Icon */}
                                    <div className="relative z-10 flex-shrink-0 mt-1">
                                        <MdCheckCircle className="w-6 h-6 text-green-500 bg-white dark:bg-navy-800 rounded-full" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h5 className="text-sm font-bold text-navy-700 dark:text-white truncate">
                                                {log.action}
                                            </h5>
                                            <span className="text-xs text-gray-400 font-mono whitespace-nowrap">{log.timestamp}</span>
                                        </div>

                                        <div className="mt-1 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <span className="opacity-70">To:</span>
                                                <span className="font-mono text-navy-700 dark:text-white font-medium">{log.recipient}</span>
                                            </span>
                                            {log.amount > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <span className="opacity-70">Amount:</span>
                                                    <span className="font-bold text-brand-500">{log.amount.toLocaleString()} {log.currency}</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="px-3 py-1 bg-gray-100 dark:bg-navy-900 rounded border border-gray-200 dark:border-white/10 w-fit flex items-center gap-2 group/hash hover:border-brand-300 dark:hover:border-brand-700 transition-colors cursor-pointer">
                                                <span className="font-mono text-xs text-gray-500 group-hover/hash:text-brand-500 transition-colors">
                                                    TxHash: {log.txHash}
                                                </span>
                                                <MdOpenInNew className="w-3 h-3 text-gray-400 group-hover/hash:text-brand-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center border-t border-gray-100 dark:border-white/10 pt-4">
                    <button className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                        View all transactions on AlgoExplorer
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default PublicAudit;
