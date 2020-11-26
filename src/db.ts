import mysql from 'mysql'

const HOST = process.env.DB_HOST || 'localhost'
const USER = process.env.DB_USER || 'root'
const PASSWORD = process.env.DB_PASSWORD || ''
const DATABASE_NAME = process.env.DB_NAME || 'conectivo_conecta_db'

const pool = mysql.createPool({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE_NAME
})

export default pool
