export function normalizeServerAddress(address: string): string {
  return address.trim().replace(/\/+$/, '')
}

export function isLocalServerAddress(address: string): boolean {
  try {
    const hostname = new URL(address).hostname.toLowerCase()
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
  } catch {
    return false
  }
}

export function resolvePublicServerAddress(address?: unknown): string {
  const currentOrigin =
    typeof window !== 'undefined'
      ? normalizeServerAddress(window.location.origin)
      : ''

  if (typeof address !== 'string' || !address.trim()) {
    return currentOrigin
  }

  const normalizedAddress = normalizeServerAddress(address)
  if (
    currentOrigin &&
    isLocalServerAddress(normalizedAddress) &&
    !isLocalServerAddress(currentOrigin)
  ) {
    return currentOrigin
  }

  return normalizedAddress
}
