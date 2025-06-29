import { webcrypto } from 'crypto'

if (typeof (global as any).window === 'undefined') {
  ;(global as any).window = global
}
;(window as any).crypto = webcrypto
;(global as any).crypto = webcrypto
