
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
  CalendarIcon,
} from "@phosphor-icons/react";

import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

// Campos do formulário
const estadoInicial = {
  // identificação do contrato
  objeto_contrato: "",
  identificador_contrato: "",
  nome_contratada: "",
  representante_legal: "",
  vigencia: "",
  data_inicio: "",
  data_fim: "",
  prorrogavel: "",
  prazo_restante: "",
  data_celebracao: "",

  // empresa
  cnpj: "",
  email_empresa: "",
  telefone: "",
  endereco_empresa: "",
  natureza_contrato: "",

  // classificação
  id_situacao_contrato: "",
  situacao_gov: "",

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

const cartoesIniciais = {
  identificacao: true,
  empresa: true,
  classificacao: true,
  processos: true,
  fiscalizacao: true,
  valores: true,
  verba: true,
  prorrogacoes: true,
  pagamentos: true,
  representante: true,
};

type IdCartao = keyof typeof cartoesIniciais;

type EventoCampo = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

type Prorrogacao = {
  novo_prazo: string;
  novo_valor: string;
};

type Pagamento = {
  descricao: string;
  valor_pago: string;
};

// Componente dos campos
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        >
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

// Componente dos cartões
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
            className={`${styles.seta} ${
              aberto ? "" : styles.setaFechada
            }`}
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

  // Lista de prorrogações
  const [prorrogacoes, setProrrogacoes] = useState<Prorrogacao[]>([
    { novo_prazo: "", novo_valor: "" },
  ]);

  // Lista de pagamentos
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([
    { descricao: "", valor_pago: "" },
  ]);

  // Atualiza os campos do formulário
  function handleChange(e: EventoCampo) {
    const { name, value } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  // Abre ou fecha os cartões
  function alternarCartao(id: IdCartao) {
    setAbertos((anterior) => ({
      ...anterior,
      [id]: !anterior[id],
    }));
  }

  // Atalho para os campos
  const campo = (name: keyof Formulario) => ({
    name,
    value: form[name],
    onChange: handleChange,
  });

  // Atalho para os cartões
  const cartao = (id: IdCartao) => ({
    aberto: abertos[id],
    onAlternar: () => alternarCartao(id),
  });

  // Atualiza uma prorrogação
  function atualizarProrrogacao(
    index: number,
    campo: keyof Prorrogacao,
    valor: string
  ) {
    setProrrogacoes((anterior) =>
      anterior.map((item, i) =>
        i === index ? { ...item, [campo]: valor } : item
      )
    );
  }

  // Atualiza um pagamento
  function atualizarPagamento(
    index: number,
    campo: keyof Pagamento,
    valor: string
  ) {
    setPagamentos((anterior) =>
      anterior.map((item, i) =>
        i === index ? { ...item, [campo]: valor } : item
      )
    );
  }

  // Salvamento temporário

async function handleSalvar() {
  let etapa = "Iniciando cadastro";

  try {
    const textoOuNull = (valor: string) =>
      valor.trim() === "" ? null : valor.trim();

    const numeroOuNull = (valor: string) =>
      valor.trim() === "" ? null : Number(valor);

    // 1. CADASTRAR OU ATUALIZAR EMPRESA
    etapa = "Cadastrando empresa";

    const dadosEmpresa = {
      cnpj: textoOuNull(form.cnpj),
      nome_contratada: textoOuNull(form.nome_contratada),
      email: textoOuNull(form.email_empresa),
      telefone: textoOuNull(form.telefone),
      endereco: textoOuNull(form.endereco_empresa),
      natureza_contrato: textoOuNull(form.natureza_contrato),
    };

    let idEmpresa: number;

    if (dadosEmpresa.cnpj) {
      const { data: empresaExistente, error: erroBusca } = await supabase
        .from("empresa")
        .select("id_empresa")
        .eq("cnpj", dadosEmpresa.cnpj)
        .maybeSingle();

      if (erroBusca) throw erroBusca;

      if (empresaExistente) {
        const { data, error } = await supabase
          .from("empresa")
          .update(dadosEmpresa)
          .eq("id_empresa", empresaExistente.id_empresa)
          .select("id_empresa")
          .single();

        if (error) throw error;

        idEmpresa = data.id_empresa;
      } else {
        const { data, error } = await supabase
          .from("empresa")
          .insert(dadosEmpresa)
          .select("id_empresa")
          .single();

        if (error) throw error;

        idEmpresa = data.id_empresa;
      }
    } else {
      const { data, error } = await supabase
        .from("empresa")
        .insert(dadosEmpresa)
        .select("id_empresa")
        .single();

      if (error) throw error;

      idEmpresa = data.id_empresa;
    }

    // 2. CADASTRAR VERBA
    etapa = "Cadastrando verba";

    let idVerba: number | null = null;

    const temVerba =
      form.verba_descricao.trim() !== "" ||
      form.verba_valor_disponivel.trim() !== "" ||
      form.verba_valor_utilizado.trim() !== "";

    if (temVerba) {
      const { data, error } = await supabase
        .from("verba")
        .insert({
          descricao: textoOuNull(form.verba_descricao),
          valor_disponivel: numeroOuNull(form.verba_valor_disponivel),
          valor_utilizado: numeroOuNull(form.verba_valor_utilizado),
        })
        .select("id_verba")
        .single();

      if (error) throw error;

      idVerba = data.id_verba;
    }

    // 3. CADASTRAR CONTRATO
    etapa = "Cadastrando contrato";

    const dadosContrato = {
      id_empresa: idEmpresa,
      id_verba: idVerba,

      objeto_contrato: textoOuNull(form.objeto_contrato),
      identificador_contrato: textoOuNull(form.identificador_contrato),
      representante_legal: textoOuNull(form.representante_legal),

      vigencia: numeroOuNull(form.vigencia),
      data_inicio: textoOuNull(form.data_inicio),
      data_fim: textoOuNull(form.data_fim),
      prorrogavel:
        form.prorrogavel === ""
          ? null
          : form.prorrogavel === "true",
      prazo_restante: numeroOuNull(form.prazo_restante),
      data_celebracao: textoOuNull(form.data_celebracao),

      id_situacao_contrato: numeroOuNull(form.id_situacao_contrato),
      situacao_gov: textoOuNull(form.situacao_gov),

      numero_processo_celebracao: textoOuNull(form.numero_processo_celebracao),
      nota_empenho: textoOuNull(form.nota_empenho),
      dados_licitacao: textoOuNull(form.dados_licitacao),
      processo_gestao: textoOuNull(form.processo_gestao),
      portaria_fiscalizacao: textoOuNull(form.portaria_fiscalizacao),
      link_pasta_gestao: textoOuNull(form.link_pasta_gestao),
      link_processo_eletronico: textoOuNull(form.link_processo_eletronico),
      link_pregao_srp: textoOuNull(form.link_pregao_srp),

      fiscal_titular: textoOuNull(form.fiscal_titular),
      fiscal_substituto: textoOuNull(form.fiscal_substituto),
      gestor_titular: textoOuNull(form.gestor_titular),
      gestor_substituto: textoOuNull(form.gestor_substituto),

      valor_global: numeroOuNull(form.valor_global),
      valor_mensal: numeroOuNull(form.valor_mensal),
      fonte_recurso: textoOuNull(form.fonte_recurso),
      natureza_despesa: textoOuNull(form.natureza_despesa),
      numero_evento: textoOuNull(form.numero_evento),
      uasg: textoOuNull(form.uasg),
      plano_interno: textoOuNull(form.plano_interno),
      programa_trabalho: textoOuNull(form.programa_trabalho),
      conta_vinculada: textoOuNull(form.conta_vinculada),

      cpf_representante: textoOuNull(form.cpf_representante),
      rg_representante: textoOuNull(form.rg_representante),
      email_contato: textoOuNull(form.email_contato),
      endereco_postal: textoOuNull(form.endereco_postal),
    };

    const { data: contrato, error: erroContrato } = await supabase
      .from("contrato")
      .insert(dadosContrato)
      .select("id_contrato")
      .single();

    if (erroContrato) throw erroContrato;

    const idContrato = contrato.id_contrato;

    // 4. CADASTRAR PRORROGAÇÕES
    etapa = "Cadastrando prorrogações";

    const prorrogacoesPreenchidas = prorrogacoes
      .filter(
        (item) =>
          item.novo_prazo.trim() !== "" ||
          item.novo_valor.trim() !== ""
      )
      .map((item) => ({
        id_contrato: idContrato,
        novo_prazo: numeroOuNull(item.novo_prazo),
        novo_valor: numeroOuNull(item.novo_valor),
      }));

    if (prorrogacoesPreenchidas.length > 0) {
      const { error } = await supabase
        .from("prorrogacao")
        .insert(prorrogacoesPreenchidas);

      if (error) throw error;
    }

    // 5. CADASTRAR PAGAMENTOS
    etapa = "Cadastrando pagamentos";

    const pagamentosPreenchidos = pagamentos
      .filter(
        (item) =>
          item.descricao.trim() !== "" ||
          item.valor_pago.trim() !== ""
      )
      .map((item) => ({
        id_contrato: idContrato,
        descricao: textoOuNull(item.descricao),
        valor_pago: numeroOuNull(item.valor_pago),
      }));

    if (pagamentosPreenchidos.length > 0) {
      const { error } = await supabase
        .from("pagamento")
        .insert(pagamentosPreenchidos);

      if (error) throw error;
    }

    // CADASTRO CONCLUÍDO
    alert("Contrato cadastrado com sucesso!");

    setForm(estadoInicial);
    setProrrogacoes([{ novo_prazo: "", novo_valor: "" }]);
    setPagamentos([{ descricao: "", valor_pago: "" }]);

  } catch (error: unknown) {
    console.error("Etapa que falhou:", etapa);
    console.error("Erro completo:", error);

    const erro = error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };

    console.error("Detalhes do erro:", {
      mensagem: erro?.message,
      detalhes: erro?.details,
      dica: erro?.hint,
      codigo: erro?.code,
    });

    alert(
      `Erro na etapa: ${etapa}\n\n` +
      `Mensagem: ${erro?.message || "Sem mensagem"}\n` +
      `Detalhes: ${erro?.details || "Sem detalhes"}\n` +
      `Código: ${erro?.code || "Não informado"}`
    );
  }
}


  return (
    <main className={styles.container}>
     <div className={styles.cabecalho}>
  <Link href="/inicial" className={styles.botaoVoltar}>
    <ArrowLeftIcon size={22} />
  </Link>

  <div className={styles.areaTitulo}>
    <h2>Novo Contrato</h2>
    <h4 className={styles.subtitulo}>
      Preencha as informações do novo contrato
    </h4>
  </div>
</div>

      <div className={styles.gradeCartoes}>

        {/* IDENTIFICAÇÃO DO CONTRATO */}
        <Cartao
          titulo="Identificação do Contrato"
          icone={<FileTextIcon size={25} />}
          {...cartao("identificacao")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Nome da Contratada" {...campo("nome_contratada")} />
            <Campo label="Objeto do Contrato" {...campo("objeto_contrato")} />
            <Campo label="Identificador do Contrato" {...campo("identificador_contrato")} />
            <Campo label="Representante Legal" {...campo("representante_legal")} />

            <Campo
              label="Vigência (meses)"
              type="number"
              {...campo("vigencia")}
            />

            <Campo label="Data de Início" type="date" {...campo("data_inicio")} />
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
              label="Prazo Restante (meses)"
              type="number"
              {...campo("prazo_restante")}
            />

            <Campo
              label="Data de Celebração"
              type="date"
              {...campo("data_celebracao")}
            />
          </div>
        </Cartao>

        {/* EMPRESA */}
        <Cartao
          titulo="Empresa"
          icone={<BriefcaseIcon size={25} />}
          {...cartao("empresa")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="CNPJ" {...campo("cnpj")} />
            <Campo label="E-mail" type="email" {...campo("email_empresa")} />
            <Campo label="Telefone" type="tel" {...campo("telefone")} />
            <Campo label="Endereço" {...campo("endereco_empresa")} />
            <Campo label="Natureza do Contrato" {...campo("natureza_contrato")} />
          </div>
        </Cartao>

        {/* CLASSIFICAÇÃO */}
        <Cartao
          titulo="Classificação"
          icone={<BriefcaseIcon size={25} />}
          {...cartao("classificacao")}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Situação do Contrato"
              {...campo("id_situacao_contrato")}
            />
            <Campo label="Situação no Gov" {...campo("situacao_gov")} />
            <Campo
              label="Natureza do contrato"
              {...campo("natureza_contrato")}
            />
          </div>
        </Cartao>

        {/* PROCESSOS E DOCUMENTOS */}
        <Cartao
          titulo="Processos e Documentos"
          icone={<LinkIcon size={25} />}
          {...cartao("processos")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Nº Processo de Celebração" {...campo("numero_processo_celebracao")} />
            <Campo label="Nota de Empenho" {...campo("nota_empenho")} />
            <Campo label="Dados da Licitação" {...campo("dados_licitacao")} />
            <Campo label="Processo de Gestão" {...campo("processo_gestao")} />
            <Campo label="Portaria de Fiscalização" {...campo("portaria_fiscalizacao")} />

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

        {/* FISCALIZAÇÃO E GESTÃO */}
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

        {/* VALORES E ORÇAMENTO */}
        <Cartao
          titulo="Valores e Orçamento"
          icone={<CurrencyDollarIcon size={25} />}
          {...cartao("valores")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="Valor Global" type="number" {...campo("valor_global")} />
            <Campo label="Valor Mensal" type="number" {...campo("valor_mensal")} />
            <Campo label="Fonte de Recurso" {...campo("fonte_recurso")} />
            <Campo label="Natureza da Despesa" {...campo("natureza_despesa")} />
            <Campo label="Número do Evento" {...campo("numero_evento")} />
            <Campo label="UASG" {...campo("uasg")} />
            <Campo label="Plano Interno" {...campo("plano_interno")} />
            <Campo label="Programa de Trabalho" {...campo("programa_trabalho")} />
            <Campo label="Conta Vinculada" {...campo("conta_vinculada")} />
          </div>
        </Cartao>

        {/* VERBA */}
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

        {/* PRORROGAÇÕES */}
        <Cartao
          titulo="Prorrogações"
          icone={<CalendarIcon size={25} />}
          {...cartao("prorrogacoes")}
        >
          <div className={styles.listaRelacionados}>
            {prorrogacoes.map((item, index) => (
              <div key={index} className={styles.itemRelacionado}>
                <h4>Prorrogação {index + 1}</h4>

                <div className={styles.grupoCampos}>
                  <Campo
                    label="Novo prazo (meses)"
                    name={`novo_prazo_${index}`}
                    value={item.novo_prazo}
                    type="number"
                    onChange={(e) =>
                      atualizarProrrogacao(index, "novo_prazo", e.target.value)
                    }
                  />

                  <Campo
                    label="Novo valor"
                    name={`novo_valor_${index}`}
                    value={item.novo_valor}
                    type="number"
                    onChange={(e) =>
                      atualizarProrrogacao(index, "novo_valor", e.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  className={styles.botaoRemover}
                  onClick={() =>
                    setProrrogacoes((anterior) =>
                      anterior.filter((_, i) => i !== index)
                    )
                  }
                >
                  Remover prorrogação
                </button>
              </div>
            ))}
          </div>

          <div className={styles.acoesProrrogacao}>
            <button
              type="button"
              className={styles.botaoAdicionar}
              onClick={() =>
                setProrrogacoes((anterior) => [
                  ...anterior,
                  { novo_prazo: "", novo_valor: "" },
                ])
              }
            >
              + Adicionar prorrogação
            </button>
          </div>
        </Cartao>

        {/* PAGAMENTOS */}
<Cartao
  titulo="Pagamentos"
  icone={<CurrencyDollarIcon size={25} />}
  {...cartao("pagamentos")}
>
  <div className={styles.listaRelacionados}>
    {pagamentos.map((item, index) => (
      <div key={index} className={styles.itemPagamento}>
        <div className={styles.grupoCampos}>
          <Campo
            label="Descrição"
            name={`descricao_pagamento_${index}`}
            value={item.descricao}
            onChange={(e) =>
              atualizarPagamento(index, "descricao", e.target.value)
            }
          />

          <Campo
            label="Valor pago"
            name={`valor_pago_${index}`}
            value={item.valor_pago}
            type="number"
            onChange={(e) =>
              atualizarPagamento(index, "valor_pago", e.target.value)
            }
          />
        </div>
      </div>
    ))}
  </div>
</Cartao>

        {/* REPRESENTANTE LEGAL */}
        <Cartao
          titulo="Representante Legal"
          icone={<UserIcon size={25} />}
          {...cartao("representante")}
        >
          <div className={styles.grupoCampos}>
            <Campo label="CPF" {...campo("cpf_representante")} />
            <Campo label="RG" {...campo("rg_representante")} />
            <Campo label="E-mail" type="email" {...campo("email_contato")} />
            <Campo label="Endereço Postal" {...campo("endereco_postal")} />
          </div>
        </Cartao>

        {/* BOTÃO SALVAR */}
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
