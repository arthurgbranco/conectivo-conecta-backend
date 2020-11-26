import sql from '../db'
import { Trabalhador, TrabalhadorChanges } from '../types/TrabalhadorTypes'
import { TrabalhadorNotFoundException } from '../types/Exceptions'

/**
 * Insert a new Trabalhador instance in MySQL database.
 */
export function insert(
	newTrabalhador: Trabalhador,
	email: String
): Promise<Trabalhador> {
	return new Promise(function (resolve, reject) {
		const queryString = `INSERT INTO trabalhador SET ?`

		const workerWithEmail: Trabalhador = { ...newTrabalhador, email: email }

		sql.query(queryString, workerWithEmail, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New trabalhador was created!\n', workerWithEmail)
			resolve(workerWithEmail)
		})
	})
}

/**
 * Find trabalhador by email and delete it by it's email on trabalhador table.
 */
export function removeTrabalhador(email: String): Promise<String> {
	return new Promise(function (resolve, reject) {
		const trabalhadorQueryString =
			'DELETE FROM `trabalhador` WHERE `email` = ?;'
		const contaQueryString = 'DELETE FROM `conta` WHERE `email` = ?;'

		sql.query(trabalhadorQueryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Trabalhador deleted!', email)
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
 * Select all workers from the DB with the passed email.
 */
export function selectByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `trabalhador` WHERE email = ?;'

		sql.query(queryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No Trabalhador was found with the passed email.'
				console.log(errorMsg)
				return reject(new TrabalhadorNotFoundException())
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedTrabalhador = Object.values(
				JSON.parse(JSON.stringify(res))
			)[0]

			resolve(returnedTrabalhador)
		})
	})
}

/**
 * Select all Trabalhadores from the DB.
 */
export function selectAllTrabalhadores() {
	return new Promise(function (resolve, reject) {
		const queryString = `SELECT * FROM trabalhador`

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
 * Update a worker with the passed email with the passed changes in the DB.
 */
export function updateTrabalhador(email: string, changes: TrabalhadorChanges) {
	return new Promise(function (resolve, reject) {
		const queryString = 'UPDATE `trabalhador` SET ? WHERE `email` = ?;'

		sql.query(queryString, [changes, email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Trabalhador with email ' + email + ' updated!', changes)
			resolve(email)
		})
	})
}

/**
 * Select from DB all trabalhadores related to a inscricao from the vaga with the specified ID.
 */
export function selectAllTrabalhadoresFromInscricao(idDaVaga: Number) {
	return new Promise(function (resolve, reject) {
		const queryString =
			'SELECT T.cpf, T.nomeCompleto, T.nomeCompletoMae, T.numeroDeRg, T.dataDeNascimento,' +
			'T.localDeNascimento, T.estadoCivil, T.numeroDeFilhos, T.telefoneDeContato, T.endereco, ' +
			'T.escolaridade, T.objetivoProfissional, T.resumoProfissional, T.email, T.caminhoParaImagem, ' +
			'T.caminhoParaCurriculo FROM `trabalhador` T, `vaga` V, `inscricaovagatrabalhador` I WHERE ' +
			'(T.cpf = I.cpfTrabalhador) AND (I.idDaVaga = V.id) AND (V.id = ?)'

		sql.query(queryString, [idDaVaga], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log(
				'All trabalhadores from inscricao from vaga with id ' +
					idDaVaga +
					' getted!'
			)
			resolve(res)
		})
	})
}
