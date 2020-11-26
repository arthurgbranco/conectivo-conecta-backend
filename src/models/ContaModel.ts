import sql from '../db'
import { Conta } from '../types/ContaTypes'

/**
 * Insert a new account in MySQL database.
 */
export function insertConta(conta: Conta): Promise<Conta> {
	return new Promise(function (resolve, reject) {
		const queryString = 'INSERT INTO `conta` SET ?'

		sql.query(queryString, conta, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New Conta was created!', conta)
			resolve(conta)
		})
	})
}

/**
 * Select Conta with the passed email.
 */
export function selectContaByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `conta` WHERE email = ?;'

		sql.query(queryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No account was found with the passed email.'
				console.log(errorMsg)
				return reject(errorMsg)
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedAccount = Object.values(JSON.parse(JSON.stringify(res)))[0]

			resolve(returnedAccount)
		})
	})
}
