export const ROUTES = {
  dashboard: "/",
  tasks: "/tasks",
  projects: "/projects",
  calendar: "/calendar",
  teams: "/teams",
  analytics: "/analytics",
  files: "/files",
  settings: "/settings",
} as const;

export type RouteKey = keyof typeof ROUTES;

export function getRoute(key: RouteKey): string {
  return ROUTES[key];
}

export function isRoute(key: string): key is RouteKey {
  return key in ROUTES;
}


