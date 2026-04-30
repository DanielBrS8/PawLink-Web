import { FontAwesome5 } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';

import { HoverCard } from './HoverCard';

export interface Mascota {
  idMascota: number;
  nombre: string;
  especie: string;
  raza: string;
  edadAprox: string;
  fotoUrl: string;
}

const SPECIES_TINT: Record<string, { bg: string; text: string; icon: any }> = {
  Perro: { bg: '#fff1e6', text: '#b8430a', icon: 'dog' },
  Gato: { bg: '#fce7f3', text: '#9d174d', icon: 'cat' },
  Conejo: { bg: '#ecfccb', text: '#3f6212', icon: 'carrot' },
  Ave: { bg: '#e0f2fe', text: '#075985', icon: 'dove' },
};

export function CardMascota({ mascota }: Readonly<{ mascota: Mascota }>) {
  const tint =
    SPECIES_TINT[mascota.especie] ?? { bg: '#ffe6d0', text: '#b8430a', icon: 'paw' };

  return (
    <HoverCard className="overflow-hidden rounded-3xl bg-white">
      <View className="relative">
        {mascota.fotoUrl ? (
          <Image
            source={{ uri: mascota.fotoUrl }}
            className="h-52 w-full"
            resizeMode="cover"
          />
        ) : (
          <View
            className="h-52 w-full items-center justify-center"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
            }}>
            <FontAwesome5 name={tint.icon} size={36} color="#f97316" />
          </View>
        )}

        <View
          pointerEvents="none"
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(31,27,22,0.6), transparent)',
          }}
        />

        <View className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-white/95"
          style={{ backdropFilter: 'blur(8px)' as any, cursor: 'pointer' as any }}>
          <FontAwesome5 name="heart" size={14} color="#f97316" />
        </View>

        <View
          className="absolute left-3 top-3 flex-row items-center gap-1.5 rounded-full px-3 py-1"
          style={{ backgroundColor: tint.bg }}>
          <FontAwesome5 name={tint.icon} size={10} color={tint.text} />
          <Text className="text-[11px] font-bold" style={{ color: tint.text }}>
            {mascota.especie}
          </Text>
        </View>

        <View className="absolute bottom-3 left-4 right-4 flex-row items-end justify-between">
          <View>
            <Text
              className="font-display text-2xl font-bold text-white"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' } as any}
              numberOfLines={1}>
              {mascota.nombre}
            </Text>
            <Text
              className="text-xs text-white/90"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' } as any}
              numberOfLines={1}>
              {mascota.raza}
            </Text>
          </View>
        </View>
      </View>

      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <FontAwesome5 name="birthday-cake" size={11} color="#7a6f63" />
            <Text className="text-xs font-semibold text-ink-500">
              {mascota.edadAprox}
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <FontAwesome5 name="map-marker-alt" size={11} color="#7a6f63" />
            <Text className="text-xs font-semibold text-ink-500">Cerca</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <FontAwesome5 name="syringe" size={11} color="#22c55e" />
            <Text className="text-xs font-semibold text-emerald-600">Vacunado</Text>
          </View>
        </View>

        <View
          className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl py-2.5"
          style={{
            backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
            cursor: 'pointer' as any,
          }}>
          <Text className="text-sm font-bold text-white">Conocer a {mascota.nombre}</Text>
          <FontAwesome5 name="arrow-right" size={10} color="#fff" />
        </View>
      </View>
    </HoverCard>
  );
}
