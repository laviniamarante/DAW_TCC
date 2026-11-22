"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  FileTextIcon,
  CurrencyDollarIcon,
  UserIcon,
  BriefcaseIcon,
  LinkIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";

import styles from "./page.module.css";


const estadoInicial = {
  // identificação do contrato
  objeto_contrato: "",
  identificador_contrato: "",
  vigencia: "",
  data_inicio: "",
  data_fim: "",
  prorrogavel: "",
  prazo_restante: "",
  data_celebracao: "",
  representante_legal: "",

  // empresa
  razao_social: "",
  nome_fantasia: "",
  cnpj: "",
  email_empresa: "",
  telefone: "",
  endereco_empresa: "",

  // classificação
  categoria: "",
  situacao_contrato: "",
  situacao_gov: "",
  natureza_contrato: "",

  // processos e documentos
  numero_processo_celebracao: "",
  nota_empenho: "",
  dados_licitacao: "",
  processo_gestao: "",
  portaria_fiscalizacao: "",
  link_pasta_gestao: "",
  link_processo_eletronico: "",
  link_pregao_srp: "",

  // fiscalização e gestão
  fiscal_titular: "",
  fiscal_substituto: "",
  gestor_titular: "",
  gestor_substituto: "",

  // valores e orçamento
  valor_global: "",
  valor_mensal: "",
  fonte_recurso: "",
  natureza_despesa: "",
  numero_evento: "",
  uasg: "",
  plano_interno: "",
  programa_trabalho: "",
  conta_vinculada: "",

  // verba
  verba_descricao: "",
  verba_valor_disponivel: "",
  verba_valor_utilizado: "",

  // representante legal 
  cpf_representante: "",
  rg_representante: "",
  email_contato: "",
  endereco_postal: "",
};

type Formulario = typeof estadoInicial;

/* cartao aberto ou fechado, so olhar a setinha do lado */
const cartoesIniciais = {
  identificacao: true,
  empresa: true,
  classificacao: true,
  processos: true,
  fiscalizacao: true,
  valores: true,
  verba: true,
  representante: true,
};

type IdCartao = keyof typeof cartoesIniciais;

type EventoCampo = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;


