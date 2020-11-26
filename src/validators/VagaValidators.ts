import { isVaga, isVagaChanges } from '../types/VagaTypes'

/**
 * Check if request body for vaga creation is valid.
 */
export function createVagaBodyIsValid(body: any): Boolean {
	const { vaga } = body
	return isVaga(vaga)
}

/**
 * Check if request body for vaga edit is valid.
 */
export function editVagaBodyIsValid(body: any): Boolean {
	const { changes } = body
	return isVagaChanges(changes)
}
