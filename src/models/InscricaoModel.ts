import sql from '../db'

/**
 * Insert a new inscricao with the passed vaga id and trabalhador cpf.
 */
export function InsertInscricao(idDaVaga: Number, cpfTrabalhador: String) {
	return new Promise(function (resolve, reject) {
		const queryString =
			'INSERT INTO `inscricaoVagaTrabalhador`(idDaVaga, cpfTrabalhador) VALUES (?, ?);'

		sql.query(queryString, [idDaVaga, cpfTrabalhador], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log(
				'New inscricao with the vaga id ' +
					idDaVaga +
					' and the trabalhador cpf ' +
					cpfTrabalhador +
					' created with success!'
			)
			resolve({ idDaVaga: idDaVaga, cpfTrabalhador: cpfTrabalhador })
		})
	})
}
