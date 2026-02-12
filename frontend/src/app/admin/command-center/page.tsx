'use client';
import React, { useState } from 'react';
import ApplicantTable from 'components/admin/data-tables/ApplicantTable';
import tableDataApplicants from 'variables/data-tables/tableDataApplicants';
import { MdPayment, MdCheckCircle } from 'react-icons/md';

import { fetchApplicants, triggerPayout } from 'utils/api';

const CommandCenter = () => {
    const [showModal, setShowModal] = useState(false);
    const [disbursed, setDisbursed] = useState(false);
    const [applicants, setApplicants] = useState(tableDataApplicants);
    const [txId, setTxId] = useState("");

    React.useEffect(() => {
        const loadCommonData = async () => {
            try {
                const data = await fetchApplicants();
                const formatted = data.map((item: any) => ({
                    wallet: item.walletAddress,
                    aiScore: item.aiScore,
                    status: item.status,
                    reasoning: item.reasoning
                }));
                setApplicants(formatted);
            } catch (e) {
                console.error("Failed to fetch applicants", e);
            }
        };
        loadCommonData();
        // Poll for updates every 5 seconds
        const interval = setInterval(loadCommonData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleDisburse = () => {
        setShowModal(true);
    };

    const confirmDisbursement = async () => {
        try {
            const result = await triggerPayout();
            setTxId(result.txId || "TX-MOCK-FAIL");
            setDisbursed(true);

            setTimeout(() => {
                setShowModal(false);
                setDisbursed(false);
                setTxId("");
                alert(result.message);
            }, 3000);
        } catch (e) {
            alert("Payout Failed. Check console.");
            setShowModal(false);
        }
    };

    return (
        <div className="mt-5 grid h-full grid-cols-1 gap-5">
            <div className="flex justify-between items-center bg-white dark:bg-navy-800 p-4 rounded-2xl shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Admin Command Center</h2>
                    <p className="text-gray-600 dark:text-gray-400">Review AI scores and manage grant distribution.</p>
                </div>
                <button
                    onClick={handleDisburse}
                    className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all"
                >
                    <MdPayment className="h-5 w-5" />
                    Disburse Funds to Top 3
                </button>
            </div>

            <ApplicantTable tableData={applicants} />

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-navy-800 p-6 rounded-2xl shadow-2xl w-[400px] border border-gray-100 dark:border-white/10">
                        {!disbursed ? (
                            <>
                                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-4">Confirm Disbursement</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    You are about to disburse <span className="font-bold text-navy-700 dark:text-white">50,000 USDC</span> to the top 3 ranked applicants.
                                    <br /><br />
                                    <div className="bg-gray-100 dark:bg-navy-900 p-3 rounded-lg text-sm text-center font-mono">
                                        Total: 50,000 USDC<br />
                                        Fee: 0.003 ALGO
                                    </div>
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold transition-colors dark:text-gray-300 dark:hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDisbursement}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold shadow-md transition-colors"
                                    >
                                        Confirm Transaction
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 animate-scale-in">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <MdCheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-700 dark:text-white">Disbursement Complete</h3>
                                <p className="text-gray-500 mt-2">Transaction ID: <span className="font-mono text-xs">{txId}</span></p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommandCenter;
