-- CREATE SCHEMA gerenciaif_db;

CREATE TABLE situacao_cadastro (
  id_situacao_cadastro SERIAL NOT NULL,
  situacao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_situacao_cadastro)
);

CREATE TABLE pessoa (
  id_pessoa SERIAL NOT NULL,
  cpf VARCHAR(18) NOT NULL,
  nome VARCHAR(160) NOT NULL,
  email VARCHAR(60) NOT NULL,
  id_situacao_cadastro INT NOT NULL DEFAULT 1,
  PRIMARY KEY (id_pessoa),
  CONSTRAINT pessoa_id_situacao_cadastro_fk
    FOREIGN KEY (id_situacao_cadastro)
    REFERENCES situacao_cadastro (id_situacao_cadastro)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX pessoa_id_situacao_cadastro_fk_idx ON pessoa (id_situacao_cadastro);

CREATE TABLE tipo_usuario (
  id_tipo_usuario SERIAL NOT NULL,
  tipo VARCHAR(60) NOT NULL,
  PRIMARY KEY (id_tipo_usuario)
);

CREATE TABLE usuario (
  id_usuario SERIAL NOT NULL,
  id_pessoa INT NOT NULL,
  senha VARCHAR(120) NOT NULL,
  id_tipo_usuario INT NOT NULL,
  id_situacao_cadastro INT NOT NULL DEFAULT 1,
  PRIMARY KEY (id_usuario),
  CONSTRAINT usuario_id_pessoa_fk
    FOREIGN KEY (id_pessoa)
    REFERENCES pessoa (id_pessoa)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT usuario_id_tipo_usuario_fk
    FOREIGN KEY (id_tipo_usuario)
    REFERENCES tipo_usuario (id_tipo_usuario)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT usuario_id_situacao_cadastro_fk
    FOREIGN KEY (id_situacao_cadastro)
    REFERENCES situacao_cadastro (id_situacao_cadastro)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX usuario_id_pessoa_fk_idx ON usuario (id_pessoa);
CREATE INDEX usuario_id_tipo_usuario_fk_idx ON usuario (id_tipo_usuario);
CREATE INDEX usuario_id_situacao_cadastro_fk_idx ON usuario (id_situacao_cadastro);

CREATE TABLE permissao (
  id_permissao SERIAL NOT NULL,
  id_usuario INT NOT NULL,
  ler SMALLINT NOT NULL DEFAULT 0,
  criar SMALLINT NOT NULL DEFAULT 0,
  editar SMALLINT NOT NULL DEFAULT 0,
  excluir SMALLINT NOT NULL DEFAULT 0,
  PRIMARY KEY (id_permissao),
  CONSTRAINT permissao_id_usuario_fk
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX permissao_id_usuario_fk_idx ON permissao (id_usuario);

CREATE TABLE empresa (
  id_empresa SERIAL NOT NULL,
  cnpj VARCHAR(18) NOT NULL,
  razao VARCHAR(160) NOT NULL,
  fantasia VARCHAR(160) NOT NULL,
  email VARCHAR(60) NOT NULL,
  telefone VARCHAR(16) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  id_situacao_cadastro INT NOT NULL DEFAULT 1,
  PRIMARY KEY (id_empresa),
  CONSTRAINT empresa_id_situacao_cadastro_fk
    FOREIGN KEY (id_situacao_cadastro)
    REFERENCES situacao_cadastro (id_situacao_cadastro)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX empresa_id_situacao_cadastro_fk_idx ON empresa (id_situacao_cadastro);

CREATE TABLE categoria (
  id_categoria SERIAL NOT NULL,
  nome VARCHAR(60) NOT NULL,
  PRIMARY KEY (id_categoria)
);

CREATE TABLE verba (
  id_verba SERIAL NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  valor_disponivel DECIMAL(16,2) NOT NULL,
  valor_utilizado DECIMAL(16,2) NOT NULL,
  PRIMARY KEY (id_verba)
);

CREATE TABLE situacao_contrato (
  id_situacao_contrato SERIAL NOT NULL,
  situacao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_situacao_contrato)
);

CREATE TABLE contrato (
  id_contrato SERIAL NOT NULL,
  id_empresa INT NOT NULL,
  id_verba INT NOT NULL,
  id_categoria INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  data_inicio DATE NOT NULL,
  data_termino DATE NOT NULL,
  valor_total DECIMAL(16,2) NOT NULL,
  id_situacao_contrato INT NOT NULL,
  PRIMARY KEY (id_contrato),
  CONSTRAINT contrato_id_empresa_fk
    FOREIGN KEY (id_empresa)
    REFERENCES empresa (id_empresa)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT contrato_id_verba_fk
    FOREIGN KEY (id_verba)
    REFERENCES verba (id_verba)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT contrato_id_categoria_fk
    FOREIGN KEY (id_categoria)
    REFERENCES categoria (id_categoria)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT contrato_id_situacao_contrato_fk
    FOREIGN KEY (id_situacao_contrato)
    REFERENCES situacao_contrato (id_situacao_contrato)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX contrato_id_empresa_fk_idx ON contrato (id_empresa);
CREATE INDEX contrato_id_verba_fk_idx ON contrato (id_verba);
CREATE INDEX contrato_id_categoria_fk_idx ON contrato (id_categoria);
CREATE INDEX contrato_id_situacao_contrato_fk_idx ON contrato (id_situacao_contrato);

CREATE TABLE pagamento (
  id_pagamento SERIAL NOT NULL,
  id_contrato INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  valor_pago DECIMAL(16,2) NOT NULL,
  comprovante TEXT NOT NULL,
  PRIMARY KEY (id_pagamento),
  CONSTRAINT pagamento_id_contrato_fk
    FOREIGN KEY (id_contrato)
    REFERENCES contrato (id_contrato)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX pagamento_id_contrato_fk_idx ON pagamento (id_contrato);

CREATE TABLE tipo_notificacao (
  id_tipo_notificacao SERIAL NOT NULL,
  tipo VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_tipo_notificacao)
);

CREATE TABLE notificacao (
  id_notificacao SERIAL NOT NULL,
  id_contrato INT NOT NULL,
  id_tipo_notificacao INT NOT NULL,
  tempo_envio VARCHAR(45) NOT NULL,
  titulo VARCHAR(60) NOT NULL,
  corpo TEXT NOT NULL,
  data_criacao DATE NOT NULL,
  enviado INT NOT NULL,
  PRIMARY KEY (id_notificacao),
  CONSTRAINT notificacao_id_contrato_fk
    FOREIGN KEY (id_contrato)
    REFERENCES contrato (id_contrato)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT notificacao_tipo_notificacao_fk
    FOREIGN KEY (id_tipo_notificacao)
    REFERENCES tipo_notificacao (id_tipo_notificacao)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX notificacao_id_contrato_fk_idx ON notificacao (id_contrato);
CREATE INDEX notificacao_tipo_notificacao_fk_idx ON notificacao (id_tipo_notificacao);

CREATE OR REPLACE VIEW vw_usuario AS
SELECT
	u.id_usuario,
	u.id_pessoa,
	p.nome,
	p.email,
	u.senha,
	u.id_tipo_usuario,
	u.id_situacao_cadastro
FROM
	usuario AS u
LEFT JOIN
	pessoa AS p ON p.id_pessoa = u.id_pessoa;

INSERT INTO situacao_cadastro (id_situacao_cadastro, situacao) VALUES (1, 'ATIVO');
INSERT INTO situacao_cadastro (id_situacao_cadastro, situacao) VALUES (2, 'EXCLUIDO');

SELECT setval('situacao_cadastro_id_situacao_cadastro_seq', 2);

INSERT INTO pessoa (id_pessoa, cpf, nome, email, id_situacao_cadastro) VALUES (1, '00000000000', 'DESENVOLVEDOR', 'DESENVOLVEDOR@DEV.COM.BR', 1);

SELECT setval('pessoa_id_pessoa_seq', 1);

INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES (1, 'ADMINISTRADOR');
INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES (2, 'FISCAL');
INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES (3, 'USUARIO');

SELECT setval('tipo_usuario_id_tipo_usuario_seq', 3);

INSERT INTO usuario (id_usuario, id_pessoa, senha, id_tipo_usuario, id_situacao_cadastro) VALUES (1, 1, '123456789', 1, 1);

SELECT setval('usuario_id_usuario_seq', 1);

INSERT INTO permissao (id_permissao, id_usuario, ler, criar, editar, excluir) VALUES (1, 1, 1, 1, 1, 1);

SELECT setval('permissao_id_permissao_seq', 1);

INSERT INTO empresa (id_empresa, cnpj, razao, fantasia, email, telefone, endereco, id_situacao_cadastro) VALUES (1, '00000000000000', 'RAZAO EMPRESA', 'FANTASIA EMPRESA', 'EMPRESA@EMPRESA.COM.BR', '00000000000', 'RUA SEM NUMERO', 1);

SELECT setval('empresa_id_empresa_seq', 1);

INSERT INTO situacao_contrato (id_situacao_contrato, situacao) VALUES (1, 'PENDENTE');
INSERT INTO situacao_contrato (id_situacao_contrato, situacao) VALUES (2, 'ATIVO');
INSERT INTO situacao_contrato (id_situacao_contrato, situacao) VALUES (3, 'CONCLUIDO');
INSERT INTO situacao_contrato (id_situacao_contrato, situacao) VALUES (4, 'EXPIRADO');

SELECT setval('situacao_contrato_id_situacao_contrato_seq', 4);

INSERT INTO tipo_notificacao (id_tipo_notificacao, tipo) VALUES (1, 'INFORMATIVO');
INSERT INTO tipo_notificacao (id_tipo_notificacao, tipo) VALUES (2, 'COBRANCA');

SELECT setval('tipo_notificacao_id_tipo_notificacao_seq', 2);
