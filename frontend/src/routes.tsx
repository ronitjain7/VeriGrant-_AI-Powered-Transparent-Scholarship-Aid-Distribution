import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from 'react-icons/md';

const routes = [
  {
    name: 'Explorer',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Apply Now',
    layout: '/admin',
    path: 'apply',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Admin Portal',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'command-center',
  },
  {
    name: 'Public Audit',
    layout: '/admin',
    path: 'public-audit',
    icon: <MdPerson className="h-6 w-6" />,
  },
];
export default routes;
