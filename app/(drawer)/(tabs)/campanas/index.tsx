import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import api from '@/helpers/api';

type Campana = {
  idCampana: number;
  titulo: string;
  objetivoDinero: number;
  recaudado: number;
  fotoUrl: string;
};

export default function CampanasScreen() {
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampanas() {
      try {
        const response = await api.get('/web/campanas');
        setCampanas(response.data);
      } catch {
        setError('No se pudieron cargar las campanas. Intenta de nuevo mas tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCampanas();
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

    if (campanas.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base text-slate-500">
            No hay campanas disponibles en este momento.
          </Text>
        </View>
      );
    }

    const [destacada, ...resto] = campanas;
    const porcentajeDestacada =
      destacada.objetivoDinero > 0
        ? Math.min((destacada.recaudado / destacada.objetivoDinero) * 100, 100)
        : 0;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-auto w-full max-w-7xl px-6 py-6">
          <View className="mb-6 overflow-hidden rounded-2xl bg-orange-500">
            <View className="px-6 py-8">
              <Text className="text-xs font-bold uppercase tracking-widest text-orange-200">
                Campana destacada
              </Text>
              <Text className="mt-3 text-xl font-bold text-white" numberOfLines={2}>
                {destacada.titulo}
              </Text>
              <Text className="mt-1 text-sm text-orange-200">
                {destacada.recaudado.toLocaleString('es-ES')} € recaudados de{' '}
                {destacada.objetivoDinero.toLocaleString('es-ES')} €
              </Text>
              <View className="mt-5 h-2 w-full overflow-hidden rounded-full bg-orange-400">
                <View
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${porcentajeDestacada}%` }}
                />
              </View>
              <View className="mt-2 flex-row justify-between">
                <Text className="text-xs text-orange-200">
                  {porcentajeDestacada.toFixed(0)}% completado
                </Text>
                <Text className="text-xs text-orange-200">
                  Meta: {destacada.objetivoDinero.toLocaleString('es-ES')} €
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-4">
            {resto.map((campana) => {
              const porcentaje =
                campana.objetivoDinero > 0
                  ? Math.min((campana.recaudado / campana.objetivoDinero) * 100, 100)
                  : 0;

              return (
                <View key={campana.idCampana} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <View className="flex-row">
                    {campana.fotoUrl ? (
                      <Image
                        source={{ uri: campana.fotoUrl }}
                        style={{ width: 112, height: 112 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        style={{ width: 112, height: 112 }}
                        className="items-center justify-center bg-orange-50">
                        <View className="h-8 w-8 rounded-full bg-orange-200" />
                      </View>
                    )}
                    <View className="flex-1 justify-center px-4 py-3">
                      <Text className="text-sm font-bold text-slate-900" numberOfLines={2}>
                        {campana.titulo}
                      </Text>
                      <Text className="mt-1 text-xs text-slate-500">
                        {campana.recaudado.toLocaleString('es-ES')} € de{' '}
                        {campana.objetivoDinero.toLocaleString('es-ES')} €
                      </Text>
                      <View className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <View
                          className="h-2 rounded-full bg-orange-400"
                          style={{ width: `${porcentaje}%` }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
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
            Campanas
          </Text>
          <Text className="mt-2 text-base text-slate-500">
            Apoya causas de rescate y bienestar animal
          </Text>
        </View>
      </View>

      {renderContent()}
    </View>
  );
}
