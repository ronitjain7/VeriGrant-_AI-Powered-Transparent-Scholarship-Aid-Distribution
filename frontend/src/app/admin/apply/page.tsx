'use client';
import React, { useState } from 'react';
import Card from 'components/card';
import InputField from 'components/fields/InputField';
import { MdCheckCircle, MdLock, MdSchool, MdDescription, MdRocketLaunch, MdPsychology } from 'react-icons/md';
import { SiAlgorand } from 'react-icons/si';

import { submitApplication } from 'utils/api';
import { useWallet } from 'contexts/WalletContext';

const ApplyPage = () => {
    const { accountAddress } = useWallet();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStage, setSubmitStage] = useState(0); // 0: Idle, 1: Encrypting, 2: AI Analysis, 3: Minting

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: 'student@example.com', // Mock for now
        university: '',
        major: '',
        gpa: '',
        graduationYear: '',
        familyIncome: '',
        essay: ''
    });

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        if (!accountAddress) {
            alert("Please connect your wallet first!");
            return;
        }

        setIsSubmitting(true);
        setSubmitStage(1); // Encrypting/Hashing

        try {
            // Construct Payload
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                walletAddress: accountAddress,
                gpa: parseFloat(formData.gpa),
                familyIncome: parseInt(formData.familyIncome) || 0,
                essay: formData.essay
            };

            // Network Request to Backend
            // Stage 1: Hashing locally/backend & Stage 2: AI Analysis happens on backend
            // We simulate the visual delay for the "Magic" effect

            await new Promise(r => setTimeout(r, 1500));
            setSubmitStage(2); // AI Analysis

            const response = await submitApplication(payload);
            console.log("Submission Result:", response);

            await new Promise(r => setTimeout(r, 2000));
            setSubmitStage(3); // Minting (Mock for now, will be real Feature 5)

            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitStage(0);
                alert(`Application Submitted! AI Score: ${response.score}/100`);
                setStep(1);
            }, 2000);

        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            setSubmitStage(0);
            alert("Submission Failed. Check console.");
        }
    };

    return (
        <div className="flex w-full flex-col gap-5 pt-4">
            <div className="flex w-full flex-col gap-5 lg:flex-row">
                {/* Left Column: Requirements */}
                <div className="w-full lg:w-1/3">
                    <Card extra="p-[20px]">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-4">Grant Requirements</h4>
                        <div className="flex flex-col gap-4">
                            <RequirementItem text="Verified Pera Wallet Connection" checked={true} />
                            <RequirementItem text="Minimum GPA 3.0" checked={true} />
                            <RequirementItem text="Enrolled in Accredited University" checked={true} />
                            <RequirementItem text="300+ Word Essay" checked={step > 2} />
                        </div>
                        <div className="mt-8 p-4 bg-lightPrimary dark:bg-navy-900 rounded-xl">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                💡 Tip: Our AI analyzes your essay for originality and impact. Be authentic!
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Form Wizard */}
                <div className="w-full lg:w-2/3">
                    <Card extra="p-[20px]">
                        {/* Stepper Header */}
                        <div className="flex items-center justify-between mb-8 px-4">
                            <StepIndicator number={1} title="Identity" active={step >= 1} />
                            <div className={`h-1 flex-grow mx-2 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                            <StepIndicator number={2} title="Academic" active={step >= 2} />
                            <div className={`h-1 flex-grow mx-2 rounded-full ${step >= 3 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                            <StepIndicator number={3} title="Essay" active={step >= 3} />
                        </div>

                        {/* Form Content */}
                        <div className="min-h-[400px]">
                            {step === 1 && (
                                <div className="flex flex-col gap-5 animate-fade-in">
                                    <h3 className="text-lg font-bold">Identity Verification</h3>
                                    <InputField
                                        variant="auth"
                                        extra="mb-2"
                                        label="Full Name"
                                        placeholder="Student Name"
                                        id="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                    <InputField
                                        variant="auth"
                                        extra="mb-2"
                                        label="Wallet Address"
                                        placeholder={accountAddress || "Connect wallet first"}
                                        id="wallet"
                                        type="text"
                                        disabled={true}
                                        value={accountAddress || ''}
                                    />
                                    <div className="flex items-center gap-2 text-green-500 bg-green-50/50 p-3 rounded-lg border border-green-100 dark:border-none dark:bg-white/5">
                                        <MdCheckCircle />
                                        <span className="text-sm font-bold">Identity Verified via Pera Wallet</span>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="flex flex-col gap-5 animate-fade-in">
                                    <h3 className="text-lg font-bold">Academic Information</h3>
                                    <InputField
                                        variant="auth"
                                        extra="mb-2"
                                        label="Family Income (Annual)"
                                        placeholder="25000"
                                        id="familyIncome"
                                        type="number"
                                        value={formData.familyIncome}
                                        onChange={handleInputChange}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField
                                            variant="auth"
                                            extra="mb-2"
                                            label="GPA"
                                            placeholder="3.8"
                                            id="gpa"
                                            type="number"
                                            value={formData.gpa}
                                            onChange={handleInputChange}
                                        />
                                        <InputField
                                            variant="auth"
                                            extra="mb-2"
                                            label="Graduation Year"
                                            placeholder="2025"
                                            id="graduationYear"
                                            type="number"
                                            value={formData.graduationYear}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="flex flex-col gap-5 animate-fade-in">
                                    <h3 className="text-lg font-bold">Scholarship Essay</h3>
                                    <div>
                                        <label className="text-sm font-bold text-navy-700 dark:text-white ml-1.5">
                                            Why do you deserve this grant?
                                        </label>
                                        <textarea
                                            id="essay"
                                            value={formData.essay}
                                            onChange={handleInputChange}
                                            className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white h-48 resize-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
                                            placeholder="Tell us about your goals, research, and impact..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={`px-6 py-3 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10'}`}
                            >
                                Back
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={handleNext}
                                    className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-500/30 transition-all"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
                                >
                                    <MdRocketLaunch />
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Magic Overlay Modal */}
            {isSubmitting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center w-[400px] text-center border border-white/10">

                        {submitStage === 1 && (
                            <>
                                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                    <MdLock className="w-10 h-10 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-2">Encrypting Data</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm"> securing your personal information...</p>
                            </>
                        )}

                        {submitStage === 2 && (
                            <>
                                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                    <MdPsychology className="w-10 h-10 text-purple-500" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-2">AI Analysis</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Analyzing essay for impact & fit...</p>
                            </>
                        )}

                        {submitStage === 3 && (
                            <>
                                <div className="w-20 h-20 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-6 animate-spin-slow">
                                    <SiAlgorand className="w-10 h-10 text-brand-500" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-2">Minting Application</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Recording proof on Algorand Blockchain...</p>
                            </>
                        )}

                        <div className="w-full bg-gray-200 dark:bg-navy-700 h-2 rounded-full mt-6 overflow-hidden">
                            <div
                                className="bg-brand-500 h-full transition-all duration-500 ease-out"
                                style={{ width: `${submitStage * 33}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const RequirementItem = ({ text, checked }: { text: string, checked: boolean }) => (
    <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${checked ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 dark:bg-navy-700'}`}>
            <MdCheckCircle className="w-4 h-4" />
        </div>
        <span className={`text-sm font-medium ${checked ? 'text-navy-700 dark:text-white' : 'text-gray-400'}`}>{text}</span>
    </div>
);

const StepIndicator = ({ number, title, active }: { number: number, title: string, active: boolean }) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${active ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40' : 'bg-gray-200 text-gray-500 dark:bg-navy-700'}`}>
            {number}
        </div>
        <span className={`text-xs font-bold ${active ? 'text-brand-500' : 'text-gray-400'}`}>{title}</span>
    </div>
);

export default ApplyPage;
