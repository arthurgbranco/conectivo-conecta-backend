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

const queryString = `CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};

const queryString = `CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};

USE ${DATABASE_NAME};

CREATE TABLE IF NOT EXISTS \`conta\` (
  \`email\` varchar(50) NOT NULL,
  \`senha\` varchar(80) NOT NULL,
  PRIMARY KEY (\`email\`)
);

CREATE TABLE IF NOT EXISTS \`empresa\` (
\`cnpj\` char(20) NOT NULL,
\`razaoSocial\` varchar(50) NOT NULL,
\`site\` char(50) DEFAULT NULL,
\`telefoneDeContato\` char(20) DEFAULT NULL,
\`email\` varchar(50) NOT NULL,
\`eValido\` tinyint(1) DEFAULT 0,
\`caminhoParaImagem\` varchar(1024) DEFAULT NULL,
PRIMARY KEY (\`cnpj\`),
KEY \`fk_empresa_conta_idx\` (\`email\`),
CONSTRAINT \`fk_empresa_conta\` FOREIGN KEY (\`email\`) REFERENCES \`conta\` (\`email\`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS \`trabalhador\` (
  \`cpf\` varchar(20) NOT NULL,
  \`nomeCompleto\` varchar(50) DEFAULT NULL,
  \`nomeCompletoMae\` varchar(50) DEFAULT NULL,
  \`numeroDeRG\` int DEFAULT '0',
  \`dataDeNascimento\` varchar(20) DEFAULT NULL,
  \`localDeNascimento\` varchar(50) DEFAULT NULL,
  \`estadoCivil\` varchar(20) DEFAULT NULL,
  \`numeroDeFilhos\` int DEFAULT NULL,
  \`telefoneDeContato\` varchar(20) DEFAULT NULL,
  \`endereco\` varchar(60) DEFAULT NULL,
  \`escolaridade\` varchar(30) DEFAULT NULL,
  \`objetivoProfissional\` longtext,
  \`resumoProfissional\` longtext,
  \`email\` varchar(40) NOT NULL,
  \`caminhoParaImagem\` varchar(1024) DEFAULT NULL,
  \`caminhoParaCurriculo\` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (\`cpf\`),
  KEY \`fk_trabalhador_conta_idx\` (\`email\`),
  CONSTRAINT \`fk_trabalhador_conta\` FOREIGN KEY (\`email\`) REFERENCES \`conta\` (\`email\`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS \`vaga\` (
  \`cnpjDaEmpresa\` CHAR(20) DEFAULT NULL,
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`titulo\` VARCHAR(50) NOT NULL,
  \`descricao\` VARCHAR(1024) NOT NULL,
  \`salario\` FLOAT NOT NULL,
  \`categoria\` VARCHAR(30),
  \`localizacao\` VARCHAR(30),
  PRIMARY KEY (\`id\`),
  KEY \`fk_vaga_empresa_idx\` (\`cnpjDaEmpresa\`),
  CONSTRAINT \`fk_vaga_empresa\` FOREIGN KEY (\`cnpjDaEmpresa\`)
      REFERENCES \`empresa\` (\`cnpj\`)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS \`inscricaoVagaTrabalhador\` (
  \`idDaVaga\` INT NOT NULL,
  \`cpfTrabalhador\` VARCHAR(20) NOT NULL,
  PRIMARY KEY (\`idDaVaga\` , \`cpfTrabalhador\`),
  KEY \`fk_inscricao_vaga_idx\` (\`idDaVaga\`),
  KEY \`fk_inscricao_trabalhador_idx\` (\`cpfTrabalhador\`),
  CONSTRAINT \`fk_inscricao_vaga\` FOREIGN KEY (\`idDaVaga\`)
      REFERENCES \`vaga\` (\`id\`)
      ON DELETE CASCADE,
  CONSTRAINT \`fk_inscricao_trabalhador\` FOREIGN KEY (\`cpfTrabalhador\`)
      REFERENCES \`trabalhador\` (\`cpf\`)
      ON DELETE CASCADE
);`

/**
 * Middleware to check if the '${DATABASE_NAME}' exists along with all of its tables.
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
