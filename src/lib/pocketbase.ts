import PocketBase from 'pocketbase'
import { PomoEntry } from './types'


const email = import.meta.env.VITE_EMAIL
const dbPassword = import.meta.env.VITE_DB_PASSWORD

export async function initDb() {
  const db = new PocketBase('https://db.dimalip.in')
  const authData = await db.admins.authWithPassword(email, dbPassword)
  return db
}

export async function fetchPomos(db: PocketBase,
  date: Date) {
  const pomos = await db.collection("yappy").find({
    date: date.toISOString().slice(0, 10)
  })
}

export async function fetchPomosBetweenDates(db: PocketBase,
  from: Date,
  to: Date): Promise<PomoEntry[]> {
  // const filter = `time >= ${from.toISOString().slice(0, 10)} && time <= ${to.toISOString().slice(0, 10)}`
  let toStr = to.toISOString()
  let fromStr = from.toISOString()
  const filter = `time >= "${fromStr}" && time <= "${toStr}"`
  const pomosRes = await db.collection("yappy").getFullList({
    filter
  })
  const pomos = pomosRes.map(pomo => { return new PomoEntry({ status: pomo.status, time: pomo.time }) })
  console.log(pomos, filter)
  return pomos
}





initDb()