function Campo({
  label,
  name,
  value,
  onChange,
  type = "text",
  opcoes,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: EventoCampo) => void;
  type?: string;
  opcoes?: { valor: string; texto: string }[];
}) {
  return (
    <div className={styles.campo}>
      <label htmlFor={name}>{label}</label>

      {opcoes ? (
        <select id={name} name={name} value={value} onChange={onChange}>
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.texto}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          step={type === "number" ? "any" : undefined}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}


function Cartao({
  titulo,
  icone,
  aberto,
  onAlternar,
  children,
}: {
  titulo: string;
  icone: React.ReactNode;
  aberto: boolean;
  onAlternar: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.cartao}>
      <div
        className={`${styles.cabecalhoCartao} ${
          aberto ? "" : styles.cabecalhoFechado
        }`}
      >
        {icone}
        <h3>{titulo}</h3>

        <button
          type="button"
          className={styles.botaoSeta}
          onClick={onAlternar}
          aria-expanded={aberto}
          aria-label={aberto ? `Recolher ${titulo}` : `Expandir ${titulo}`}
        >
          <CaretDownIcon
            size={20}
            className={`${styles.seta} ${aberto ? "" : styles.setaFechada}`}
          />
        </button>
      </div>

      {aberto && children}
    </section>
  );
}

export default function NovoContrato() {
  const [form, setForm] = useState<Formulario>(estadoInicial);
  const [abertos, setAbertos] = useState(cartoesIniciais);

  /* onChange pra todos os campos: usa o "name" do input como chave */
  function handleChange(e: EventoCampo) {
    const { name, value } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function alternarCartao(id: IdCartao) {
    setAbertos((anterior) => ({
      ...anterior,
      [id]: !anterior[id],
    }));
  }

  /* atalho evitam repetir name/value/onChange em cada campo */
  const campo = (name: keyof Formulario) => ({
    name,
    value: form[name],
    onChange: handleChange,
  });

  const cartao = (id: IdCartao) => ({
    aberto: abertos[id],
    onAlternar: () => alternarCartao(id),
  });

  function handleSalvar() {
    // por enquanto só mostra os dados no console (sem Supabase)
    console.log("Dados do novo contrato:", form);
  }

  return (
    <main className={styles.container}>
      
      <div className={styles.cabecalho}>
        <Link href="/inicial" className={styles.botaoVoltar}>
          <ArrowLeftIcon size={20} />
        </Link>

        <div className={styles.areaTitulo}>
          <h2>Novo Contrato</h2>
          <h4 className={styles.subtitulo}>
            Preencha as informações do novo contrato
          </h4>
        </div>
      </div>

      <div className={styles.gradeCartoes}>
        
        <Cartao
          titulo="Identificação do Contrato"
          icone={<FileTextIcon size={25} />}
          {...cartao("identificacao")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Objeto do Contrato" {...campo("objeto_contrato")} />
            <Campo
              label="Identificador do Contrato"
              {...campo("identificador_contrato")}
            />
            <Campo label="Vigência" type="number" {...campo("vigencia")} />
            <Campo
              label="Data de Início"
              type="date"
              {...campo("data_inicio")}
            />
            <Campo label="Data de Fim" type="date" {...campo("data_fim")} />
            <Campo
              label="Prorrogável"
              opcoes={[
                { valor: "", texto: "Selecione" },
                { valor: "true", texto: "Sim" },
                { valor: "false", texto: "Não" },
              ]}
              {...campo("prorrogavel")}
            />
            <Campo
              label="Prazo Restante"
              type="number"
              {...campo("prazo_restante")}
            />
            <Campo
              label="Data de Celebração"
              type="date"
              {...campo("data_celebracao")}
            />
            <Campo
              label="Representante Legal"
              {...campo("representante_legal")}
            />
          </div>
        </Cartao>

       
        <Cartao
          titulo="Empresa"
          icone={<BriefcaseIcon size={25} />}
          {...cartao("empresa")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Razão Social" {...campo("razao_social")} />
            <Campo label="Nome Fantasia" {...campo("nome_fantasia")} />
            <Campo label="CNPJ" {...campo("cnpj")} />
            <Campo label="E-mail" type="email" {...campo("email_empresa")} />
            <Campo label="Telefone" type="tel" {...campo("telefone")} />
            <Campo label="Endereço" {...campo("endereco_empresa")} />
          </div>
        </Cartao>

      
        <Cartao
          titulo="Classificação"
          icone={<BriefcaseIcon size={25} />}
          {...cartao("classificacao")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Categoria" {...campo("categoria")} />
            <Campo
              label="Situação do Contrato"
              {...campo("situacao_contrato")}
            />
            <Campo label="Situação no Gov" {...campo("situacao_gov")} />
            <Campo
              label="Natureza do Contrato"
              {...campo("natureza_contrato")}
            />
          </div>
        </Cartao>

       
        <Cartao
          titulo="Processos e Documentos"
          icone={<LinkIcon size={25} />}
          {...cartao("processos")}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Nº Processo de Celebração"
              {...campo("numero_processo_celebracao")}
            />
            <Campo label="Nota de Empenho" {...campo("nota_empenho")} />
            <Campo label="Dados da Licitação" {...campo("dados_licitacao")} />
            <Campo label="Processo de Gestão" {...campo("processo_gestao")} />
            <Campo
              label="Portaria de Fiscalização"
              {...campo("portaria_fiscalizacao")}
            />
            <Campo
              label="Link da Pasta de Gestão"
              type="url"
              {...campo("link_pasta_gestao")}
            />
            <Campo
              label="Link do Processo Eletrônico"
              type="url"
              {...campo("link_processo_eletronico")}
            />
            <Campo
              label="Link do Pregão SRP"
              type="url"
              {...campo("link_pregao_srp")}
            />
          </div>
        </Cartao>

        
        <Cartao
          titulo="Fiscalização e Gestão"
          icone={<UserIcon size={25} />}
          {...cartao("fiscalizacao")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Fiscal Titular" {...campo("fiscal_titular")} />
            <Campo label="Fiscal Substituto" {...campo("fiscal_substituto")} />
            <Campo label="Gestor Titular" {...campo("gestor_titular")} />
            <Campo label="Gestor Substituto" {...campo("gestor_substituto")} />
          </div>
        </Cartao>

        
        <Cartao
          titulo="Valores e Orçamento"
          icone={<CurrencyDollarIcon size={25} />}
          {...cartao("valores")}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Valor Global"
              type="number"
              {...campo("valor_global")}
            />
            <Campo
              label="Valor Mensal"
              type="number"
              {...campo("valor_mensal")}
            />
            <Campo label="Fonte de Recurso" {...campo("fonte_recurso")} />
            <Campo label="Natureza da Despesa" {...campo("natureza_despesa")} />
            <Campo label="Número do Evento" {...campo("numero_evento")} />
            <Campo label="UASG" {...campo("uasg")} />
            <Campo label="Plano Interno" {...campo("plano_interno")} />
            <Campo
              label="Programa de Trabalho"
              {...campo("programa_trabalho")}
            />
            <Campo label="Conta Vinculada" {...campo("conta_vinculada")} />
          </div>
        </Cartao>

    
        <Cartao
          titulo="Verba"
          icone={<CurrencyDollarIcon size={25} />}
          {...cartao("verba")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Descrição" {...campo("verba_descricao")} />
            <Campo
              label="Valor Disponível"
              type="number"
              {...campo("verba_valor_disponivel")}
            />
            <Campo
              label="Valor Utilizado"
              type="number"
              {...campo("verba_valor_utilizado")}
            />
          </div>
        </Cartao>

        <Cartao
          titulo="Representante Legal"
          icone={<UserIcon size={25} />}
          {...cartao("representante")}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Representante Legal"
              {...campo("representante_legal")}
            />
            <Campo label="CPF" {...campo("cpf_representante")} />
            <Campo label="RG" {...campo("rg_representante")} />
            <Campo label="E-mail" type="email" {...campo("email_contato")} />
            <Campo label="Endereço Postal" {...campo("endereco_postal")} />
          </div>
        </Cartao>

        <button
          type="button"
          className={styles.botaoSalvar}
          onClick={handleSalvar}
        >
          Salvar Contrato
        </button>
      </div>
    </main>
  );
}
