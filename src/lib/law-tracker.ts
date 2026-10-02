// Status names for the law tracker, shared by the page's filter buttons and
// each entry's label. Statuses themselves are set per entry in
// src/content/law-tracker.yaml.
export const statusLabels = {
  'in-force': 'In force',
  passed: 'Passed, not all in force',
  proposed: 'Proposed',
} as const;

export type LawStatus = keyof typeof statusLabels;
