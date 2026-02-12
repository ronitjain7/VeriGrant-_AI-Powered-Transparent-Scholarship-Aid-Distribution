'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';

interface WalletContextType {
    peraWallet: PeraWalletConnect | null;
    accountAddress: string | null;
    isConnected: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [peraWallet, setPeraWallet] = useState<PeraWalletConnect | null>(null);
    const [accountAddress, setAccountAddress] = useState<string | null>(null);
    const isConnected = !!accountAddress;

    useEffect(() => {
        // Initialize PeraWalletConnect
        const pera = new PeraWalletConnect({
            chainId: 416002, // Testnet
            shouldShowSignTxnToast: true,
        });
        setPeraWallet(pera);

        // Reconnect on reload
        pera.reconnectSession().then((accounts) => {
            if (accounts.length) {
                setAccountAddress(accounts[0]);
            }

            pera.connector?.on('disconnect', () => {
                setAccountAddress(null);
            });
        });

        return () => {
            // cleanup
            pera.disconnect();
        }
    }, []);

    const connectWallet = async () => {
        if (!peraWallet) return;
        try {
            const newAccounts = await peraWallet.connect();
            setAccountAddress(newAccounts[0]);
        } catch (error) {
            if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
                console.error(error);
            }
        }
    };

    const disconnectWallet = async () => {
        if (!peraWallet) return;
        await peraWallet.disconnect();
        setAccountAddress(null);
    };

    return (
        <WalletContext.Provider
            value={{
                peraWallet,
                accountAddress,
                isConnected,
                connectWallet,
                disconnectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
