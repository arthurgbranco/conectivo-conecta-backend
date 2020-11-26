import { Trabalhador } from './TrabalhadorTypes'

/**
 * Vaga model's interface.
 */
export interface Vaga {
	id?: Number
	cnpjDaEmpresa: String
	titulo: String
	descricao: String
	salario: Number
	categoria: String
	localizacao: String
	trabalhadores?: Trabalhador[]
}

/**
 * Check if object agrees with vaga's interface.
 */
export function isVaga(object: any): object is Vaga {
	if (object === null || object === undefined) {
		return false
	}

	const VagaProperties: { [key: string]: string } = {
		cnpjDaEmpresa: '[object String]',
		titulo: '[object String]',
		descricao: '[object String]',
		salario: '[object Number]',
		categoria: '[object String]',
		localizacao: '[object String]'
	}

	for (const propertyName in VagaProperties) {
		if (
			!(
				propertyName in object &&
				Object.prototype.toString.call(object[propertyName]) ===
					VagaProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}

/**
 * Vaga changes interface.
 *
 * It has the exactly same properties as Vaga, but they are all optional.
 */
export interface VagaChanges {
	titulo?: String
	descricao?: String
	salario?: Number
	categoria?: String
	localizacao?: String
}

/**
 * Check if object agrees with vaga changes's interface.
 */
export function isVagaChanges(object: any): object is VagaChanges {
	if (object === null || object === undefined) {
		return false
	}

	const VagaChangesProperties: { [key: string]: string } = {
		titulo: '[object String]',
		descricao: '[object String]',
		salario: '[object Number]',
		categoria: '[object String]',
		localizacao: '[object String]'
	}

	for (const propertyName in object) {
		if (
			!(
				propertyName in VagaChangesProperties &&
				Object.prototype.toString.call(object[propertyName]) ===
					VagaChangesProperties[propertyName]
			)
		) {
			return false
		}
	}

	return true
}
