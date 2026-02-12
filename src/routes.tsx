
import React from 'react';

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdSchool,
  MdAdminPanelSettings,
  MdHistory,
  MdDashboard,
} from 'react-icons/md';

const routes = [
  // --- Student View ---
  {
    name: 'Browse Grants',
    layout: '/student',
    path: 'browse',
    icon: <MdSchool className="h-6 w-6" />,
  },
  {
    name: 'My Applications',
    layout: '/student',
    path: 'my-applications',
    icon: <MdPerson className="h-6 w-6" />,
  },

  // --- Admin View ---
  {
    name: 'Manage Grants', // God Mode
    layout: '/admin',
    path: 'manage',
    icon: <MdAdminPanelSettings className="h-6 w-6" />,
  },
  {
    name: 'Public Audit',
    layout: '/admin',
    path: 'audit',
    icon: <MdHistory className="h-6 w-6" />,
  },

  // --- Legacy / Auth ---
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  },
];
export default routes;
