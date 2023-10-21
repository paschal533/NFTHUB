import {
  Code,
  ImageIcon,
  FolderCog,
  MessageSquare,
  Music,
  Boxes,
  PlaneTakeoff,
} from "lucide-react";

export const MAX_FREE_COUNTS = 20;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Image Editor",
    icon: FolderCog,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/editor",
  },
  {
    label: "Create NFT",
    icon: Boxes,
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
    href: "/create",
  },
  {
    label: "Draw Board",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/draw",
  },
  {
    label: "Stake Your NFT",
    icon: PlaneTakeoff,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/stake",
  },
  {
    label: "My NFTs",
    icon: Boxes,
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
    href: "/nfts",
  },
];
