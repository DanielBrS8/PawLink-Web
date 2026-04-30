import { FontAwesome5 } from '@expo/vector-icons';
import { ActivityIndicator, Text, View } from 'react-native';

type Props = Readonly<{
  variant: 'loading' | 'error' | 'empty';
  title?: string;
  message?: string;
}>;

export function StateView({ variant, title, message }: Props) {
  if (variant === 'loading') {
    return (
      <View className="flex-1 items-center justify-center py-24">
        <View className="relative h-20 w-20 items-center justify-center">
          <View
            className="absolute h-20 w-20 rounded-full"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)',
            }}
          />
          <ActivityIndicator size="large" color="#f97316" />
        </View>
        <Text className="mt-5 text-sm font-medium text-ink-500">
          {message ?? 'Cargando contenido…'}
        </Text>
      </View>
    );
  }

  if (variant === 'error') {
    return (
      <View className="flex-1 items-center justify-center px-6 py-24">
        <View className="h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
          <FontAwesome5 name="exclamation-triangle" size={22} color="#e11d48" />
        </View>
        <Text className="mt-5 font-display text-2xl font-bold text-ink-900">
          {title ?? 'Algo salió mal'}
        </Text>
        <Text className="mt-2 max-w-md text-center text-base text-ink-500">
          {message ?? 'No hemos podido cargar la información. Inténtalo de nuevo en un momento.'}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center px-6 py-24">
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-brand-100">
        <FontAwesome5 name="paw" size={22} color="#f97316" />
      </View>
      <Text className="mt-5 font-display text-2xl font-bold text-ink-900">
        {title ?? 'Sin resultados'}
      </Text>
      <Text className="mt-2 max-w-md text-center text-base text-ink-500">
        {message ?? 'Aún no hay nada por aquí. Vuelve pronto.'}
      </Text>
    </View>
  );
}
