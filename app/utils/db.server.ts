import { PrismaClient } from '@prisma/client'

function load<V> (cb: () => V): V {
  if (!global.db) global.db = cb()
  return global.db
}
export const db = load(() => new PrismaClient())
