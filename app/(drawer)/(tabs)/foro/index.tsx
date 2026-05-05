import { FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { HoverCard } from '@/components/HoverCard';
import { InputWeb, SubmitButton } from '@/components/InputWeb';
import { ModalForm } from '@/components/ModalForm';
import { PageHeader } from '@/components/PageHeader';
import { StateView } from '@/components/StateView';
import api from '@/helpers/api';

type Hilo = {
  idHilo: number;
  titulo: string;
  autor: string;
  respuestas: number;
  fechaFormateada: string;
};

const FILTROS = ['Recientes', 'Más comentados', 'Sin respuesta', 'Salud', 'Adopción'];

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #fb923c, #f43f5e)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #f97316, #ec4899)',
  'linear-gradient(135deg, #fbbf24, #f97316)',
  'linear-gradient(135deg, #fb7185, #f97316)',
];

function avatarGradient(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash + (ch.codePointAt(0) ?? 0)) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[hash];
}

export default function ForoScreen() {
  const [hilos, setHilos] = useState<Hilo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const fetchHilos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/web/foro/hilos');
      setHilos(response.data);
      setError(null);
    } catch {
      setError('No se pudieron cargar los hilos del foro. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHilos();
  }, [fetchHilos]);

  const totalRespuestas = useMemo(
    () => hilos.reduce((acc, h) => acc + h.respuestas, 0),
    [hilos],
  );

  function openModal() {
    setSubmitError(null);
    setTitulo('');
    setContenido('');
    setModalOpen(true);
  }

  function closeModal() {
    if (submitting) return;
    setModalOpen(false);
  }

  async function handleSubmit() {
    if (!titulo.trim() || !contenido.trim()) {
      setSubmitError('El título y el contenido son obligatorios.');
      return;
    }
    try {
      setSubmitting(true);
      setSubmitError(null);
      await api.post('/web/foro/hilos', {
        titulo: titulo.trim(),
        contenido: contenido.trim(),
      });
      setModalOpen(false);
      await fetchHilos();
    } catch {
      setSubmitError('No se pudo crear el hilo. Inténtalo de nuevo en un momento.');
    } finally {
      setSubmitting(false);
    }
  }

  const newThreadAction = (
    <Pressable
      onPress={openModal}
      className="flex-row items-center gap-2 rounded-2xl bg-white px-5 py-3"
      style={{
        boxShadow: '0 18px 40px -16px rgba(124,45,18,0.4)' as any,
        cursor: 'pointer' as any,
      }}>
      <FontAwesome5 name="pen" size={12} color="#df5a05" />
      <Text className="text-sm font-bold text-brand-700">Nuevo hilo</Text>
    </Pressable>
  );

  function renderContent() {
    if (isLoading) return <StateView variant="loading" message="Cargando conversaciones…" />;
    if (error) return <StateView variant="error" message={error} />;
    if (hilos.length === 0)
      return (
        <StateView
          variant="empty"
          title="Aún no hay conversaciones"
          message="Sé el primero en abrir un hilo y empieza a construir comunidad."
        />
      );

    return (
      <View className="mx-auto w-full max-w-7xl px-6 pb-16">
        {/* Search */}
        <View
          className="-mt-10 mb-6 flex-row items-center gap-3 rounded-3xl bg-white p-4"
          style={{ boxShadow: '0 24px 60px -32px rgba(124,45,18,0.28)' as any }}>
          <View className="flex-1 flex-row items-center gap-3 rounded-2xl bg-cream-50 px-4 py-3">
            <FontAwesome5 name="search" size={14} color="#7a6f63" />
            <TextInput
              placeholder="Buscar en el foro…"
              placeholderTextColor="#a59889"
              className="flex-1 text-sm text-ink-900"
              style={{ outline: 'none' as any }}
            />
          </View>
          <Pressable
            onPress={openModal}
            className="hidden flex-row items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 md:flex"
            style={{
              boxShadow: '0 18px 40px -16px rgba(249,115,22,0.55)' as any,
              cursor: 'pointer' as any,
            }}>
            <FontAwesome5 name="pen" size={12} color="#fff" />
            <Text className="text-sm font-bold text-white">Nuevo hilo</Text>
          </Pressable>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 18, gap: 8 }}>
          {FILTROS.map((label, i) => {
            const isActive = i === active;
            return (
              <Pressable
                key={label}
                onPress={() => setActive(i)}
                className={`rounded-full border px-5 py-2.5 ${
                  isActive
                    ? 'border-brand-500 bg-brand-500'
                    : 'border-cream-200 bg-white'
                }`}
                style={{
                  cursor: 'pointer' as any,
                  ...((isActive
                    ? { boxShadow: '0 10px 24px -10px rgba(249,115,22,0.55)' }
                    : {}) as any),
                }}>
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-ink-500'
                  }`}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="mb-4 mt-2 flex-row items-baseline justify-between">
          <Text className="font-display text-2xl font-bold text-ink-900">
            {hilos.length} hilos activos
          </Text>
          <Text className="text-xs font-semibold text-ink-400">
            {totalRespuestas} respuestas en total
          </Text>
        </View>

        <View className="gap-3">
          {hilos.map((hilo, idx) => {
            const isPinned = idx === 0;
            return (
              <HoverCard
                key={hilo.idHilo}
                lift={3}
                className={`overflow-hidden rounded-2xl ${isPinned ? '' : 'bg-white'}`}
                style={
                  isPinned
                    ? ({
                        backgroundImage:
                          'linear-gradient(120deg, #fff5ec 0%, #ffffff 60%)',
                      } as any)
                    : undefined
                }>
                <View className="flex-row items-start gap-4 px-5 py-5">
                  <View
                    className="h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundImage: avatarGradient(hilo.autor) }}>
                    <Text
                      className="font-display text-lg font-bold text-white"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' } as any}>
                      {hilo.autor.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      {isPinned ? (
                        <View className="flex-row items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5">
                          <FontAwesome5 name="thumbtack" size={9} color="#df5a05" />
                          <Text className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                            Destacado
                          </Text>
                        </View>
                      ) : null}
                      <Text className="text-xs font-semibold text-ink-500">{hilo.autor}</Text>
                      <View className="h-1 w-1 rounded-full bg-ink-200" />
                      <Text className="text-xs text-ink-400">{hilo.fechaFormateada}</Text>
                    </View>
                    <Text
                      className="mt-1.5 font-display text-base font-bold text-ink-900"
                      numberOfLines={2}>
                      {hilo.titulo}
                    </Text>

                    <View className="mt-3 flex-row items-center gap-4">
                      <View className="flex-row items-center gap-1.5">
                        <FontAwesome5 name="comment-dots" size={11} color="#f97316" />
                        <Text className="text-xs font-semibold text-brand-600">
                          {hilo.respuestas} respuestas
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1.5">
                        <FontAwesome5 name="eye" size={11} color="#7a6f63" />
                        <Text className="text-xs font-semibold text-ink-500">
                          {hilo.respuestas * 14} vistas
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="hidden items-end gap-2 md:flex">
                    <View className="flex-row -space-x-2">
                      {[0, 1, 2].map((i) => (
                        <View
                          key={i}
                          className="h-7 w-7 rounded-full border-2 border-white"
                          style={{
                            backgroundImage: AVATAR_GRADIENTS[(idx + i) % AVATAR_GRADIENTS.length],
                          }}
                        />
                      ))}
                    </View>
                    <Text className="text-[10px] font-semibold text-ink-400">
                      última actividad hoy
                    </Text>
                  </View>
                </View>
              </HoverCard>
            );
          })}
        </View>
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
          eyebrow="Comunidad PawLink"
          title="Hablamos de los que ladran"
          subtitle="Comparte experiencias, resuelve dudas con veterinarios y conecta con otros tutores apasionados."
          icon="comments"
          gradient="sunrise"
          action={newThreadAction}
          stats={[
            { label: 'hilos', value: hilos.length || '—', icon: 'comments' },
            { label: 'respuestas', value: totalRespuestas || '—', icon: 'comment-dots' },
            { label: 'miembros', value: '8.7k', icon: 'users' },
          ]}
        />
        {renderContent()}
      </ScrollView>

      <ModalForm
        open={modalOpen}
        onClose={closeModal}
        title="Abrir un nuevo hilo"
        subtitle="Comparte una pregunta o experiencia con la comunidad."
        icon="pen">
        <InputWeb
          label="Título"
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Resume tu hilo en una frase clara"
          maxLength={120}
          required
          icon="heading"
        />
        <InputWeb
          label="Contenido"
          value={contenido}
          onChangeText={setContenido}
          placeholder="Cuéntanos los detalles, lo que has probado o tu pregunta concreta…"
          multiline
          required
          icon="align-left"
        />
        {submitError ? (
          <View className="mb-3 flex-row items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3">
            <FontAwesome5 name="exclamation-circle" size={12} color="#e11d48" />
            <Text className="flex-1 text-xs font-semibold text-rose-700">{submitError}</Text>
          </View>
        ) : null}
        <SubmitButton
          onPress={handleSubmit}
          loading={submitting}
          loadingText="Publicando..."
          icon="paper-plane">
          Publicar hilo
        </SubmitButton>
      </ModalForm>
    </>
  );
}
