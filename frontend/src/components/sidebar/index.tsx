/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import { IRoute } from 'types/navigation';

function SidebarHorizon(props: { routes: IRoute[];[x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
        }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      {/* Logo Section */}
      <div className="mx-6 mt-12 mb-7 flex items-center justify-center">
        <div className="flex items-baseline gap-0">
          <span className="text-3xl font-bold text-navy-700 dark:text-white tracking-tight">
            Veri
          </span>
          <span className="text-3xl font-bold text-brand-500 tracking-tight">
            Grant
          </span>
        </div>
      </div>

      <div className="mx-6 mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Nav item */}
      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
