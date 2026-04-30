import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import api from '@/helpers/api';

type Hilo = {
  idHilo: number;
  titulo: string;
  autor: string;
  respuestas: number;
  fechaFormateada: string;
};

export default function ForoScreen() {
  const [hilos, setHilos] = useState<Hilo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHilos() {
      try {
        const response = await api.get('/web/foro/hilos');
        setHilos(response.data);
      } catch {
        setError('No se pudieron cargar los hilos del foro. Intenta de nuevo mas tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchHilos();
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

    if (hilos.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base text-slate-500">
            No hay hilos disponibles en este momento.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-auto w-full max-w-7xl px-6 py-4">
          {hilos.map((hilo) => (
            <View key={hilo.idHilo} className="mb-3 overflow-hidden rounded-2xl bg-white shadow-sm">
              <View className="flex-row items-start gap-4 px-5 py-4">
                <View className="mt-0.5 h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Text className="text-sm font-bold text-orange-500">
                    {hilo.autor.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900" numberOfLines={2}>
                    {hilo.titulo}
                  </Text>
                  <Text className="mt-1 text-xs text-slate-500">{hilo.autor}</Text>
                  <View className="mt-2 flex-row gap-3">
                    <Text className="text-xs text-slate-400">{hilo.fechaFormateada}</Text>
                    <Text className="text-xs text-orange-500">{hilo.respuestas} respuestas</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View className="border-b border-slate-100 bg-white px-6 pb-6 pt-14">
        <View className="mx-auto w-full max-w-7xl flex-row items-end justify-between">
          <View>
            <Text className="text-4xl font-extrabold tracking-tight text-slate-900">
              Foro
            </Text>
            <Text className="mt-2 text-base text-slate-500">
              Preguntas y debates de la comunidad
            </Text>
          </View>
          <View className="rounded-xl bg-orange-500 px-5 py-2.5">
            <Text className="text-sm font-bold text-white">Nuevo hilo</Text>
          </View>
        </View>
      </View>

      {renderContent()}
    </View>
  );
}
