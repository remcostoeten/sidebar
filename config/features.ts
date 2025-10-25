// Simple, typed feature flags with environment + local override support

export type FeatureFlagKey =
  | "commandPalette"
  | "rightSidebar"
  | "analyticsTab"
  | "projectsTab";

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

const DEFAULT_FLAGS: FeatureFlags = {
  commandPalette: true,
  rightSidebar: true,
  analyticsTab: true,
  projectsTab: true,
};

// Optional: allow overriding defaults using NEXT_PUBLIC flags
function readEnvFlag(name: string): boolean | undefined {
  const raw = process.env[name];
  if (raw === undefined) return undefined;
  return raw === "1" || raw?.toLowerCase() === "true";
}

export const flags: FeatureFlags = {
  commandPalette: readEnvFlag("NEXT_PUBLIC_FF_COMMAND_PALETTE") ?? DEFAULT_FLAGS.commandPalette,
  rightSidebar: readEnvFlag("NEXT_PUBLIC_FF_RIGHT_SIDEBAR") ?? DEFAULT_FLAGS.rightSidebar,
  analyticsTab: readEnvFlag("NEXT_PUBLIC_FF_ANALYTICS_TAB") ?? DEFAULT_FLAGS.analyticsTab,
  projectsTab: readEnvFlag("NEXT_PUBLIC_FF_PROJECTS_TAB") ?? DEFAULT_FLAGS.projectsTab,
};

// Convenience helpers
export const isEnabled = (key: FeatureFlagKey) => flags[key];


