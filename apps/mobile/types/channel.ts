import { Audio } from "./audio";
import { Video } from "./video";

export type Channel = {
  id: string;
  title: string;
  description: string;
  type: Audio | Video;
  uri: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
};
