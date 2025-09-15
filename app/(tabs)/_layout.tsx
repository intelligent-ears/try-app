import { Tabs } from 'expo-router';
import { Shield, Key, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function TabLayout() {
  return (
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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Shield size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: 'Generate',
          tabBarIcon: ({ size, color }) => (
            <Key size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="verify"
        options={{
          title: 'Verify',
          tabBarIcon: ({ size, color }) => (
            <CheckCircle size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}