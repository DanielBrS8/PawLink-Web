import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { CardMascota, type Mascota } from '@/components/CardMascota';
import { PageHeader } from '@/components/PageHeader';
import { StateView } from '@/components/StateView';
import api from '@/helpers/api';

const CATEGORIAS: { key: string; label: string; icon: any; match: (m: Mascota) => boolean }[] = [
  { key: 'todos', label: 'Todos', icon: 'paw', match: () => true },
  { key: 'perros', label: 'Perros', icon: 'dog', match: (m) => m.especie === 'Perro' },
  { key: 'gatos', label: 'Gatos', icon: 'cat', match: (m) => m.especie === 'Gato' },
  { key: 'conejos', label: 'Conejos', icon: 'carrot', match: (m) => m.especie === 'Conejo' },
  { key: 'aves', label: 'Aves', icon: 'dove', match: (m) => m.especie === 'Ave' },
];

export default function AdopcionesScreen() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState('todos');

  useEffect(() => {
    async function fetchMascotas() {
      try {
        const response = await api.get('/web/adopciones');
        setMascotas(response.data);
      } catch {
        setError('No se pudieron cargar las adopciones. Inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMascotas();
  }, []);

  const filtered = useMemo(() => {
    const cat = CATEGORIAS.find((c) => c.key === activeCat);
    return cat ? mascotas.filter(cat.match) : mascotas;
  }, [mascotas, activeCat]);

  function renderContent() {
    if (isLoading) return <StateView variant="loading" message="Buscando peludos esperando un hogar…" />;
    if (error) return <StateView variant="error" message={error} />;

    return (
      <View className="mx-auto w-full max-w-7xl px-6 pb-16">
        {/* Category cards */}
        <View className="-mt-12 mb-10 flex-row flex-wrap gap-3">
          {CATEGORIAS.map((cat) => {
            const isActive = cat.key === activeCat;
            const count = mascotas.filter(cat.match).length;
            return (
              <View
                key={cat.key}
                onPointerDown={() => setActiveCat(cat.key)}
                className={`flex-1 flex-row items-center gap-3 rounded-2xl border px-4 py-3 ${
                  isActive
                    ? 'border-transparent bg-brand-500'
                    : 'border-cream-200 bg-white'
                }`}
                style={{
                  minWidth: 140,
                  cursor: 'pointer' as any,
                  boxShadow: isActive
                    ? ('0 14px 30px -12px rgba(249,115,22,0.55)' as any)
                    : ('0 6px 18px -10px rgba(124,45,18,0.12)' as any),
                }}>
                <View
                  className={`h-10 w-10 items-center justify-center rounded-xl ${
                    isActive ? 'bg-white/20' : 'bg-brand-50'
                  }`}>
                  <FontAwesome5
                    name={cat.icon}
                    size={14}
                    color={isActive ? '#fff' : '#f97316'}
                    solid={cat.key !== 'todos'}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className={`text-sm font-bold ${isActive ? 'text-white' : 'text-ink-900'}`}>
                    {cat.label}
                  </Text>
                  <Text
                    className={`text-xs ${isActive ? 'text-white/80' : 'text-ink-400'}`}>
                    {count} disponibles
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {filtered.length === 0 ? (
          <StateView
            variant="empty"
            title="Sin candidatos en esta categoría"
            message="Prueba con otra especie o vuelve más tarde — siempre hay peludos nuevos."
          />
        ) : (
          <>
            <View className="mb-5 flex-row items-baseline justify-between">
              <Text className="font-display text-2xl font-bold text-ink-900">
                {filtered.length} esperando un hogar
              </Text>
              <View className="flex-row items-center gap-2">
                <FontAwesome5 name="heart" size={11} color="#f97316" />
                <Text className="text-xs font-semibold text-brand-600">
                  Adopta, no compres
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-5">
              {filtered.map((mascota) => (
                <View
                  key={mascota.idMascota}
                  style={{ flex: 1, minWidth: 240, maxWidth: 320 }}>
                  <CardMascota mascota={mascota} />
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: '#fdf8f3' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <PageHeader
        eyebrow="Adopta · No compres"
        title="Encuentra a tu nuevo mejor amigo"
        subtitle="Cada perfil es una historia que espera un final feliz. Conoce a peludos rescatados y dales el hogar que merecen."
        icon="paw"
        gradient="rose"
        stats={[
          { label: 'mascotas', value: mascotas.length || '—', icon: 'paw' },
          { label: 'adoptadas', value: '1.2k', icon: 'home' },
          { label: 'protectoras', value: '38', icon: 'hands-helping' },
        ]}
      />
      {renderContent()}
    </ScrollView>
  );
}
