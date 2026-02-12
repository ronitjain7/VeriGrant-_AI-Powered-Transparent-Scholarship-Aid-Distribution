type RowObj = {
  grantName: string;
  amount: number;
  deadline: string;
  status: string;
};

const tableDataComplex: RowObj[] = [
  {
    grantName: 'Algorand Global Impact',
    amount: 10000,
    status: 'Open',
    deadline: '15 Mar 2024',
  },
  {
    grantName: 'Blockchain Research Fund',
    amount: 5000,
    status: 'Closing Soon',
    deadline: '28 Feb 2024',
  },
  {
    grantName: 'DeFi Innovation Award',
    amount: 2500,
    status: 'Open',
    deadline: '20 Apr 2024',
  },
  {
    grantName: 'Women in Web3 Scholarship',
    amount: 7500,
    status: 'Open',
    deadline: '10 May 2024',
  },
];
export default tableDataComplex;
