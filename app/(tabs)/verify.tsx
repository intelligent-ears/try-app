import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWallet } from '../_layout';

export default function VerifyScreen() {
  const { walletAddress } = useWallet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify & Check</Text>
      <Text style={styles.subtitle}>Check your wallet balance and verify transactions</Text>
      
      {walletAddress ? (
        <View style={styles.connectedInfo}>
          <Text style={styles.statusText}>✅ Wallet Connected</Text>
          <Text style={styles.addressText}>
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Balance:</Text>
            <Text style={styles.balanceValue}>0.00 ETH</Text>
            <Text style={styles.balanceNote}>(Demo balance)</Text>
          </View>
        </View>
      ) : (
        <View style={styles.disconnectedInfo}>
          <Text style={styles.statusText}>⚠️ Connect your wallet first</Text>
          <Text style={styles.instructionText}>
            Go to Home tab to connect your wallet
          </Text>
        </View>
      )}
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
  connectedInfo: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 280,
  },
  disconnectedInfo: {
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'monospace',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  balanceNote: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  instructionText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
  },
});