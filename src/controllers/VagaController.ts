import { Request, Response } from 'express'
import {
	createVagaBodyIsValid,
	editVagaBodyIsValid
} from '../validators/VagaValidators'
import {
	insertVaga,
	removeVaga,
	selectAllVagas,
	selectAllVagasFromCNPJ,
	selectVagaByID,
	updateVaga
} from '../models/VagaModel'
import { Vaga, VagaChanges } from '../types/VagaTypes'

/**
 * Create vaga controller.
 */
export async function createVaga(req: Request, res: Response) {
	if (!createVagaBodyIsValid(req.body)) {
		return res.status(400).json({
			message: 'Error: incorrect request body!'
		})
	}

	const { vaga } = req.body

	try {
		await insertVaga(vaga)

		res.status(200).json({
			message: 'Vaga criada com sucesso!',
			vaga: vaga
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Delete vaga controller.
 */
export async function deleteVaga(req: Request, res: Response) {
	const { idVaga } = req.params

	if (!idVaga) {
		res.status(400).json({
			message: 'No id from vaga was found!'
		})
	}

	try {
		const idVagaAsNumber = parseInt(idVaga)

		await removeVaga(idVagaAsNumber)

		res.status(200).json({
			message: 'Vaga with ID ' + idVaga + ' removed!'
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Get vaga by ID controller.
 */
export async function getVagaById(req: Request, res: Response) {
	const { idVaga } = req.params

	if (!idVaga) {
		res.status(400).json({
			message: 'No id from vaga was found!'
		})
	}

	try {
		const idVagaAsNumber = parseInt(idVaga)

		const vaga = (await selectVagaByID(idVagaAsNumber)) as Vaga

		res.status(200).json({
			message: 'Vaga with ID ' + idVaga + ' getted!',
			vaga: vaga
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Get all vagas by CNPJ controller.
 */
export async function getAllVagasByCNPJ(req: Request, res: Response) {
	const { cnpj } = req.params

	if (!cnpj) {
		res.status(400).json({
			message: 'No id from vaga was found!'
		})
	}

	try {
		const allVagas = (await selectAllVagasFromCNPJ(cnpj)) as Vaga[]

		res.status(200).json({
			message: 'All vagas from cnpj ' + cnpj + ' getted!',
			vagas: allVagas
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Get all vagas controller
 */
export async function getAllVagas(req: Request, res: Response) {
	try {
		const allVagas = (await selectAllVagas()) as Vaga[]

		res.status(200).json({
			message: 'All vagas getted!',
			vagas: allVagas
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Edit vaga controller.
 */
export async function editVaga(req: Request, res: Response) {
	try {
		if (!editVagaBodyIsValid(req.body)) {
			return res.status(400).json({
				message: 'Error: request body is invalid!'
			})
		}

		const { idVaga } = req.params

		if (!idVaga) {
			res.status(400).json({
				message: 'No id from vaga was found!'
			})
		}

		const idAsNumber = parseInt(idVaga)

		const changes = req.body.changes as VagaChanges

		await updateVaga(idAsNumber, changes as VagaChanges)
		const vaga = (await selectVagaByID(idAsNumber)) as Vaga

		res.status(200).json({
			message: 'Vaga with id ' + idVaga + ' updated with success!',
			vaga: vaga
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}
