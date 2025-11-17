/**
 * Agent Conversation Page Configuration
 *
 * This file contains the configuration for the agent conversation page.
 * All layout, styling, and behavior can be customized here without touching the page code.
 */

import { PageConfig } from "@/components/layouts/agent";

export const pageConfig: PageConfig = {
  layout: {
    type: "split",
    columns: { content: 2, avatar: 1 },
    gap: 8,
    padding: 16,
    responsive: {
      mobile: {
        type: "stacked",
      },
      tablet: {
        columns: { content: 1, avatar: 1 },
      },
    },
  },

  background: {
    type: "flickering-grid",
    props: {
      squareSize: 4,
      gridGap: 6,
      color: "#6B7280",
      maxOpacity: 0.5,
      flickerChance: 0.1,
    },
  },

  branding: {
    logo: {
      src: "/logo-light.png",
      alt: "Logo",
      width: 80,
      height: 64,
    },
    position: "top-left",
  },

  content: {
    sections: [
      {
        id: "name",
        type: "heading",
        level: 1,
        className: "text-6xl font-bold mb-4",
        dataKey: "name",
        fallback: "Name",
      },
      {
        id: "course",
        type: "heading",
        level: 2,
        className: "text-4xl font-bold mb-4",
        dataKey: "course",
        fallback: "Course",
      },
      {
        id: "info",
        type: "text",
        className: "",
        dataKey: "additionalInfo",
        fallback: "Additional information",
      },
      {
        id: "timestamp",
        type: "custom",
        render: (data) =>
          data.timestamp ? (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          ) : null,
      },
    ],
  },

  avatar: {
    provider: "heygen",
    props: {
      className: "w-full h-full",
    },
  },

  dataSource: {
    type: "livekit",
    config: {
      roomName: "foresight-agent-room",
      username: "agent-live",
    },
  },
};
