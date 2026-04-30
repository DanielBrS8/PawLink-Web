import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

type IconProps = Readonly<{ color: string }>;

function TabIcon({
  name,
  color,
}: Readonly<{
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}>) {
  return <FontAwesome name={name} size={20} color={color} style={styles.icon} />;
}

function CentrosIcon({ color }: IconProps) {
  return <TabIcon name="hospital-o" color={color} />;
}

function AdopcionesIcon({ color }: IconProps) {
  return <TabIcon name="paw" color={color} />;
}

function ForoIcon({ color }: IconProps) {
  return <TabIcon name="comments-o" color={color} />;
}

function CampanasIcon({ color }: IconProps) {
  return <TabIcon name="bullhorn" color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}>
      <Tabs.Screen
        name="centros"
        options={{ title: 'Centros', tabBarIcon: CentrosIcon }}
      />
      <Tabs.Screen
        name="adopciones"
        options={{ title: 'Adopciones', tabBarIcon: AdopcionesIcon }}
      />
      <Tabs.Screen
        name="foro"
        options={{ title: 'Foro', tabBarIcon: ForoIcon }}
      />
      <Tabs.Screen
        name="campanas"
        options={{ title: 'Campanas', tabBarIcon: CampanasIcon }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopColor: '#f1f5f9',
    borderTopWidth: 1,
    height: 62,
    paddingBottom: 10,
    paddingTop: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  icon: {
    marginBottom: -2,
  },
});
