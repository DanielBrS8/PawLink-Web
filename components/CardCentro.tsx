import { Image, Pressable, Text, View } from 'react-native';

export interface Centro {
  idCentro: number;
  nombre: string;
  ciudad: string;
  especialidad: string;
  foto_url: string | null;
}

export function CardCentro({ centro }: Readonly<{ centro: Centro }>) {
  return (
    <Pressable className="overflow-hidden rounded-2xl bg-white shadow-sm active:opacity-75 hover:opacity-90">
      {centro.foto_url ? (
        <Image
          source={{ uri: centro.foto_url }}
          className="h-40 w-full"
          resizeMode="cover"
        />
      ) : (
        <View className="h-40 w-full items-center justify-center bg-orange-50">
          <View className="h-12 w-12 rounded-full bg-orange-200" />
        </View>
      )}
      <View className="border-t border-slate-100 px-4 py-3">
        <Text
          className="text-base font-bold text-slate-900"
          numberOfLines={1}>
          {centro.nombre}
        </Text>
        <Text className="mt-0.5 text-sm text-slate-500" numberOfLines={1}>
          {centro.ciudad}
        </Text>
        <View className="mt-2 self-start rounded-full bg-orange-100 px-3 py-1">
          <Text className="text-xs font-semibold text-orange-600">
            {centro.especialidad}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
