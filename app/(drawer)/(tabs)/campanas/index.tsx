import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { HoverCard } from '@/components/HoverCard';
import { InputWeb, SubmitButton } from '@/components/InputWeb';
import { ModalForm } from '@/components/ModalForm';
import { PageHeader } from '@/components/PageHeader';
import { StateView } from '@/components/StateView';
import api from '@/helpers/api';

type Campana = {
  idCampana: number;
  titulo: string;
  objetivoDinero: number;
  recaudado: number;
  fotoUrl: string;
};

function formatEuro(value: number) {
  return value.toLocaleString('es-ES');
}

type ProgressBarProps = Readonly<{
  percent: number;
  color?: string;
  bg?: string;
  height?: number;
}>;

function ProgressBar({
  percent,
  color = '#f97316',
  bg = '#ffe6d0',
  height = 8,
}: ProgressBarProps) {
  return (
    <View
      className="w-full overflow-hidden rounded-full"
      style={{ height, backgroundColor: bg }}>
      <View
        className="h-full rounded-full"
        style={{
          width: `${percent}%`,
          backgroundImage: `linear-gradient(90deg, ${color}, #fbbf24)`,
        }}
      />
    </View>
  );
}

const SUGGESTED_AMOUNTS = [5, 10, 25, 50];

