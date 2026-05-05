import { FontAwesome5 } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

const NAV_ITEMS = [
  { href: '/centros', label: 'Centros', icon: 'hospital' },
  { href: '/adopciones', label: 'Adopciones', icon: 'paw' },
  { href: '/foro', label: 'Foro', icon: 'comments' },
  { href: '/campanas', label: 'Campañas', icon: 'bullhorn' },
] as const;

const STICKY_STYLE: any =
  Platform.OS === 'web'
    ? { position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)' }
    : {};

export function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View
      style={STICKY_STYLE}
      className="border-b border-cream-100 bg-white/90">
      <View className="mx-auto w-full max-w-7xl flex-row items-center justify-between px-6 py-3">
        <Link href="/centros" asChild>
          <Pressable
            className="flex-row items-center gap-3"
            style={{ cursor: 'pointer' as any }}>
            <View
              className="h-10 w-10 items-center justify-center rounded-2xl"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fb923c, #f97316)',
                boxShadow: '0 10px 24px -8px rgba(249,115,22,0.5)' as any,
              }}>
              <FontAwesome5 name="paw" size={15} color="#fff" />
            </View>
            <Text
              className="font-display text-xl font-bold text-ink-900"
              style={{ letterSpacing: -0.3 }}>
              PawLink
            </Text>
          </Pressable>
        </Link>

        <View className="hidden flex-row items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} asChild>
                <Pressable
                  className="rounded-full px-4 py-2"
                  style={{
                    cursor: 'pointer' as any,
                    ...((isActive
                      ? {
                          backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
                          boxShadow: '0 10px 24px -10px rgba(249,115,22,0.55)',
                        }
                      : {}) as any),
                  }}>
                  <Text
                    className={`text-sm font-semibold ${
                      isActive ? 'text-white' : 'text-ink-700'
                    }`}>
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable
            className="hidden rounded-full px-4 py-2 md:flex"
            style={{ cursor: 'pointer' as any }}>
            <Text className="text-sm font-semibold text-ink-700">Acceder</Text>
          </Pressable>
          <Pressable
            className="hidden rounded-full px-5 py-2.5 md:flex"
            style={{
              backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
              boxShadow: '0 12px 28px -10px rgba(249,115,22,0.55)' as any,
              cursor: 'pointer' as any,
            }}>
            <Text className="text-sm font-bold text-white">Crear cuenta</Text>
          </Pressable>
          <Pressable
            onPress={() => setMenuOpen((p) => !p)}
            className="h-10 w-10 items-center justify-center rounded-2xl border border-cream-200 md:hidden"
            style={{ cursor: 'pointer' as any }}>
            <FontAwesome5
              name={menuOpen ? 'times' : 'bars'}
              size={14}
              color="#3a342c"
            />
          </Pressable>
        </View>
      </View>

      {menuOpen ? (
        <View className="border-t border-cream-100 bg-white px-4 py-3 md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} asChild>
                <Pressable
                  onPress={() => setMenuOpen(false)}
                  className={`mb-1 flex-row items-center gap-3 rounded-2xl px-4 py-3 ${
                    isActive ? 'bg-brand-50' : ''
                  }`}
                  style={{ cursor: 'pointer' as any }}>
                  <View
                    className={`h-9 w-9 items-center justify-center rounded-xl ${
                      isActive ? 'bg-brand-500' : 'bg-cream-50'
                    }`}>
                    <FontAwesome5
                      name={item.icon}
                      size={12}
                      color={isActive ? '#fff' : '#df5a05'}
                    />
                  </View>
                  <Text
                    className={`text-base font-semibold ${
                      isActive ? 'text-brand-700' : 'text-ink-700'
                    }`}>
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
          <View className="mt-3 flex-row gap-2 border-t border-cream-100 pt-3">
            <Pressable
              className="flex-1 items-center justify-center rounded-full border border-cream-200 px-4 py-2.5"
              style={{ cursor: 'pointer' as any }}>
              <Text className="text-sm font-semibold text-ink-700">Acceder</Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center justify-center rounded-full px-4 py-2.5"
              style={{
                backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
                cursor: 'pointer' as any,
              }}>
              <Text className="text-sm font-bold text-white">Crear cuenta</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}
