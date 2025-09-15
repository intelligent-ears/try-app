# MoPro ZK Proof React Native App

A React Native application demonstrating Zero-Knowledge proof generation and verification using MoPro (Mobile Proving) framework.

## Features

- **Home Screen**: Overview of ZK proofs and app functionality
- **Generate Proof**: Interface for creating ZK proofs with secret inputs
- **Verify Proof**: Interface for validating ZK proofs
- **Modern UI**: Clean, professional design optimized for mobile devices
- **Tab Navigation**: Easy navigation between different screens

## Current Status

This is a **proof-of-concept** that demonstrates the UI structure and workflow for MoPro integration. The app currently uses mock implementations for proof generation and verification.

## For Production Use

To integrate actual MoPro functionality, you'll need to:

### 1. Install MoPro SDK

```bash
# Add MoPro dependencies (example - check latest MoPro docs)
npm install @mopro/react-native
```

### 2. Set up Native Modules

Since MoPro requires native code compilation, you'll need to:

- **Option A**: Eject from Expo managed workflow
- **Option B**: Use Expo Development Build (recommended)

```bash
# Create development build
npx expo install expo-dev-client
npx expo run:ios
# or
npx expo run:android
```

### 3. Add Circuit Files

Place your ZK circuit files (`.wasm`, `.zkey`, etc.) in your project assets:

```
assets/
├── circuits/
│   ├── circuit.wasm
│   ├── circuit_final.zkey
│   └── verification_key.json
```

### 4. Create Native Bridge Code

Create bridge modules to connect JavaScript to MoPro native SDK:

```typescript
// Example bridge module structure
import { NativeModules } from 'react-native';

interface MoProModule {
  generateProof(input: string, circuitPath: string): Promise<string>;
  verifyProof(proof: string, vkPath: string): Promise<boolean>;
}

const { MoPro } = NativeModules;
export default MoPro as MoProModule;
```

### 5. Update App Logic

Replace mock implementations in the generate and verify screens:

```typescript
// In generate.tsx
import MoPro from '../native-modules/MoPro';

const generateProof = async () => {
  try {
    const proof = await MoPro.generateProof(secret, 'circuit.wasm');
    setProof(proof);
  } catch (error) {
    console.error('Proof generation failed:', error);
  }
};

// In verify.tsx
const verifyProof = async () => {
  try {
    const isValid = await MoPro.verifyProof(proofInput, 'verification_key.json');
    setVerificationResult({ isValid, message: isValid ? 'Valid' : 'Invalid' });
  } catch (error) {
    console.error('Verification failed:', error);
  }
};
```

## Architecture Overview

```
app/
├── (tabs)/
│   ├── _layout.tsx      # Tab navigation setup
│   ├── index.tsx        # Home screen with app overview
│   ├── generate.tsx     # ZK proof generation interface
│   └── verify.tsx       # ZK proof verification interface
```

## Key Components

- **Tab Navigation**: Uses Expo Router tabs with Lucide React Native icons
- **Mock Implementations**: Simulates MoPro SDK calls for demonstration
- **Responsive Design**: Optimized for mobile devices with clean UI
- **Error Handling**: Proper error states and user feedback
- **Loading States**: Shows loading indicators during async operations

## Development

```bash
# Start the development server
npm run dev

# Build for web (preview)
npm run build:web
```

## Notes for MoPro Integration

1. **Circuit Preparation**: Prepare your ZK circuits using circom/snarkjs
2. **Native Dependencies**: MoPro requires native compilation, not available in web preview
3. **Performance**: ZK proof generation can be computationally intensive on mobile
4. **Memory Management**: Consider memory constraints when loading large circuits
5. **Error Handling**: Implement robust error handling for circuit loading and proof operations

## Resources

- [MoPro Documentation](https://github.com/zkmopro/mopro)
- [Expo Development Build](https://docs.expo.dev/development/build/)
- [React Native Navigation](https://reactnavigation.org/)
- [Zero-Knowledge Proofs](https://ethereum.org/en/zero-knowledge-proofs/)

## License

MIT