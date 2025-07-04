import { ImageDecryptionMeta } from './image-decryption-meta.js'

export type BackendWirePayload =
  | {
      state: WirePayloadState.Success
      encrypted: Buffer
    }
  | {
      state: WirePayloadState.Updated
      encrypted: Buffer
      meta: ImageDecryptionMeta
      token: number
    }
  | {
      state: Exclude<
        WirePayloadState,
        WirePayloadState.Success | WirePayloadState.Updated
      >
      // No payload fields, only state
    }

export type FrontendWirePayload =
  | {
      state: WirePayloadState.Success
      encrypted: Uint8Array
    }
  | {
      state: WirePayloadState.Updated
      encrypted: Uint8Array
      meta: ImageDecryptionMeta
      token: number
    }
  | {
      state: Exclude<
        WirePayloadState,
        WirePayloadState.Success | WirePayloadState.Updated
      >
      // No payload fields, only state
    }

export enum WirePayloadState {
  Success = 0, // All OK, minimal payload (encrypted image only)
  Updated = 1, // Token mismatch, full payload returned
  NotFound = 2, // Image not found
  MissingID = 3, // Image ID missing from request
  MissingProof = 4, // Stateless proof missing
  InvalidProof = 5, // Stateless proof invalid or expired
  InternalError = 6, // Internal server error (reserved for future use)
  // InvalidToken = 7, // Client token invalid or unparseable
  // Unauthorized = 8, // Not authorized (reserved for future use)
  // RateLimited = 9, // (may be added in future)
  // UnsupportedFormat = 10,
}
