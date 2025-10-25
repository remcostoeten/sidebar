"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { FeatureFlags } from "@/config/features";
import { flags as defaultFlags } from "@/config/features";

type FeatureFlagsContextValue = FeatureFlags;

const FeatureFlagsContext = createContext<FeatureFlagsContextValue>(defaultFlags);

export function FeatureFlagsProvider({ flags = defaultFlags, children }: { flags?: FeatureFlags; children: React.ReactNode }) {
  const value = useMemo(() => flags, [flags]);
  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>;
}

export function useFeatureFlag(key: keyof FeatureFlags): boolean {
  const value = useContext(FeatureFlagsContext);
  return value[key];
}


