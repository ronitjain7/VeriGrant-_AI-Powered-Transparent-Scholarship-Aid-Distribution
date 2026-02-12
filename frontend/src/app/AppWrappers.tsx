'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
// import '@asseinfo/react-kanban/dist/styles.css';
// import 'styles/Plugins.css';
// import 'styles/MiniCalendar.css';
import 'styles/index.css';

import dynamic from 'next/dynamic';

const _NoSSR = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

import { WalletProvider } from 'contexts/WalletContext';

export default function AppWrappers({ children }: { children: ReactNode }) {
  // @ts-expect-error
  return (
    <NoSSR>
      <WalletProvider>
        {children}
      </WalletProvider>
    </NoSSR>
  );
}
