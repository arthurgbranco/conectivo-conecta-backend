/**
 * Company model's interface.
 */
export interface Empresa {
	cnpj: String
	razaoSocial: String
	site?: String
	telefoneDeContato?: String
	email?: String
	eValido: Boolean
	caminhoParaImagem?: String
}

/**
 * Check if object agrees with company's interface.
 */
export function isEmpresa(object: any): object is Empresa {
	if (object === null || object === undefined) {
		return false
	}

	const EmpresaProperties: { [key: string]: string } = {
		cnpj: '[object String]',
		razaoSocial: '[object String]'
	}

	for (const propertyName in EmpresaProperties) {
		if (
			!(
				propertyName in object &&
				Object.prototype.toString.call(object[propertyName]) ===
					EmpresaProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}

/**
 * Company changes interface.
 *
 * It has the exactly same properties as Company, but they are all optional.
 */
export interface EmpresaChanges {
	cnpj?: String
	razaoSocial?: String
	site?: String
	telefoneDeContato?: String
	email?: String
	eValido?: Boolean
	caminhoParaImagem?: String
}

/**
 * Check if object agrees with company changes's interface.
 */
export function isEmpresaChanges(object: any): object is EmpresaChanges {
	if (object === null || object === undefined) {
		return false
	}

	const EmpresaChangesProperties: { [key: string]: string } = {
		cnpj: '[object String]',
		razaoSocial: '[object String]',
		site: '[object String]',
		telefoneDeContato: '[object String]',
		eValido: '[object Boolean]'
	}

	for (const propertyName in object) {
		if (
			!(
				propertyName in EmpresaChangesProperties &&
				Object.prototype.toString.call(object[propertyName]) ===
					EmpresaChangesProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}
