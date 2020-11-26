/**
 * Inscricao model's interface.
 */
export interface Inscricao {
	idDaVaga: Number
	cpfTrabalhador: String
}

/**
 * Check if object agrees with inscricao's interface.
 */
export function isInscricao(object: any): object is Inscricao {
	if (object === null || object === undefined) {
		return false
	}

	const inscricaoProperties: { [key: string]: string } = {
		idDaVaga: '[object Number]',
		cpfTrabalhador: '[object String]'
	}

	for (const propertyName in inscricaoProperties) {
		if (
			!(
				propertyName in object &&
				Object.prototype.toString.call(object[propertyName]) ===
					inscricaoProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}
