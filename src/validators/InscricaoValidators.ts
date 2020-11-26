/**
 * Check if request body for inscricao creation is valid.
 */
export function createInscricaoBodyIsValid(body: any): Boolean {
	const { cpfTrabalhador, idDaVaga } = body
	return cpfTrabalhador && idDaVaga
}
