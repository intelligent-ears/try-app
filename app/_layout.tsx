import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Shield, Key, CheckCircle, Wallet } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

// Wallet connection hook
function useWalletConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      // Open MetaMask mobile app
      const metamaskUrl = 'https://metamask.app.link/dapp/yourapp.com';
      
      const canOpen = await Linking.canOpenURL(metamaskUrl);
      if (canOpen) {
        await Linking.openURL(metamaskUrl);
        // Simulate connection for demo
        setTimeout(() => {
          setWalletAddress('0x742d35Cc6634C0532925a3b8D0a6E0dD2c3b8D8e');
          setIsConnecting(false);
          Alert.alert('Success', 'Wallet connected successfully!');
        }, 3000);
      } else {
        Alert.alert(
          'MetaMask not found',
          'Please install MetaMask mobile app to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Install', 
              onPress: () => Linking.openURL('https://metamask.io/download/') 
            }
          ]
        );
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      Alert.alert('Error', 'Failed to connect wallet');
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    Alert.alert('Disconnected', 'Wallet disconnected successfully!');
  };

  return { walletAddress, isConnecting, connectWallet, disconnectWallet };
}

// Global wallet context (simple implementation)
const WalletContext = React.createContext<{
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
} | null>(null);

export function useWallet() {
  const context = React.useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}

function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWalletConnect();
  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
}

export default function TabLayout() {
  return (
    <WalletProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#6b7280',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }: { size: number; color: string }) => (
              <Shield size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="generate"
          options={{
            title: 'Generate',
            tabBarIcon: ({ size, color }: { size: number; color: string }) => (
              <Key size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="verify"
          options={{
            title: 'Verify',
            tabBarIcon: ({ size, color }: { size: number; color: string }) => (
              <CheckCircle size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </WalletProvider>
  );
}