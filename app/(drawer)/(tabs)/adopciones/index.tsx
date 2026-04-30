import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import api from '@/helpers/api';

type Mascota = {
  idMascota: number;
  nombre: string;
  especie: string;
  raza: string;
  edadAprox: string;
  fotoUrl: string;
};

const CATEGORIAS = ['Todos', 'Perros', 'Gatos', 'Conejos', 'Aves'];

export default function AdopcionesScreen() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMascotas() {
      try {
        const response = await api.get('/web/adopciones');
        setMascotas(response.data);
      } catch {
        setError('No se pudieron cargar las adopciones. Intenta de nuevo mas tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMascotas();
  }, []);

  function renderContent() {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base text-red-500">{error}</Text>
        </View>
      );
    }

    if (mascotas.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base text-slate-500">
            No hay mascotas disponibles en este momento.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-auto w-full max-w-7xl">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, gap: 8 }}>
            {CATEGORIAS.map((cat, i) => (
              <View
                key={cat}
                className={`rounded-full px-4 py-2 ${i === 0 ? 'bg-orange-500' : 'border border-slate-200 bg-white'}`}>
                <Text className={`text-sm font-semibold ${i === 0 ? 'text-white' : 'text-slate-600'}`}>
                  {cat}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row flex-wrap gap-4 px-6 pb-8">
            {mascotas.map((mascota) => (
              <View
                key={mascota.idMascota}
                style={{ flex: 1, minWidth: 200, maxWidth: 320 }}
                className="overflow-hidden rounded-2xl bg-white shadow-sm">
                {mascota.fotoUrl ? (
                  <Image
                    source={{ uri: mascota.fotoUrl }}
                    className="h-44 w-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="h-44 w-full items-center justify-center bg-orange-50">
                    <View className="h-12 w-12 rounded-full bg-orange-200" />
                  </View>
                )}
                <View className="px-4 py-3">
                  <Text className="text-base font-bold text-slate-900" numberOfLines={1}>
                    {mascota.nombre}
                  </Text>
                  <Text className="mt-0.5 text-sm text-slate-500" numberOfLines={1}>
                    {mascota.raza} · {mascota.edadAprox}
                  </Text>
                  <View className="mt-2 self-start rounded-full bg-orange-100 px-3 py-1">
                    <Text className="text-xs font-semibold text-orange-600">
                      {mascota.especie}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View className="border-b border-slate-100 bg-white px-6 pb-6 pt-14">
        <View className="mx-auto w-full max-w-7xl">
          <Text className="text-4xl font-extrabold tracking-tight text-slate-900">
            Adopciones
          </Text>
          <Text className="mt-2 text-base text-slate-500">
            Mascotas en busca de un hogar permanente
          </Text>
        </View>
      </View>

      {renderContent()}
    </View>
  );
}
