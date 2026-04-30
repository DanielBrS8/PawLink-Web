import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

type IconProps = Readonly<{ color: string; focused: boolean }>;

function TabIcon({
  name,
  color,
  focused,
}: Readonly<{
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  focused: boolean;
}>) {
  return (
    <View style={focused ? styles.iconWrapFocused : styles.iconWrap}>
      <FontAwesome5 name={name} size={focused ? 16 : 17} color={color} solid={focused} />
    </View>
  );
}

function CentrosIcon(p: IconProps) { return <TabIcon name="hospital-alt" {...p} />; }
function AdopcionesIcon(p: IconProps) { return <TabIcon name="paw" {...p} />; }
function ForoIcon(p: IconProps) { return <TabIcon name="comments" {...p} />; }
function CampanasIcon(p: IconProps) { return <TabIcon name="bullhorn" {...p} />; }

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#a59889',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
      }}>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="two" options={{ href: null }} />
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
        options={{ title: 'Campañas', tabBarIcon: CampanasIcon }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 70,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: '#1f1b16',
    borderTopWidth: 0,
    borderRadius: 22,
    elevation: 12,
    boxShadow: '0 24px 60px -16px rgba(31,27,22,0.45)' as any,
  },
  item: {
    borderRadius: 16,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  iconWrap: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#f97316',
    boxShadow: '0 8px 18px -6px rgba(249,115,22,0.7)' as any,
  },
});
