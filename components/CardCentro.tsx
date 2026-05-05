import { FontAwesome5 } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

import { HoverCard } from './HoverCard';

export interface Centro {
  idCentro: number;
  nombre: string;
  ciudad: string;
  especialidad: string;
  foto_url: string | null;
}

type Props = Readonly<{
  centro: Centro;
  onLeaveReview?: (centro: Centro) => void;
}>;

export function CardCentro({ centro, onLeaveReview }: Props) {
  return (
    <HoverCard className="overflow-hidden rounded-3xl bg-white">
      <View className="relative">
        {centro.foto_url ? (
          <Image
            source={{ uri: centro.foto_url }}
            className="h-48 w-full"
            resizeMode="cover"
          />
        ) : (
          <View
            className="h-48 w-full items-center justify-center"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
            }}>
            <FontAwesome5 name="hospital-alt" size={32} color="#f97316" />
          </View>
        )}

        <View
          pointerEvents="none"
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(31,27,22,0.55), transparent)',
          }}
        />

        <View
          className="absolute left-4 top-4 flex-row items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5"
          style={{ backdropFilter: 'blur(8px)' as any }}>
          <FontAwesome5 name="stethoscope" size={10} color="#f97316" />
          <Text className="text-xs font-bold text-brand-700">
            {centro.especialidad}
          </Text>
        </View>

        <View
          className="absolute right-4 top-4 h-9 w-9 items-center justify-center rounded-full bg-white/95"
          style={{ backdropFilter: 'blur(8px)' as any }}>
          <FontAwesome5 name="heart" size={14} color="#f97316" />
        </View>
      </View>

      <View className="px-5 py-4">
        <Text
          className="font-display text-lg font-bold text-ink-900"
          numberOfLines={1}>
          {centro.nombre}
        </Text>

        <View className="mt-1.5 flex-row items-center gap-2">
          <FontAwesome5 name="map-marker-alt" size={11} color="#7a6f63" />
          <Text className="text-sm text-ink-500" numberOfLines={1}>
            {centro.ciudad}
          </Text>
        </View>

        <View className="mt-4 flex-row items-center justify-between border-t border-cream-100 pt-3">
          <View className="flex-row items-center gap-1">
            <FontAwesome5 name="star" size={11} color="#fbbf24" solid />
            <FontAwesome5 name="star" size={11} color="#fbbf24" solid />
            <FontAwesome5 name="star" size={11} color="#fbbf24" solid />
            <FontAwesome5 name="star" size={11} color="#fbbf24" solid />
            <FontAwesome5 name="star-half-alt" size={11} color="#fbbf24" solid />
            <Text className="ml-1 text-xs font-semibold text-ink-500">4.7</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-xs font-bold text-brand-600">Ver más</Text>
            <FontAwesome5 name="arrow-right" size={10} color="#df5a05" />
          </View>
        </View>

        {onLeaveReview ? (
          <Pressable
            onPress={() => onLeaveReview(centro)}
            className="mt-3 flex-row items-center justify-center gap-2 rounded-2xl py-2.5"
            style={{
              backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
              boxShadow: '0 12px 28px -14px rgba(249,115,22,0.55)' as any,
              cursor: 'pointer' as any,
            }}>
            <FontAwesome5 name="pen" size={11} color="#fff" />
            <Text className="text-xs font-bold text-white">Dejar Reseña</Text>
          </Pressable>
        ) : null}
      </View>
    </HoverCard>
  );
}
