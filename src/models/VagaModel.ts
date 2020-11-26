import sql from '../db'
import { Vaga, VagaChanges } from '../types/VagaTypes'

/**
 * Insert a new Vaga instance in MySQL database.
 */
export function insertVaga(vaga: Vaga): Promise<Vaga> {
	return new Promise(function (resolve, reject) {
		const queryString = 'INSERT INTO vaga SET ?'

		sql.query(queryString, [vaga], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New vaga was created!\n', vaga)
			resolve(vaga)
		})
	})
}

/**
 * Find vaga by id and delete it.
 */
export function removeVaga(id: Number): Promise<Number> {
	return new Promise(function (resolve, reject) {
		const queryString = 'DELETE FROM `vaga` WHERE `id` = ?;'
		sql.query(queryString, [id], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Vaga deleted! ID: ', id)
			resolve(id)
		})
	})
}

/**
 * Select the vaga from the DB with the passed ID.
 */
export function selectVagaByID(id: Number): Promise<any> {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `vaga` WHERE `id` = ?;'

		sql.query(queryString, [id], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select vaga by ID error: no Vaga was found with the passed ID!'
				console.log(errorMsg)
				return reject(errorMsg)
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedVaga = Object.values(JSON.parse(JSON.stringify(res)))[0]

			resolve(returnedVaga)
		})
	})
}

/**
 * Select all vagas from the DB with the passed CNPJ.
 */
export function selectAllVagasFromCNPJ(cnpj: String) {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `vaga` WHERE `cnpjDaEmpresa` = ?;'

		sql.query(queryString, [cnpj], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			resolve(res)
		})
	})
}

/**
 * Select all vagas from the DB.
 */
export function selectAllVagas() {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `vaga`;'

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
 * Update a vaga with the passed ID with the passes changes in the DB.
 */
export function updateVaga(id: Number, changes: VagaChanges) {
	return new Promise(function (resolve, reject) {
		const queryString = 'UPDATE `vaga` SET ? WHERE `id` = ?;'

		sql.query(queryString, [changes, id], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Vaga with id ' + id + ' updated!', changes)
			resolve(id)
		})
	})
}
