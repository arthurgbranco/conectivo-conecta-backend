import { Request, Response } from 'express'
import { InsertInscricao } from '../models/InscricaoModel'
import { createInscricaoBodyIsValid } from '../validators/InscricaoValidators'

/**
 * Create inscrição controller.
 */
export async function createInscricao(req: Request, res: Response) {
	if (!createInscricaoBodyIsValid(req.body)) {
		res.status(400).json({
			message: 'Error: Incorrect request body.'
		})
		return
	}

	const { idDaVaga, cpfTrabalhador } = req.body
	const idDaVagaAsNumber = parseInt(idDaVaga)

	try {
		await InsertInscricao(idDaVagaAsNumber, cpfTrabalhador)

		res.status(200).json({
			message:
				'Inscricao with vaga id ' +
				idDaVaga +
				' and cpf ' +
				cpfTrabalhador +
				' created!'
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}
