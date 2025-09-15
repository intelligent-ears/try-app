import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallet } from 'lucide-react-native';
import { useWallet } from '../_layout';

// Wallet connection component
function WalletConnect() {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } = useWallet();

  return (
    <View style={styles.walletContainer}>
      {!walletAddress ? (
        <TouchableOpacity 
          style={[styles.connectButton, isConnecting && styles.connectingButton]} 
          onPress={connectWallet}
          disabled={isConnecting}
        >
          <Wallet size={20} color="#ffffff" />
          <Text style={styles.connectButtonText}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.connectedContainer}>
          <Text style={styles.connectedLabel}>Connected Wallet:</Text>
          <Text style={styles.walletText}>
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </Text>
          <TouchableOpacity style={styles.disconnectButton} onPress={disconnectWallet}>
            <Text style={styles.disconnectButtonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Wallet App</Text>
      <Text style={styles.subtitle}>Connect your wallet to get started</Text>
      <WalletConnect />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  walletContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  connectButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectingButton: {
    backgroundColor: '#6b7280',
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  connectedContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectedLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  walletText: {
    fontSize: 16,
    color: '#1f2937',
    fontFamily: 'monospace',
    marginBottom: 15,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  disconnectButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disconnectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});