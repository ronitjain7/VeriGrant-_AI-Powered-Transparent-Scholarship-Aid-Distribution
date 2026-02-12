'use client';
import React, { useState, useEffect } from 'react';
import { MdSchool, MdPeople, MdTrendingUp, MdAccountBalanceWallet } from 'react-icons/md';
import { SiAlgorand } from 'react-icons/si';
import Widget from 'components/widget/Widget';
import Card from 'components/card';
import { fetchApplicants, fetchTransactions, triggerPayout } from 'utils/api';

const Dashboard = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payoutLoading, setPayoutLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [applicantsData, transactionsData] = await Promise.all([
        fetchApplicants(),
        fetchTransactions()
      ]);
      setApplicants(applicantsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerPayout = async () => {
    if (!confirm('Trigger payout for all Excellent candidates?')) return;
    setPayoutLoading(true);
    try {
      await triggerPayout();
      alert('Payout triggered successfully!');
      await loadData(); // Reload data
    } catch (error: any) {
      alert(`Payout failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setPayoutLoading(false);
    }
  };

  // Calculate metrics
  const totalGrants = transactions.filter(t => t.status === 'Success').length;
  const totalDistributed = transactions
    .filter(t => t.status === 'Success')
    .reduce((sum, t) => sum + parseFloat(t.amount?.replace(' ALGO', '') || '0'), 0);
  const activeApplications = applicants.length;
  const excellentCount = applicants.filter(a => a.status === 'Excellent').length;
  const successRate = activeApplications > 0
    ? ((excellentCount / activeApplications) * 100).toFixed(1)
    : '0';

  // Score distribution
  const scoreRanges = {
    excellent: applicants.filter(a => a.score >= 90).length,
    good: applicants.filter(a => a.score >= 75 && a.score < 90).length,
    lowFit: applicants.filter(a => a.score < 75).length,
  };

  return (
    <div>
      {/* Stats Widgets */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Widget
          icon={<SiAlgorand className="h-7 w-7" />}
          title={'Total Grants Distributed'}
          subtitle={loading ? '...' : `${totalDistributed.toFixed(2)} ALGO`}
        />
        <Widget
          icon={<MdPeople className="h-6 w-6" />}
          title={'Active Applications'}
          subtitle={loading ? '...' : activeApplications.toString()}
        />
        <Widget
          icon={<MdTrendingUp className="h-6 w-6" />}
          title={'Success Rate'}
          subtitle={loading ? '...' : `${successRate}%`}
        />
        <Widget
          icon={<MdSchool className="h-6 w-6" />}
          title={'Students Funded'}
          subtitle={loading ? '...' : totalGrants.toString()}
        />
      </div>

      {/* Score Distribution & Quick Actions */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Score Distribution */}
        <Card extra="p-6">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
            🎯 AI Score Distribution
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Excellent (90-100)</span>
              </div>
              <span className="text-sm font-bold text-navy-700 dark:text-white">{scoreRanges.excellent}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Good (75-89)</span>
              </div>
              <span className="text-sm font-bold text-navy-700 dark:text-white">{scoreRanges.good}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Low Fit (\u003c75)</span>
              </div>
              <span className="text-sm font-bold text-navy-700 dark:text-white">{scoreRanges.lowFit}</span>
            </div>
          </div>
          {/* Visual Bar */}
          <div className="mt-4 h-4 w-full rounded-full bg-gray-200 dark:bg-navy-900 overflow-hidden flex">
            {activeApplications > 0 && (
              <>
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(scoreRanges.excellent / activeApplications) * 100}%` }}
                ></div>
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(scoreRanges.good / activeApplications) * 100}%` }}
                ></div>
                <div
                  className="h-full bg-gray-400"
                  style={{ width: `${(scoreRanges.lowFit / activeApplications) * 100}%` }}
                ></div>
              </>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card extra="p-6 lg:col-span-2">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
            ⚡ Quick Actions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/command-center"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-all cursor-pointer shadow-md"
            >
              <MdPeople className="h-8 w-8 mb-2" />
              <span className="text-sm font-bold">Review Applications</span>
              <span className="text-xs opacity-80 mt-1">{activeApplications} pending</span>
            </a>
            <button
              onClick={handleTriggerPayout}
              disabled={payoutLoading || excellentCount === 0}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdAccountBalanceWallet className="h-8 w-8 mb-2" />
              <span className="text-sm font-bold">
                {payoutLoading ? 'Processing...' : 'Trigger Payouts'}
              </span>
              <span className="text-xs opacity-80 mt-1">
                {excellentCount} eligible
              </span>
            </button>
            <a
              href="/admin/public-audit"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-all cursor-pointer shadow-md"
            >
              <SiAlgorand className="h-8 w-8 mb-2" />
              <span className="text-sm font-bold">View Audit Trail</span>
              <span className="text-xs opacity-80 mt-1">{transactions.length} transactions</span>
            </a>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <div className="mt-5">
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-navy-700 dark:text-white">
              📋 Recent Applications
            </h4>
            <a
              href="/admin/command-center"
              className="text-sm text-brand-500 hover:text-brand-600 font-medium"
            >
              View All →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Wallet</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">GPA</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">AI Score</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Status</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="pt-4 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : applicants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="pt-4 text-center text-gray-500">No applications yet</td>
                  </tr>
                ) : (
                  applicants.slice(0, 5).map((app, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-white/10">
                      <td className="py-3 text-sm font-mono text-navy-700 dark:text-white">
                        {app.walletAddress?.slice(0, 6)}...{app.walletAddress?.slice(-4)}
                      </td>
                      <td className="py-3 text-sm text-navy-700 dark:text-white">{app.gpa}</td>
                      <td className="py-3 text-sm font-bold text-navy-700 dark:text-white">{app.score}/100</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${app.status === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                            app.status === 'Good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                          }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(app.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="mt-5">
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-navy-700 dark:text-white">
              💸 Recent Payouts
            </h4>
            <a
              href="/admin/public-audit"
              className="text-sm text-brand-500 hover:text-brand-600 font-medium"
            >
              View All →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Recipient</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Status</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase text-gray-600 dark:text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="pt-4 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="pt-4 text-center text-gray-500">No payouts yet</td>
                  </tr>
                ) : (
                  transactions.slice(0, 5).map((tx, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-white/10">
                      <td className="py-3 text-sm font-mono text-navy-700 dark:text-white">
                        {tx.receiver?.slice(0, 6)}...{tx.receiver?.slice(-4)}
                      </td>
                      <td className="py-3 text-sm font-bold text-green-600 dark:text-green-400">
                        {tx.amount}
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
                        {new Date(tx.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
