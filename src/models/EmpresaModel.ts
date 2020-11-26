import sql from '../db'
import { Empresa, EmpresaChanges } from '../types/EmpresaTypes'
import { EmpresaNotFoundException } from '../types/Exceptions'

/**
 * Insert a new Empresa instance in MySQL database.
 */
export function insert(empresa: Empresa, email: String): Promise<Empresa> {
	return new Promise(function (resolve, reject) {
		const queryString = `INSERT INTO empresa SET ?`

		const empresaWithEmail: Empresa = { ...empresa, email: email }

		sql.query(queryString, empresaWithEmail, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New empresa was created!\n', empresaWithEmail)
			resolve(empresaWithEmail)
		})
	})
}

/**
 * Find empresa by email and delete it.
 */
export function removeEmpresa(email: String): Promise<String> {
	return new Promise(function (resolve, reject) {
		const empresaQueryString = 'DELETE FROM `empresa` WHERE `email` = ?;'
		const contaQueryString = 'DELETE FROM `conta` "WHERE `email` = ?;'

		sql.query(empresaQueryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Empresa deleted!', email)
		})

		sql.query(contaQueryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Conta deleted!', email)
		})
		resolve(email)
	})
}

/**
 * Select all empresas from the DB with the passed email.
 */
export function selectByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `empresa` WHERE email = ?;'

		sql.query(queryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No Empresa was found with the passed email.'
				console.log(errorMsg)
				return reject(new EmpresaNotFoundException())
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedEmpresa = Object.values(JSON.parse(JSON.stringify(res)))[0]

			resolve(returnedEmpresa)
		})
	})
}

/**
 * Select all Empresas from the DB.
 */
export function selectAllEmpresas() {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `empresa`'

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			resolve(res)
		})
	})
}

/**
 * Update a company with the passed email with the passed changes in the DB.
 */
export function updateEmpresa(email: string, changes: EmpresaChanges) {
	return new Promise(function (resolve, reject) {
		const queryString = 'UPDATE `empresa` SET ? WHERE `email` = ?;'

		sql.query(queryString, [changes, email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Empresa with email ' + email + ' updated!', changes)
			resolve(email)
		})
	})
}
