import { isTrabalhador, isTrabalhadorChanges } from '../types/TrabalhadorTypes'
import { isConta } from '../types/ContaTypes'

/**
 * Check if request body for worker creation is valid.
 */
export function createBodyIsValid(body: any): Boolean {
	const { trabalhador, conta } = body
	return isTrabalhador(trabalhador) && isConta(conta)
}

/**
 * Check if request body for login is valid.
 */
export function loginBodyIsValid(body: any): Boolean {
	return body.email && body.senha
}

/**
 * Check if request body for worker edit is valid.
 */
export function editBodyIsValid(body: any): Boolean {
	const { changes } = body
	return isTrabalhadorChanges(changes)
}
