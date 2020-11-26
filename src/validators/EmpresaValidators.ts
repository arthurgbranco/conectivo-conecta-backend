import { isEmpresa, isEmpresaChanges } from '../types/EmpresaTypes'
import { isConta } from '../types/ContaTypes'

/**
 * Check if request body for company creation is valid.
 */
export function createBodyIsValid(body: any): Boolean {
	const { empresa, conta } = body
	return isEmpresa(empresa) && isConta(conta)
}

/**
 * Check if request body for login is valid.
 */
export function loginBodyIsValid(body: any): Boolean {
	return body.email && body.senha
}

/**
 * Check if request body for company edit is valid.
 */
export function editBodyIsValid(body: any): Boolean {
	const { changes } = body
	return isEmpresaChanges(changes)
}
