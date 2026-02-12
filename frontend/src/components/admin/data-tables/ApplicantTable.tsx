import React from 'react';
import Card from 'components/card';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { MdInfoOutline } from 'react-icons/md';
import Tooltip from 'components/tooltip';

type ApplicantObj = {
    wallet: string;
    aiScore: number;
    reasoning: string;
    status: string;
};

const columnHelper = createColumnHelper<ApplicantObj>();

function ApplicantTable(props: { tableData: any }) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    let defaultData = tableData;
    const columns = [
        columnHelper.accessor('wallet', {
            id: 'wallet',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">APPLICANT</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white font-mono">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('aiScore', {
            id: 'aiScore',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    AI SCORE
                </p>
            ),
            cell: (info) => {
                const score = info.getValue();
                let colorClass = 'bg-yellow-500';
                if (score >= 90) colorClass = 'bg-green-500';
                if (score < 50) colorClass = 'bg-red-500';

                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-16 h-2 bg-gray-200 rounded-full dark:bg-navy-700 overflow-hidden`}>
                            <div className={`h-full ${colorClass} transition-all duration-1000 ease-out`} style={{ width: `${score}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-navy-700 dark:text-white">{score}</span>
                    </div>
                )
            },
        }),
        columnHelper.accessor('status', {
            id: 'status',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    STATUS
                </p>
            ),
            cell: (info) => {
                const status = info.getValue();
                let badgeColor = 'bg-yellow-100 text-yellow-600';
                if (status === 'Excellent') badgeColor = 'bg-green-100 text-green-600';
                if (status === 'Low Fit') badgeColor = 'bg-red-100 text-red-600';

                return (
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${badgeColor}`}>
                        {status}
                    </span>
                )
            },
        }),
        columnHelper.accessor('reasoning', {
            id: 'reasoning',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">REASONING</p>
            ),
            cell: (info) => (
                <Tooltip
                    trigger={
                        <div className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-brand-500 dark:text-gray-400">
                            <MdInfoOutline className="h-5 w-5" />
                            <span className="text-xs">View Insight</span>
                        </div>
                    }
                    content={
                        <div className="w-64 p-2 text-sm text-center">
                            {info.getValue()}
                        </div>
                    }
                    placement="top"
                    extra="w-max"
                />
            ),
        }),
    ];

    const [data, setData] = React.useState([...defaultData]);

    React.useEffect(() => {
        setData([...tableData]);
    }, [tableData]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    return (
        <Card extra={'w-full h-full sm:overflow-auto px-6 py-4'}>
            <header className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    Applicant Ranking (AI Powered)
                </div>
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="!border-px !border-gray-400">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                                        >
                                            <div className="items-center justify-between text-xs text-gray-200">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table
                            .getRowModel()
                            .rows.slice(0, 10)
                            .map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="min-w-[150px] border-white/0 py-3  pr-4"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default ApplicantTable;
