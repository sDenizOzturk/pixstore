export type CustomImageFetcher = (
  id: string,
  context?: any,
) => Promise<Uint8Array>
