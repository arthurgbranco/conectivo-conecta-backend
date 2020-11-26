import { Request, Response } from 'express'
import { insertConta, selectContaByEmail } from '../models/ContaModel'
import { Conta } from '../types/ContaTypes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
	createBodyIsValid,
	editBodyIsValid,
	loginBodyIsValid
} from '../validators/EmpresaValidators'
import { Empresa, EmpresaChanges } from '../types/EmpresaTypes'
import {
	insert,
	removeEmpresa,
	selectAllEmpresas,
	selectByEmail,
	updateEmpresa
} from '../models/EmpresaModel'
import { EmpresaNotFoundException } from '../types/Exceptions'

/**
 * Create company Controller.
 *
 * The request body must contain all the woker's attribute, along with an array with the working experience and an account obejct.
 */
export async function create(req: Request, res: Response) {
	if (!createBodyIsValid(req.body)) {
		res.status(400).json({
			message: 'Error: Incorrect request body.'
		})
		return
	}

	const newConta: Conta = { ...req.body.conta }
	const empresa: Empresa = { ...req.body.empresa }

	const hashedPassword = await bcrypt.hash(newConta.senha, 10)
	newConta.senha = hashedPassword

	try {
		await insertConta(newConta)

		await insert(empresa, newConta.email)

		const secretJWTKey = process.env.ACCESS_TOKEN_SECRET
		const accessToken = jwt.sign(empresa, secretJWTKey as string)

		res.status(200).json({
			message: 'Trabalhador created!',
			empresa: empresa,
			conta: newConta,
			token: accessToken
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Login controller.
 *
 * After validation, a valid JWT is returned.
 */
export async function login(req: Request, res: Response) {
	if (!loginBodyIsValid(req.body)) {
		res.status(400).json({
			message: 'Error: request body is invalid!'
		})
		return
	}

	const { email, senha } = req.body

	try {
		const selectedEmpresa = (await selectByEmail(email)) as Empresa
		const selectedAccount = (await selectContaByEmail(email)) as Conta

		// Password check
		if (await bcrypt.compare(senha, selectedAccount.senha.toString())) {
			const secretJWTKey = process.env.ACCESS_TOKEN_SECRET

			if (secretJWTKey === undefined) {
				throw new Error('Secret JWT key was not defined')
			}

			const accessToken = jwt.sign(selectedEmpresa, secretJWTKey as string)

			res.status(200).json({
				message: 'Account authenticated with success',
				token: accessToken
			})
		} else {
			res.status(401).json({
				message: 'Error: invalid password.'
			})
		}
	} catch (err) {
		if (err instanceof EmpresaNotFoundException) {
			res.status(404).json({
				message: 'Error: trabalhador not found!'
			})
		} else {
			res.status(500).json({
				message: 'Error: ' + err
			})
		}
	}
}

/**
 * Get Empresa Controller.
 */
export async function getEmpresa(req: Request, res: Response) {
	const { email } = req.params

	try {
		const empresa = (await selectByEmail(email)) as Empresa
		const conta = (await selectContaByEmail(email)) as Conta

		res.status(200).json({
			message: 'Empresas getted!',
			empresa: empresa,
			conta: conta
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Delete empresa controller.
 */
export async function deleteEmpresa(req: Request, res: Response) {
	const { email } = req.params

	try {
		await removeEmpresa(email)

		res.status(200).json({
			message: `Empresa with email: ${email} deleted!`
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Get all empresas controller.
 */
export async function getAllEmpresas(req: Request, res: Response) {
	try {
		const allEmpresas = (await selectAllEmpresas()) as Empresa[]

		res.status(200).json({
			message: 'Empresas getted!',
			empresas: allEmpresas
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Edit a empresa controller.
 */
export async function editEmpresa(req: Request, res: Response) {
	try {
		if (!editBodyIsValid(req.body)) {
			return res.status(400).json({
				message: 'Error: request body is invalid!'
			})
		}

		const { email } = req.params
		const changes = req.body.changes as EmpresaChanges

		await updateEmpresa(email, changes as EmpresaChanges)
		const empresa = (await selectByEmail(email)) as Empresa

		res.status(200).json({
			message: 'Empresa with email ' + email + ' updated with success!',
			empresa: empresa
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}