export default function CampanasScreen() {
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCampana, setActiveCampana] = useState<Campana | null>(null);
  const [cantidad, setCantidad] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampanas() {
      try {
        const response = await api.get('/web/campanas');
        setCampanas(response.data);
      } catch {
        setError('No se pudieron cargar las campañas. Inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCampanas();
  }, []);

  function openDonate(campana: Campana) {
    setActiveCampana(campana);
    setCantidad('');
    setSubmitError(null);
  }

  function closeDonate() {
    if (submitting) return;
    setActiveCampana(null);
  }

  async function handleDonate() {
    if (!activeCampana) return;
    const amount = Number(cantidad.replace(',', '.'));
    if (!Number.isFinite(amount) || amount <= 0) {
      setSubmitError('Introduce una cantidad válida mayor que cero.');
      return;
    }
    try {
      setSubmitting(true);
      setSubmitError(null);
      await api.post(`/web/campanas/${activeCampana.idCampana}/donar`, {
        cantidad: amount,
      });
      setCampanas((prev) =>
        prev.map((c) =>
          c.idCampana === activeCampana.idCampana
            ? { ...c, recaudado: c.recaudado + amount }
            : c,
        ),
      );
      setActiveCampana(null);
    } catch {
      setSubmitError('No se pudo procesar la donación. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  function renderContent() {
    if (isLoading)
      return <StateView variant="loading" message="Cargando causas que necesitan tu ayuda…" />;
    if (error) return <StateView variant="error" message={error} />;
    if (campanas.length === 0)
      return (
        <StateView
          variant="empty"
          title="No hay campañas activas"
          message="Vuelve pronto, siempre hay nuevas causas que apoyar."
        />
      );

    const [destacada, ...resto] = campanas;
    const porcentajeDest =
      destacada.objetivoDinero > 0
        ? Math.min((destacada.recaudado / destacada.objetivoDinero) * 100, 100)
        : 0;

    return (
      <View className="mx-auto w-full max-w-7xl px-6 pb-16">
        {/* Featured */}
        <HoverCard className="-mt-14 mb-10 overflow-hidden rounded-3xl" lift={4}>
          <View className="md:flex-row">
            <View className="relative h-64 md:h-auto md:w-1/2">
              {destacada.fotoUrl ? (
                <Image
                  source={{ uri: destacada.fotoUrl }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              ) : (
                <View
                  className="h-full w-full items-center justify-center"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #fb923c, #f43f5e)',
                  }}>
                  <FontAwesome5 name="hand-holding-heart" size={48} color="#fff" />
                </View>
              )}
              <View
                pointerEvents="none"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(249,115,22,0.35), rgba(244,63,94,0.2))',
                }}
              />
              <View
                className="absolute left-5 top-5 flex-row items-center gap-2 rounded-full bg-white/95 px-3 py-1.5"
                style={{ backdropFilter: 'blur(8px)' as any }}>
                <View className="h-2 w-2 rounded-full bg-brand-500" />
                <Text className="text-[11px] font-bold uppercase tracking-widest text-brand-700">
                  Campaña destacada
                </Text>
              </View>
            </View>

            <View
              className="flex-1 p-7 md:p-10"
              style={{ backgroundImage: 'linear-gradient(135deg, #fff5ec, #ffe6d0)' }}>
              <Text
                className="font-display text-3xl font-bold text-ink-900 md:text-4xl"
                numberOfLines={3}>
                {destacada.titulo}
              </Text>

              <View className="mt-6">
                <View className="flex-row items-baseline gap-2">
                  <Text className="font-display text-3xl font-bold text-brand-600">
                    {formatEuro(destacada.recaudado)}€
                  </Text>
                  <Text className="text-sm text-ink-500">
                    de {formatEuro(destacada.objetivoDinero)}€
                  </Text>
                </View>
                <View className="mt-3">
                  <ProgressBar percent={porcentajeDest} height={10} />
                </View>
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-xs font-bold text-brand-700">
                    {porcentajeDest.toFixed(0)}% conseguido
                  </Text>
                  <View className="flex-row items-center gap-1.5">
                    <FontAwesome5 name="users" size={11} color="#7a6f63" />
                    <Text className="text-xs font-semibold text-ink-500">284 donantes</Text>
                  </View>
                </View>
              </View>

              <View className="mt-7 flex-row gap-3">
                <Pressable
                  onPress={() => openDonate(destacada)}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-3"
                  style={{
                    backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
                    boxShadow: '0 18px 38px -16px rgba(249,115,22,0.55)' as any,
                    cursor: 'pointer' as any,
                  }}>
                  <FontAwesome5 name="heart" size={13} color="#fff" solid />
                  <Text className="text-sm font-bold text-white">Donar ahora</Text>
                </Pressable>
                <Pressable
                  className="flex-row items-center justify-center gap-2 rounded-2xl border border-cream-200 bg-white px-5 py-3"
                  style={{ cursor: 'pointer' as any }}>
                  <FontAwesome5 name="share-alt" size={12} color="#df5a05" />
                  <Text className="text-sm font-bold text-brand-600">Compartir</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </HoverCard>

        {/* Other campaigns */}
        {resto.length > 0 ? (
          <>
            <View className="mb-5 flex-row items-baseline justify-between">
              <Text className="font-display text-2xl font-bold text-ink-900">
                Otras causas que necesitan ayuda
              </Text>
              <Text className="text-xs font-semibold text-ink-400">
                {resto.length} activas
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-5">
              {resto.map((campana) => {
                const porcentaje =
                  campana.objetivoDinero > 0
                    ? Math.min((campana.recaudado / campana.objetivoDinero) * 100, 100)
                    : 0;

                return (
                  <View
                    key={campana.idCampana}
                    style={{ flex: 1, minWidth: 320, maxWidth: 480 }}>
                    <HoverCard className="overflow-hidden rounded-3xl bg-white">
                      <View className="flex-row">
                        <View className="relative" style={{ width: 140 }}>
                          {campana.fotoUrl ? (
                            <Image
                              source={{ uri: campana.fotoUrl }}
                              style={{ width: 140, height: '100%' as any, minHeight: 180 }}
                              resizeMode="cover"
                            />
                          ) : (
                            <View
                              className="items-center justify-center"
                              style={{
                                width: 140,
                                minHeight: 180,
                                backgroundImage:
                                  'linear-gradient(135deg, #ffedd5, #fed7aa)',
                              }}>
                              <FontAwesome5 name="paw" size={24} color="#f97316" />
                            </View>
                          )}
                          <View
                            className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5"
                            style={{ backdropFilter: 'blur(6px)' as any }}>
                            <Text className="text-[10px] font-bold text-brand-700">
                              {porcentaje.toFixed(0)}%
                            </Text>
                          </View>
                        </View>

                        <View className="flex-1 justify-between p-5">
                          <View>
                            <Text
                              className="font-display text-base font-bold text-ink-900"
                              numberOfLines={2}>
                              {campana.titulo}
                            </Text>
                            <View className="mt-1.5 flex-row items-baseline gap-1.5">
                              <Text className="text-base font-bold text-brand-600">
                                {formatEuro(campana.recaudado)}€
                              </Text>
                              <Text className="text-xs text-ink-400">
                                / {formatEuro(campana.objetivoDinero)}€
                              </Text>
                            </View>
                          </View>

                          <View className="mt-3">
                            <ProgressBar percent={porcentaje} height={6} />
                            <View className="mt-3 flex-row items-center justify-between gap-2">
                              <View className="flex-row items-center gap-1.5">
                                <FontAwesome5 name="users" size={10} color="#7a6f63" />
                                <Text className="text-[11px] font-semibold text-ink-500">
                                  {Math.floor(50 + (campana.idCampana % 7) * 27)} donantes
                                </Text>
                              </View>
                              <Pressable
                                onPress={() => openDonate(campana)}
                                className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
                                style={{
                                  backgroundImage:
                                    'linear-gradient(120deg, #fb923c, #f97316)',
                                  boxShadow:
                                    '0 10px 22px -12px rgba(249,115,22,0.55)' as any,
                                  cursor: 'pointer' as any,
                                }}>
                                <FontAwesome5 name="heart" size={9} color="#fff" solid />
                                <Text className="text-[11px] font-bold text-white">
                                  Donar
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    </HoverCard>
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: '#fdf8f3' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <PageHeader
          eyebrow="Solidaridad animal"
          title="Cada euro cuenta una historia"
          subtitle="Apoya rescates, tratamientos veterinarios y campañas de bienestar animal lideradas por protectoras verificadas."
          icon="hand-holding-heart"
          gradient="sand"
          stats={[
            { label: 'campañas', value: campanas.length || '—', icon: 'bullhorn' },
            { label: 'recaudado', value: '142k€', icon: 'euro-sign' },
            { label: 'donantes', value: '5.4k', icon: 'users' },
          ]}
        />
        {renderContent()}
      </ScrollView>

      <ModalForm
        open={activeCampana !== null}
        onClose={closeDonate}
        title="Apoya esta causa"
        subtitle={activeCampana?.titulo}
        icon="hand-holding-heart">
        <View className="mb-4 rounded-2xl bg-cream-50 px-4 py-3">
          <Text className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
            Cantidades sugeridas
          </Text>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {SUGGESTED_AMOUNTS.map((amt) => {
              const isActive = cantidad === String(amt);
              return (
                <Pressable
                  key={amt}
                  onPress={() => setCantidad(String(amt))}
                  className={`rounded-full border-2 px-4 py-2 ${
                    isActive
                      ? 'border-transparent bg-brand-500'
                      : 'border-cream-200 bg-white'
                  }`}
                  style={{ cursor: 'pointer' as any }}>
                  <Text
                    className={`text-xs font-bold ${
                      isActive ? 'text-white' : 'text-ink-700'
                    }`}>
                    {amt}€
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <InputWeb
          label="Cantidad a donar (€)"
          value={cantidad}
          onChangeText={setCantidad}
          placeholder="Ej: 15"
          numeric
          required
          icon="euro-sign"
          hint="Mínimo 1€"
        />

        {submitError ? (
          <View className="mb-3 flex-row items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3">
            <FontAwesome5 name="exclamation-circle" size={12} color="#e11d48" />
            <Text className="flex-1 text-xs font-semibold text-rose-700">{submitError}</Text>
          </View>
        ) : null}

        <SubmitButton
          onPress={handleDonate}
          loading={submitting}
          loadingText="Procesando..."
          icon="heart">
          Donar ahora
        </SubmitButton>
      </ModalForm>
    </>
  );
}
