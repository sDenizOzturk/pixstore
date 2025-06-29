export type IndexedDBImageRecord = {
  id: string
  encrypted: Uint8Array
  token: number
  lastUsed: number
}
