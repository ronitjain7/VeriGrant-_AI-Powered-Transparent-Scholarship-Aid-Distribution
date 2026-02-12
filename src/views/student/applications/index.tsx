
import React from 'react';
import Card from 'components/card';
import { mockApplicants, mockGrants } from 'data/mockData';
import { MdCheckCircle, MdCancel, MdHourglassEmpty, MdTimer } from 'react-icons/md';

const MyApplications = () => {
    // Filter for the mock logged-in user (Alice / XA3...9L2)
    const myApps = mockApplicants.filter(app => app.wallet === 'XA3...9L2');

    return (
        <div className="mt-5 grid h-full grid-cols-1 gap-5">
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white px-2">
                My Applications
            </h2>

            <div className="grid grid-cols-1 gap-5">
                {myApps.length > 0 ? (
                    myApps.map((app) => (
                        <Card key={app.id} extra="p-4">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-brand-100 dark:bg-brand-500/20 rounded-xl flex items-center justify-center text-3xl">
                                        👩‍💻
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                            Women in Tech Grant
                                        </h5>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm text-gray-500">Submitted: {app.submissionDate}</span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 font-mono">
                                                ID: {app.id}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            {app.status === 'Funded' && <MdCheckCircle className="text-green-500 text-lg" />}
                                            {app.status === 'Pending' && <MdHourglassEmpty className="text-yellow-500 text-lg" />}
                                            {app.status === 'Rejected' && <MdCancel className="text-red-500 text-lg" />}

                                            <span className={`font-bold ${app.status === 'Funded' ? 'text-green-500' :
                                                    app.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-10 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>

                                    <div className="flex flex-col items-end min-w-[100px]">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Score</span>
                                        <span className="font-bold text-navy-700 dark:text-white mt-1">
                                            {app.aiMeritScore}/100
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Stepper (Visual Only) */}
                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
                                <div className="relative flex justify-between">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-navy-700 -translate-y-1/2 rounded-full z-0"></div>
                                    <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-green-500 -translate-y-1/2 rounded-full z-0"></div>

                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white border-4 border-white dark:border-navy-800">
                                            <MdCheckCircle />
                                        </div>
                                        <span className="text-xs font-bold text-green-500">Submitted</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white border-4 border-white dark:border-navy-800">
                                            <MdTimer />
                                        </div>
                                        <span className="text-xs font-bold text-green-500">Under Review</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-navy-700 flex items-center justify-center text-gray-400 border-4 border-white dark:border-navy-800">
                                            <MdCheckCircle />
                                        </div>
                                        <span className="text-xs font-bold text-gray-400">Decision</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-navy-700 flex items-center justify-center text-gray-400 border-4 border-white dark:border-navy-800">
                                            <MdCheckCircle />
                                        </div>
                                        <span className="text-xs font-bold text-gray-400">Disbursed</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card extra="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
                            <MdHourglassEmpty className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">No Applications Yet</h3>
                        <p className="text-gray-500 mt-2 mb-6">You haven't applied to any grants yet.</p>
                        <a href="/student/browse" className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-colors">
                            Browse Grants
                        </a>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
