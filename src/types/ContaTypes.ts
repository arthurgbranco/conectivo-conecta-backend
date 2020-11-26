/**
 * Account info interface
 */
export interface Conta {
	email: String
	senha: String
}

/**
 * Check if object agrees with the account interface
 */
export function isConta(object: any): object is Conta {
	if (object === null || object === undefined) {
		return false
	}

	const ContaProperties: { [key: string]: string } = {
		email: '[object String]',
		senha: '[object String]'
	}

	for (const propertyName in ContaProperties) {
		if (
			!(
				propertyName in object &&
				Object.prototype.toString.call(object[propertyName]) ===
					ContaProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}
