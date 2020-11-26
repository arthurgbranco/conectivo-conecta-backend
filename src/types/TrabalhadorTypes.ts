/**
 * Worker model's interface.
 */
export interface Trabalhador {
	cpf: Number
	nomeCompleto: String
	nomeCompletoMae: String
	numeroDeRG: Number
	dataDeNascimento: String
	localDeNascimento: String
	estadoCivil: String
	numeroDeFilhos: Number
	telefoneDeContato: String
	email?: String
	endereco: String
	escolaridade: String
	objetivoProfissional: String
	resumoProfissional: String
	caminhoParaCurriculo?: String
	caminhoParaImagem?: String
}

/**
 * Check if object agrees with worker's interface.
 */
export function isTrabalhador(object: any): object is Trabalhador {
	if (object === null || object === undefined) {
		return false
	}

	const TrabalhadorProperties: { [key: string]: string } = {
		cpf: '[object String]',
		nomeCompleto: '[object String]',
		nomeCompletoMae: '[object String]',
		numeroDeRG: '[object Number]',
		dataDeNascimento: '[object String]',
		localDeNascimento: '[object String]',
		estadoCivil: '[object String]',
		numeroDeFilhos: '[object Number]',
		telefoneDeContato: '[object String]',
		endereco: '[object String]',
		escolaridade: '[object String]',
		objetivoProfissional: '[object String]',
		resumoProfissional: '[object String]'
	}

	for (const propertyName in TrabalhadorProperties) {
		if (
			!(
				propertyName in object &&
				Object.prototype.toString.call(object[propertyName]) ===
					TrabalhadorProperties[propertyName]
			)
		) {
			console.log('Que que deu: ', propertyName)
			console.log(object[propertyName])
			return false
		}
	}

	return true
}

/**
 * Worker changes interface.
 *
 * It has the exactly same properties as Trabalhador, but they are all optional.
 */
export interface TrabalhadorChanges {
	cpf?: Number
	nomeCompleto?: String
	nomeCompletoMae?: String
	numeroDeRG?: Number
	dataDeNascimento?: String
	localDeNascimento?: String
	estadoCivil?: String
	numeroDeFilhos?: Number
	telefoneDeContato?: String
	email?: String
	endereco?: String
	escolaridade?: String
	objetivoProfissional?: String
	resumoProfissional?: String
}

/**
 * Check if object agrees with worker changes's interface.
 */
export function isTrabalhadorChanges(object: any): object is Trabalhador {
	if (object === null || object === undefined) {
		return false
	}

	const TrabalhadorChangesProperties: { [key: string]: string } = {
		cpf: '[object Number]',
		nomeCompleto: '[object String]',
		nomeCompletoMae: '[object String]',
		numeroDeRG: '[object Number]',
		dataDeNascimento: '[object String]',
		localDeNascimento: '[object String]',
		estadoCivil: '[object String]',
		numeroDeFilhos: '[object Number]',
		telefoneDeContato: '[object String]',
		endereco: '[object String]',
		escolaridade: '[object String]',
		objetivoProfissional: '[object String]',
		resumoProfissional: '[object String]'
	}

	for (const propertyName in object) {
		if (
			!(
				propertyName in TrabalhadorChangesProperties &&
				Object.prototype.toString.call(object[propertyName]) ===
					TrabalhadorChangesProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}
