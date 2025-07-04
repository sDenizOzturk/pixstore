export type ImageFetcher = (parameters: {
  imageId: string
  imageToken: number | undefined
  statelessProof: string
  context?: any
}) => Promise<Uint8Array>

export type CustomImageFetcher = ImageFetcher
