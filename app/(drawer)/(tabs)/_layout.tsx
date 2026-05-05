import { Slot } from 'expo-router';
import { View } from 'react-native';

import { TopNav } from '@/components/TopNav';

export default function MainLayout() {
  return (
    <View className="flex-1" style={{ backgroundColor: '#fdf8f3' }}>
      <TopNav />
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
}
