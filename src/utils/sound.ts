// UI click sound effects are disabled for silent interaction.

export function isSfxEnabled(): boolean {
  return false;
}

export function toggleSfx(): boolean {
  return false;
}

export function playClickSfx(_freq = 660): void {
  // Intentionally silent
}
