import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Text, View } from 'react-native';

function HeaderTitle() {
  return (
    <View className="flex-row items-center gap-2.5">
      <View
        className="h-8 w-8 items-center justify-center rounded-xl"
        style={{
          backgroundImage: 'linear-gradient(135deg, #fb923c, #f97316)',
          boxShadow: '0 8px 18px -6px rgba(249,115,22,0.6)' as any,
        }}>
        <FontAwesome5 name="paw" size={14} color="#fff" solid />
      </View>
      <Text
        className="font-display text-xl font-bold text-ink-900"
        style={{ letterSpacing: -0.4 }}>
        Paw<Text className="text-brand-500">Link</Text>
      </Text>
    </View>
  );
}

function HomeDrawerIcon({ size, color }: Readonly<{ size: number; color: string }>) {
  return <Ionicons name="home-outline" size={size} color={color} />;
}

const renderHeaderTitle = () => <HeaderTitle />;

const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerTitle: renderHeaderTitle,
        headerStyle: {
          backgroundColor: '#fdf8f3',
          boxShadow: '0 4px 18px -10px rgba(124,45,18,0.18)' as any,
          borderBottomWidth: 0,
        },
        headerTintColor: '#df5a05',
        drawerActiveTintColor: '#f97316',
        drawerActiveBackgroundColor: '#fff5ec',
        drawerLabelStyle: { fontWeight: '600', fontSize: 14 },
        drawerStyle: { backgroundColor: '#fdf8f3' },
      }}>
      <Drawer.Screen name="index" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Inicio',
          drawerIcon: HomeDrawerIcon,
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
