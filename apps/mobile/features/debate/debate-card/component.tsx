import { Image, Text, View } from "react-native";

import { debateCardStore } from "./store";
import type { DebateCardItem, DebateCardParticipant, DebateStatus } from "./types";
import { useStoreState, useStoreValue } from "zustand-x";

const STATUS_LABEL: Record<DebateStatus, string> = {
  live: "Live",
  done: "Done",
  starting_in: "Starting soon",
};

const STATUS_CLASS: Record<DebateStatus, string> = {
  live: "bg-red-500",
  done: "bg-default-400",
  starting_in: "bg-amber-400",
};

function formatCountdown(isoDate: string): string {
  const diff = new Date(isoDate).getTime() - Date.now();
  if (diff <= 0) return "now";
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

type DebateCardProps = {
  item: DebateCardItem;
};

export default function DebateCardFeature({ item }: DebateCardProps) {
  const [selectedId, setSelectedId] = useStoreState(debateCardStore, "selectedId");
  const { title, description, image, status, participants, startsAt } = item;
  const isSelected = selectedId === item.id;

  const statusLabel =
    status === "starting_in" && startsAt ? `Starting in ${formatCountdown(startsAt)}` : STATUS_LABEL[status];

  return (
    <View
      className={`rounded-2xl bg-content1 overflow-hidden shadow-sm ${isSelected ? "ring-2 ring-primary" : ""}`}
      onTouchEnd={() => setSelectedId(item.id)}
    >
      {/* Cover image */}
      <View className="h-44 bg-default-100">
        {image ? <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" /> : null}
      </View>

      {/* Status badge */}
      <View className="absolute top-3 left-3">
        <View className={`px-2.5 py-1 rounded-full ${STATUS_CLASS[status]}`}>
          <Text className="text-white text-xs font-semibold">{statusLabel}</Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-4 gap-2">
        <Text className="text-foreground font-bold text-base" numberOfLines={2}>
          {title}
        </Text>

        <Text className="text-default-500 text-sm" numberOfLines={3}>
          {description}
        </Text>

        {/* Participants */}
        {participants.length > 0 ? (
          <View className="flex-row items-center mt-1">
            {participants.slice(0, 4).map((p, i) => (
              <ParticipantAvatar key={p.id} participant={p} index={i} />
            ))}
            {participants.length > 4 ? (
              <Text className="text-default-500 text-xs ml-3">+{participants.length - 4} more</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

type ParticipantAvatarProps = {
  participant: DebateCardParticipant;
  index: number;
};

function ParticipantAvatar({ participant, index }: ParticipantAvatarProps) {
  return (
    <View
      className={`w-7 h-7 rounded-full bg-default-200 border-2 border-background overflow-hidden ${index > 0 ? "-ml-2" : ""}`}
    >
      {participant.avatarUrl ? (
        <Image source={{ uri: participant.avatarUrl }} className="w-full h-full" />
      ) : (
        <View className="w-full h-full items-center justify-center bg-primary-100">
          <Text className="text-primary-600 text-xs font-semibold">{participant.name.charAt(0).toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}
