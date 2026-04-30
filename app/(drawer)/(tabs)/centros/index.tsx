import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { CardCentro, type Centro } from '@/components/CardCentro';
import { PageHeader } from '@/components/PageHeader';
import { StateView } from '@/components/StateView';
import api from '@/helpers/api';

const CIUDADES = ['Toda España', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];

export default function CentrosScreen() {
  const [centros, setCentros] = useState<Centro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function fetchCentros() {
      try {
        const response = await api.get('/web/centros');
        setCentros(response.data);
      } catch {
        setError('No se pudieron cargar los centros. Inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCentros();
  }, []);

  function renderContent() {
    if (isLoading) return <StateView variant="loading" message="Buscando centros cercanos…" />;
    if (error) return <StateView variant="error" message={error} />;
    if (centros.length === 0)
      return (
        <StateView
          variant="empty"
          title="Aún no hay clínicas"
          message="Pronto añadiremos centros verificados de tu zona."
        />
      );

    return (
      <View className="mx-auto w-full max-w-7xl px-6 pb-16">
        {/* Search + filters */}
        <View className="-mt-10 mb-8 rounded-3xl bg-white p-4 md:flex-row md:items-center md:gap-4"
          style={{ boxShadow: '0 24px 60px -32px rgba(124,45,18,0.28)' as any }}>
          <View className="flex-1 flex-row items-center gap-3 rounded-2xl bg-cream-50 px-4 py-3">
            <FontAwesome5 name="search" size={14} color="#7a6f63" />
            <TextInput
              placeholder="Buscar clínica, especialidad, veterinario…"
              placeholderTextColor="#a59889"
              className="flex-1 text-sm text-ink-900 outline-none"
              style={{ outline: 'none' as any }}
            />
          </View>
          <View className="mt-3 flex-row items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 md:mt-0"
            style={{ boxShadow: '0 12px 30px -12px rgba(249,115,22,0.55)' as any, cursor: 'pointer' as any }}>
            <FontAwesome5 name="sliders-h" size={12} color="#fff" />
            <Text className="text-sm font-bold text-white">Filtros</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, gap: 8 }}>
          {CIUDADES.map((ciudad, i) => {
            const isActive = i === active;
            return (
              <View
                key={ciudad}
                onPointerDown={() => setActive(i)}
                className={`rounded-full border px-5 py-2.5 ${
                  isActive
                    ? 'border-brand-500 bg-brand-500'
                    : 'border-cream-200 bg-white'
                }`}
                style={{
                  cursor: 'pointer' as any,
                  ...(isActive && {
                    boxShadow: '0 10px 24px -10px rgba(249,115,22,0.55)',
                  } as any),
                }}>
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-ink-500'
                  }`}>
                  {ciudad}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View className="mb-5 mt-2 flex-row items-baseline justify-between">
          <Text className="font-display text-2xl font-bold text-ink-900">
            {centros.length} centros disponibles
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-semibold text-ink-400">Ordenar por</Text>
            <Text className="text-xs font-bold text-brand-600">Mejor valorados</Text>
            <FontAwesome5 name="chevron-down" size={9} color="#df5a05" />
          </View>
        </View>

        <View className="flex-row flex-wrap gap-5">
          {centros.map((centro) => (
            <View
              key={centro.idCentro}
              style={{ flex: 1, minWidth: 280, maxWidth: 380 }}>
              <CardCentro centro={centro} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: '#fdf8f3' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <PageHeader
        eyebrow="Directorio verificado"
        title="Centros y veterinarios"
        subtitle="Clínicas, hospitales y especialistas certificados, listos para cuidar a tu compañero."
        icon="hospital"
        gradient="sunrise"
        stats={[
          { label: 'centros', value: centros.length || '—', icon: 'clinic-medical' },
          { label: 'ciudades', value: '24', icon: 'map-marked-alt' },
          { label: 'valoración', value: '4.8', icon: 'star' },
        ]}
      />
      {renderContent()}
    </ScrollView>
  );
}
