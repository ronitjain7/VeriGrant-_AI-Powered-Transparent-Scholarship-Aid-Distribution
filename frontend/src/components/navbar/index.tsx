import React from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
import navbarimage from '/public/img/layout/Navbar.png';
import { BsArrowBarUp } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import Configurator from './Configurator';
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from 'react-icons/io';
import avatar from '/public/img/avatars/avatar4.png';
import Image from 'next/image';
import { useWallet } from 'contexts/WalletContext';
import algosdk from 'algosdk';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark'),
  );

  // Wallet State from Context
  const { isConnected, connectWallet, disconnectWallet, accountAddress } = useWallet();
  const [algoBalance, setAlgoBalance] = React.useState("0 ALGO");

  React.useEffect(() => {
    if (isConnected && accountAddress) {
      const fetchBalance = async () => {
        try {
          const server = process.env.NEXT_PUBLIC_ALGOD_SERVER || 'https://testnet-api.algonode.cloud';
          const port = process.env.NEXT_PUBLIC_ALGOD_PORT || '';
          const token = process.env.NEXT_PUBLIC_ALGOD_TOKEN || '';
          const client = new algosdk.Algodv2(token, server, port);
          const account = await client.accountInformation(accountAddress).do();
          // @ts-ignore - algosdk types might be old, but simple cast helps
          const bal = algosdk.microalgosToAlgos(Number(account.amount));
          setAlgoBalance(`${bal.toFixed(2)} ALGO`);
        } catch (e) {
          console.error("Failed to fetch balance", e);
        }
      };
      fetchBalance();
    }
  }, [isConnected, accountAddress]);

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        {/* Wallet Connect Section */}
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white w-full">
          {isConnected ? (
            <div className="flex items-center justify-between w-full px-3 cursor-pointer" onClick={disconnectWallet}>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Balance</span>
                <span className="text-sm font-bold text-navy-700 dark:text-white">{algoBalance}</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-navy-800 rounded-full px-3 py-1.5 shadow-sm border border-gray-100 dark:border-navy-700">
                <span className="text-xs font-mono font-medium text-brand-500">
                  {accountAddress?.slice(0, 4)}...{accountAddress?.slice(-4)}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full h-full rounded-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold transition-all duration-200 shadow-md shadow-brand-500/20"
            >
              Connect Pera Wallet
            </button>
          )}
        </div>

        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove('dark');
              setDarkmode(false);
            } else {
              document.body.classList.add('dark');
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <Image
              width="2"
              height="20"
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt="User"
            />
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        >
          <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋 Hey, Student
                </p>{' '}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="ml-4 mt-3 flex flex-col">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isConnected ? 'Wallet Connected' : 'Connect your wallet to get started'}
              </p>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
