import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { CardCentro, type Centro } from '@/components/CardCentro';
import api from '@/helpers/api';

export default function CentrosScreen() {
  const [centros, setCentros] = useState<Centro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCentros() {
      try {
        const response = await api.get('/web/centros');
        setCentros(response.data);
      } catch {
        setError('No se pudieron cargar los centros. Intenta de nuevo mas tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCentros();
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

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-auto w-full max-w-7xl px-6 py-6">
          {centros.length === 0 ? (
            <View className="items-center py-20">
              <Text className="text-center text-base text-slate-500">
                No hay clinicas disponibles en este momento.
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-4">
              {centros.map((centro) => (
                <View key={centro.idCentro} style={{ flex: 1, minWidth: 260, maxWidth: 400 }}>
                  <CardCentro centro={centro} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View className="border-b border-slate-100 bg-white px-6 pb-6 pt-14">
        <View className="mx-auto w-full max-w-7xl">
          <Text className="text-4xl font-extrabold tracking-tight text-slate-900">
            Directorio de Centros
          </Text>
          <Text className="mt-2 text-base text-slate-500">
            Clinicas y veterinarios verificados en tu zona
          </Text>
        </View>
      </View>

      {renderContent()}
    </View>
  );
}
