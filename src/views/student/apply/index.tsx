
import React, { useState } from 'react'; // Verified Fix
import Card from 'components/card';
import InputField from 'components/fields/InputField';
import { MdCheckCircle, MdLock, MdCloudUpload, MdRocketLaunch } from 'react-icons/md';
import { FaBrain } from 'react-icons/fa';
import { SiAlgorand } from 'react-icons/si';

const ApplyPortal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStage, setSubmitStage] = useState(0); // 0: Idle, 1: Allocating, 2: AI Analyzing, 3: Verifying, 4: Done

    const handleSubmit = () => {
        setIsSubmitting(true);
        setSubmitStage(1);

        // Simulation Sequence
        setTimeout(() => setSubmitStage(2), 1500); // AI Analysis
        setTimeout(() => setSubmitStage(3), 3000); // Verifying
        setTimeout(() => {
            setSubmitStage(4); // Success
            // setTimeout(() => {
            //     setIsSubmitting(false);
            //     setSubmitStage(0);
            //     alert("Application Submitted!");
            // }, 2000);
        }, 4500);
    };

    return (
        <div className="flex w-full flex-col gap-5 pt-5">
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white px-2">
                Scholarship Application Portal
            </h2>

            <div className="flex w-full flex-col lg:flex-row gap-5">
                {/* Left: Grant Details */}
                <div className="w-full lg:w-1/3">
                    <Card extra="p-[24px] h-full bg-gradient-to-b from-brand-50 to-white dark:from-navy-800 dark:to-navy-900 border-t-4 border-brand-500">
                        <div className="flex flex-col gap-4">
                            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">Selected Grant</span>
                            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">Women in Tech Grant 2024</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Open</span>
                                <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-xs font-bold">5,000 ALGO Pool</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                                This grant supports the next generation of female leaders in blockchain.
                                Applicants must demonstrate academic excellence and financial need.
                            </p>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                                <h4 className="font-bold text-navy-700 dark:text-white mb-4">Required Documents</h4>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <MdCheckCircle className="text-green-500" /> Official Transcript
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MdCheckCircle className="text-green-500" /> Statement of Purpose
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MdCheckCircle className="text-green-500" /> Recommendation Letter
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right: Application Form */}
                <div className="w-full lg:w-2/3">
                    <Card extra="p-[24px]">
                        <div className="flex flex-col gap-6">
                            {/* Section 1: Identity */}
                            <div>
                                <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs">1</span>
                                    Identity Verification
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        variant="auth"
                                        extra="mb-0"
                                        label="Full Name"
                                        placeholder="Jane Doe"
                                        id="name"
                                        type="text"
                                    />
                                    <div>
                                        <label className="text-sm font-bold text-navy-700 dark:text-white ml-1.5">Wallet Address (Connected)</label>
                                        <div className="mt-2 flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-navy-900 rounded-xl border border-gray-100 dark:border-none">
                                            <span className="text-sm font-mono text-gray-500">XA3...9L2</span>
                                            <MdLock className="text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 dark:bg-white/5" />

                            {/* Section 2: Academic & Financial */}
                            <div>
                                <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs">2</span>
                                    Academic & Financial
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField variant="auth" extra="mb-0" label="University Name" placeholder="MIT" id="uni" type="text" />
                                    <InputField variant="auth" extra="mb-0" label="GPA (0.0 - 4.0)" placeholder="3.8" id="gpa" type="number" />
                                    <InputField variant="auth" extra="mb-0" label="Annual Family Income (USD)" placeholder="45000" id="income" type="number" />
                                    <div>
                                        <label className="text-sm font-bold text-navy-700 dark:text-white ml-1.5">Upload Transcript</label>
                                        <div className="mt-2 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <MdCloudUpload className="text-2xl text-brand-500 mb-1" />
                                            <span className="text-xs text-gray-500">Click to upload PDF</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 dark:bg-white/5" />

                            {/* Section 3: Essay */}
                            <div>
                                <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs">3</span>
                                    Statement of Purpose
                                </h4>
                                <textarea
                                    className="w-full h-40 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-900 text-sm focus:border-brand-500 outline-none transition-all resize-none"
                                    placeholder="Tell us about yourself, your goals, and why you deserve this grant..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <MdRocketLaunch className="text-lg" />
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Submission Modal Overlay */}
            {isSubmitting && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/90 backdrop-blur-md animate-fade-in">
                    <div className="relative w-full max-w-md mx-4">
                        <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center border border-white/10 overflow-hidden">

                            {/* Background decoration */}
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-400 via-blue-500 to-purple-600 animate-pulse"></div>

                            {/* Stage 1: Encryption */}
                            {submitStage === 1 && (
                                <div className="space-y-4 animate-fade-in-up">
                                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                        <MdLock className="w-10 h-10 text-blue-500 animate-pulse" />
                                        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Encrypting Data</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-mono">Hashing SHA-256...</p>
                                    </div>
                                </div>
                            )}

                            {/* Stage 2: AI Analysis */}
                            {submitStage === 2 && (
                                <div className="space-y-4 animate-fade-in-up">
                                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                        <FaBrain className="w-10 h-10 text-purple-500 animate-bounce" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">AI Agent Analysis</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Evaluating Merit & Need Score...</p>
                                    </div>
                                </div>
                            )}

                            {/* Stage 3: Verification */}
                            {submitStage === 3 && (
                                <div className="space-y-4 animate-fade-in-up">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <SiAlgorand className="w-10 h-10 text-green-500 animate-spin-slow" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Verifying on Chain</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Smart Contract Interaction...</p>
                                    </div>
                                </div>
                            )}

                            {/* Stage 4: Success */}
                            {submitStage === 4 && (
                                <div className="space-y-4 animate-scale-in">
                                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/40">
                                        <MdCheckCircle className="w-14 h-14 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-navy-700 dark:text-white mb-2">Application Submitted!</h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Application ID: <span className="font-mono font-bold text-brand-500">#VG-992</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => { setIsSubmitting(false); setSubmitStage(0); }}
                                        className="mt-6 px-6 py-2 rounded-lg bg-gray-100 dark:bg-navy-700 font-bold text-navy-700 dark:text-white hover:bg-gray-200 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplyPortal;
