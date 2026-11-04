import { createFileRoute } from "@tanstack/react-router";
import { HollowbloomPage } from "@/components/hollowbloom-page";

export const Route = createFileRoute("/")({ component: HollowbloomPage });
