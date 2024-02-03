import PocketBase from 'pocketbase'


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



initDb()
