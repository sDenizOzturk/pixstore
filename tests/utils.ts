/**
 * Simple async sleep for tests.
 * Usage: await sleep(10)
 */
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
