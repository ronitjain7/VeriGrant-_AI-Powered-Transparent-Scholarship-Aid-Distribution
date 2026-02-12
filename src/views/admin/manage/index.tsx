
import React, { useState } from 'react';
import Card from 'components/card';
import { mockApplicants } from 'data/mockData';
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table';
import { MdCheckCircle, MdCancel, MdHourglassEmpty, MdPayment } from 'react-icons/md';

const AdminManage = () => {
    const [data, setData] = useState([...mockApplicants]);
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

    const handleApprove = (applicant: any) => {
        setSelectedApplicant(applicant);
        setShowPayoutModal(true);
    };

    const confirmPayout = () => {
        // Mock Payout Logic
        const updatedData = data.map(app =>
            app.id === selectedApplicant.id ? { ...app, status: 'Funded' } : app
        );
        setData(updatedData as any);
        setShowPayoutModal(false);
        // Toast logic would go here
        alert(`Funds Transferred to ${selectedApplicant.wallet}! TxID: 8s9d...`);
    };

    const columnHelper = createColumnHelper<any>();

    const columns = [
        columnHelper.accessor('name', {
            header: 'APPLICANT',
            cell: info => (
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
                    <p className="text-xs text-gray-500">{info.row.original.wallet}</p>
                </div>
            )
        }),
        columnHelper.accessor('submissionDate', {
            header: 'DATE',
            cell: info => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
        }),
        columnHelper.accessor('gpa', {
            header: 'GPA',
            cell: info => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
        }),
        columnHelper.accessor('aiMeritScore', {
            header: 'AI MERIT',
            cell: info => {
                const score = info.getValue();
                let color = score > 90 ? 'bg-green-100 text-green-600' : score >= 70 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600';
                return (
                    <div className={`flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${color}`}>
                        {score}
                    </div>
                )
            }
        }),
        columnHelper.accessor('aiNeedScore', {
            header: 'AI NEED',
            cell: info => {
                const score = info.getValue();
                let color = score > 90 ? 'bg-green-100 text-green-600' : score >= 70 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600';
                return (
                    <div className={`flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${color}`}>
                        {score}
                    </div>
                )
            }
        }),
        columnHelper.accessor('status', {
            header: 'STATUS',
            cell: info => {
                const status = info.getValue();
                return (
                    <div className="flex items-center gap-2">
                        {status === 'Funded' && <MdCheckCircle className="text-green-500" />}
                        {status === 'Pending' && <MdHourglassEmpty className="text-yellow-500" />}
                        {status === 'Rejected' && <MdCancel className="text-red-500" />}
                        {status === 'Approved' && <MdCheckCircle className="text-blue-500" />}
                        <p className="text-sm font-bold text-navy-700 dark:text-white">{status}</p>
                    </div>
                )
            }
        }),
        columnHelper.display({
            id: 'actions',
            header: 'ACTIONS',
            cell: info => (
                <div className="flex items-center gap-2">
                    {info.row.original.status !== 'Funded' && (
                        <button
                            onClick={() => handleApprove(info.row.original)}
                            className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-brand-400 to-brand-600 px-3 py-1 text-xs font-bold text-white transition duration-200 hover:opacity-90"
                        >
                            <MdPayment /> Approve & Payout
                        </button>
                    )}
                </div>
            )
        })
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="mt-5 grid h-full grid-cols-1 gap-5">
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white px-2">
                Manage Grants (God Mode)
            </h2>
            <Card extra="w-full h-full p-4 sm:overflow-x-auto">
                <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                                        >
                                            <div className="items-center justify-between text-xs text-gray-200">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="min-w-[150px] border-white/0 py-3  pr-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Payout Modal */}
            {showPayoutModal && selectedApplicant && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center w-[400px] border border-white/10">
                        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                            <MdPayment className="w-8 h-8 text-brand-500" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-2">Confirm Payout</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            You are about to transfer <span className="font-bold text-navy-700 dark:text-white">1000 USDC</span> to wallet:
                            <br />
                            <span className="font-mono text-xs bg-gray-100 dark:bg-navy-900 px-2 py-1 rounded mt-2 inline-block">
                                {selectedApplicant.wallet}
                            </span>
                        </p>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => setShowPayoutModal(false)}
                                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-navy-700 font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmPayout}
                                className="flex-1 py-3 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30"
                            >
                                Sign Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManage;
