import { Request, Response, NextFunction } from 'express'
import mysql from 'mysql'

const HOST = process.env.DB_HOST || 'localhost'
const USER = process.env.DB_USER || 'root'
const PASSWORD = process.env.DB_PASSWORD || ''
const DATABASE_NAME = process.env.DB_NAME || 'conectivo_conecta_db'

const sql = mysql.createPool({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE_NAME,
	insecureAuth: true,
	multipleStatements: true
})

const queryString = `CREATE DATABASE IF NOT EXISTS conectivo_conecta_db;

USE conectivo_conecta_db;

CREATE TABLE IF NOT EXISTS \`conta\` (
  \`email\` varchar(30) NOT NULL,
  \`senha\` varchar(80) NOT NULL,
  PRIMARY KEY (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS \`empresa\` (
\`cnpj\` char(14) NOT NULL,
\`razaoSocial\` varchar(50) NOT NULL,
\`site\` char(30) DEFAULT NULL,
\`telefoneDeContato\` char(15) DEFAULT NULL,
\`email\` varchar(30) NOT NULL,
\`eValido\` tinyint(1) DEFAULT 0,
\`caminhoParaImagem\` varchar(1024) DEFAULT NULL,
PRIMARY KEY (\`cnpj\`),
KEY \`fk_empresa_conta_idx\` (\`email\`),
CONSTRAINT \`fk_empresa_conta\` FOREIGN KEY (\`email\`) REFERENCES \`conta\` (\`email\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS \`trabalhador\` (
  \`cpf\` varchar(12) NOT NULL,
  \`nomeCompleto\` varchar(45) DEFAULT NULL,
  \`nomeCompletoMae\` varchar(45) DEFAULT NULL,
  \`numeroDeRG\` int DEFAULT '0',
  \`dataDeNascimento\` varchar(45) DEFAULT NULL,
  \`localDeNascimento\` varchar(30) DEFAULT NULL,
  \`estadoCivil\` varchar(20) DEFAULT NULL,
  \`numeroDeFilhos\` int DEFAULT NULL,
  \`telefoneDeContato\` varchar(15) DEFAULT NULL,
  \`endereco\` varchar(60) DEFAULT NULL,
  \`escolaridade\` varchar(30) DEFAULT NULL,
  \`objetivoProfissional\` longtext,
  \`resumoProfissional\` longtext,
  \`email\` varchar(30) NOT NULL,
  \`caminhoParaImagem\` varchar(1024) DEFAULT NULL,
  \`caminhoParaCurriculo\` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (\`cpf\`),
  KEY \`fk_trabalhador_conta_idx\` (\`email\`),
  CONSTRAINT \`fk_trabalhador_conta\` FOREIGN KEY (\`email\`) REFERENCES \`conta\` (\`email\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`

/**
 * Middleware to check if the 'conectivo_conecta_db' exists along with all of its tables.
 *
 * If the database or any of its tables does not exist, it/they will be created.
 */
export function checkDatabase(req: Request, res: Response, next: NextFunction) {
	sql.query(queryString, function (err, dbRes) {
		if (err) {
			console.log('DB error: ', err)
			return res.status(500).json({
				message: `Error: ${err}`
			})
		}

		next()
	})
}
