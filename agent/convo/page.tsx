"use client";

/**
 * Agent Conversation Page
 *
 * This page uses the reusable agent-layout system for a configuration-driven interface.
 * All customization is done via the config file, making it easy to create variations.
 */

import { useState } from "react";
import { AgentPageLayout } from "@/components/layouts/agent";
import { ContentDisplay } from "@/components/agent/content";
import { AvatarSection } from "@/components/agent/avatar";
import { DataProvider } from "@/components/providers/shared";
import { BrandingHeader } from "@/components/shared/branding";
import { BackgroundEffect } from "@/components/shared/backgrounds";
import { pageConfig } from "./config";

interface AgentData {
  name?: string;
  course?: string;
  additionalInfo?: string;
  type?: string;
  timestamp?: number;
}

export default function ConvoPage() {
  const [agentData, setAgentData] = useState<AgentData>({
    name: "Student name",
    course: "Course",
    additionalInfo: "Additional information",
  });

  const handleAgentData = async (data: AgentData) => {
    setAgentData((prev) => ({
      ...prev,
      ...data,
      timestamp: Date.now(),
    }));
  };

  // Get column spans from config and map to explicit Tailwind classes
  // Need responsive classes because grid columns change at different breakpoints
  const getColSpanClass = (span: number, breakpoint: "base" | "md" | "lg") => {
    const prefix = breakpoint === "base" ? "" : `${breakpoint}:`;
    if (span === 1) return `${prefix}col-span-1`;
    if (span === 2) return `${prefix}col-span-2`;
    if (span === 3) return `${prefix}col-span-3`;
    if (span === 4) return `${prefix}col-span-4`;
    if (span === 5) return `${prefix}col-span-5`;
    if (span === 6) return `${prefix}col-span-6`;
    return `${prefix}col-span-1`; // fallback
  };

  // Tablet: content:1, avatar:1 (2-column grid)
  const tabletContentSpan =
    pageConfig.layout.responsive?.tablet?.columns?.content ?? 1;
  const tabletAvatarSpan =
    pageConfig.layout.responsive?.tablet?.columns?.avatar ?? 1;

  // Desktop (base): content:2, avatar:1 (3-column grid)
  const desktopContentSpan = pageConfig.layout.columns?.content ?? 2;
  const desktopAvatarSpan = pageConfig.layout.columns?.avatar ?? 1;

  // Build responsive col-span classes
  const contentColClass = `${getColSpanClass(tabletContentSpan, "md")} ${getColSpanClass(desktopContentSpan, "lg")}`;
  const avatarColClass = `${getColSpanClass(tabletAvatarSpan, "md")} ${getColSpanClass(desktopAvatarSpan, "lg")}`;

  return (
    <AgentPageLayout layout={pageConfig.layout}>
      {/* Background Effect */}
      <BackgroundEffect
        type={pageConfig.background.type}
        {...pageConfig.background.props}
      />

      {/* Main Content Area */}
      <div
        className={`relative z-10 ${contentColClass} rounded-lg p-6 flex flex-col justify-between`}
      >
        {/* Branding */}
        <BrandingHeader {...pageConfig.branding} />

        {/* Dynamic Content */}
        <ContentDisplay
          sections={pageConfig.content.sections}
          data={agentData}
        />
      </div>

      {/* Avatar Area */}
      <div
        className={`relative z-10 ${avatarColClass} rounded-lg p-6 flex flex-col`}
      >
        <AvatarSection
          provider={pageConfig.avatar.provider}
          data={agentData}
          config={pageConfig.avatar.props}
        />
      </div>

      {/* Data Provider (Hidden) */}
      <DataProvider
        source={pageConfig.dataSource.type}
        config={pageConfig.dataSource.config}
        onDataReceived={handleAgentData}
      />
    </AgentPageLayout>
  );
}
