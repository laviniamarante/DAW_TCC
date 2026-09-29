"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  FileTextIcon,
  CurrencyDollarIcon,
  UserIcon,
  BriefcaseIcon,
  LinkIcon,
} from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

interface Contrato {
  id_contrato: number;
  identificador_contrato: string;

  vigencia: number | null;
  data_inicio: string | null;
  data_fim: string | null;
  prorrogavel: boolean | null;
  prazo_restante: number | null;

  numero_processo_celebracao: string | null;
  nota_empenho: string | null;
  natureza_contrato: string | null;
  portaria_fiscalizacao: string | null;
  objeto_contrato: string | null;

  fiscal_substituto: string | null;
  dados_licitacao: string | null;
  processo_gestao: string | null;
  data_celebracao: string | null;
  fonte_recurso: string | null;
  natureza_despesa: string | null;
  numero_evento: string | null;

  link_pasta_gestao: string | null;
  fiscal_titular: string | null;
  situacao_gov: string | null;
  endereco_postal: string | null;

  valor_global: number | null;
  uasg: string | null;
  valor_mensal: number | null;

  cpf_representante: string | null;
  conta_vinculada: string | null;
  link_processo_eletronico: string | null;

  gestor_titular: string | null;
  plano_interno: string | null;
  rg_representante: string | null;
  programa_trabalho: string | null;

  representante_legal: string | null;
  gestor_substituto: string | null;
  email_contato: string | null;
  link_pregao_srp: string | null;

  empresa: {
    razao_social: string;
    nome_fantasia: string | null;
    cnpj: string | null;
    email: string | null;
    telefone: string | null;
    endereco: string | null;
  } | null;

  categoria: {
    nome: string;
  } | null;

  verba: {
    descricao: string;
    valor_disponivel: number | null;
    valor_utilizado: number | null;
  } | null;

  situacao_contrato: {
    situacao: string;
  } | null;

  prorrogacao: {
    id_prorrogacao: number;
    novo_prazo: number | null;
    novo_valor: number | null;
  }[] | null;

  pagamento: {
    id_pagamento: number;
    descricao: string | null;
    valor_pago: number | null;
  }[] | null;

  notificacao: {
    id_notificacao: number;
    titulo: string | null;
    descricao: string | null;
    tempo_envio: number | null;
    data_criacao: string | null;
    tipo_notificacao: {
      tipo: string;
    } | null;
  }[] | null;
}

interface PropsPagina {
  params: Promise<{ id: string }>;
}

/* CAMPO REUTILIZÁVEL */
function Campo({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string | number | boolean | null | undefined;
  type?: string;
}) {
  return (
    <div className={styles.campo}>
      <label>{label}</label>


      <input
        type={type}
        defaultValue={value == null ? "" : String(value)}
      />
    </div>
  );
}

/* CARD REUTILIZÁVEL */
function Cartao({
  titulo,
  icone,
  children,
  larguraTotal = false,
}: {
  titulo: string;
  icone: React.ReactNode;
  children: React.ReactNode;
  larguraTotal?: boolean;
}) {
  return (
    <section
      className={`${styles.cartao} ${
        larguraTotal ? styles.larguraTotal : ""
      }`}
    >
      <div className={styles.cabecalhoCartao}>
        {icone}
        <h3>{titulo}</h3>
      </div>

      {children}
    </section>
  );
}

export default function PaginaDetalhesContrato({
  params,
}: PropsPagina) {
  const { id } = React.use(params);

  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarContrato() {
      const { data, error } = await supabase
        .from("contrato")
        .select(`
          *,
          empresa (
            razao_social,
            nome_fantasia,
            cnpj,
            email,
            telefone,
            endereco
          ),
          categoria (
            nome
          ),
          verba (
            descricao,
            valor_disponivel,
            valor_utilizado
          ),
          situacao_contrato (
            situacao
          ),
          prorrogacao (
            id_prorrogacao,
            novo_prazo,
            novo_valor
          ),
          pagamento (
            id_pagamento,
            descricao,
            valor_pago
          ),
          notificacao (
            id_notificacao,
            titulo,
            descricao,
            tempo_envio,
            data_criacao,
            tipo_notificacao (
              tipo
            )
          )
        `)
        .eq("id_contrato", Number(id))
        .single();

      if (error) {
        console.error("Erro ao buscar contrato:", error);
        setContrato(null);
      } else {
        setContrato(data);
      }

      setCarregando(false);
    }

    buscarContrato();
  }, [id]);

  if (carregando) {
    return (
      <main className={styles.containerNaoEncontrado}>
        <h2>Carregando contrato...</h2>
      </main>
    );
  }

  if (!contrato) {
    return (
      <main className={styles.containerNaoEncontrado}>
        <h2>Contrato não encontrado</h2>

        <Link href="/contratos">
          Voltar para a lista
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>

      {/* CABEÇALHO */}
      <div className={styles.cabecalho}>
        <Link href="/contratos" className={styles.botaoVoltar}>
          <ArrowLeftIcon size={20} />
        </Link>

        <div className={styles.areaTitulo}>
          <h2>
            Detalhes do Contrato
          </h2>
         <h4 className={styles.subtitulo}>Visualize todas as informações do contrato</h4>
         
        </div>
      </div>

      <div className={styles.gradeCartoes}>

        {/* 1. IDENTIFICAÇÃO DO CONTRATO */}
        <Cartao
          titulo="Identificação do Contrato"
          icone={<FileTextIcon size={25} />}
          larguraTotal
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Objeto do Contrato"
              value={contrato.objeto_contrato}
            />

            <Campo
              label="Identificador do Contrato"
              value={contrato.identificador_contrato}
            />

            <Campo
              label="Vigência"
              value={contrato.vigencia}
            />

            <Campo
              label="Data de Início"
              value={contrato.data_inicio}
            />

            <Campo
              label="Data de Fim"
              value={contrato.data_fim}
            />

            <Campo
              label="Prorrogável"
              value={
                contrato.prorrogavel === null
                  ? ""
                  : contrato.prorrogavel
                    ? "Sim"
                    : "Não"
              }
            />

            <Campo
              label="Prazo Restante"
              value={contrato.prazo_restante}
            />

            <Campo
              label="Data de Celebração"
              value={contrato.data_celebracao}
            />

            <Campo
              label="Representante Legal"
              value={contrato.representante_legal}
            />
          </div>
        </Cartao>

        {/* 2. EMPRESA */}
        <Cartao
          titulo="Empresa"
          icone={<BriefcaseIcon size={25} />}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Razão Social"
              value={contrato.empresa?.razao_social}
            />

            <Campo
              label="Nome Fantasia"
              value={contrato.empresa?.nome_fantasia}
            />

            <Campo
              label="CNPJ"
              value={contrato.empresa?.cnpj}
            />

            <Campo
              label="E-mail"
              value={contrato.empresa?.email}
            />

            <Campo
              label="Telefone"
              value={contrato.empresa?.telefone}
            />

            <Campo
              label="Endereço"
              value={contrato.empresa?.endereco}
            />
          </div>
        </Cartao>

        {/* 3. CLASSIFICAÇÃO */}
        <Cartao
          titulo="Classificação"
          icone={<BriefcaseIcon size={25} />}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Categoria"
              value={contrato.categoria?.nome}
            />

            <Campo
              label="Situação do Contrato"
              value={contrato.situacao_contrato?.situacao}
            />

            <Campo
              label="Situação no Gov"
              value={contrato.situacao_gov}
            />

            <Campo
              label="Natureza do Contrato"
              value={contrato.natureza_contrato}
            />
          </div>
        </Cartao>

        {/* 4. PROCESSOS E DOCUMENTOS */}
        <Cartao
          titulo="Processos e Documentos"
          icone={<LinkIcon size={25} />}
          larguraTotal
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Nº Processo de Celebração"
              value={contrato.numero_processo_celebracao}
            />

            <Campo
              label="Nota de Empenho"
              value={contrato.nota_empenho}
            />

            <Campo
              label="Dados da Licitação"
              value={contrato.dados_licitacao}
            />

            <Campo
              label="Processo de Gestão"
              value={contrato.processo_gestao}
            />

            <Campo
              label="Portaria de Fiscalização"
              value={contrato.portaria_fiscalizacao}
            />

            <Campo
              label="Link da Pasta de Gestão"
              value={contrato.link_pasta_gestao}
              type="url"
            />

            <Campo
              label="Link do Processo Eletrônico"
              value={contrato.link_processo_eletronico}
              type="url"
            />

            <Campo
              label="Link do Pregão SRP"
              value={contrato.link_pregao_srp}
              type="url"
            />
          </div>
        </Cartao>

        {/* 5. FISCALIZAÇÃO E GESTÃO */}
        <Cartao
          titulo="Fiscalização e Gestão"
          icone={<UserIcon size={25} />}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Fiscal Titular"
              value={contrato.fiscal_titular}
            />

            <Campo
              label="Fiscal Substituto"
              value={contrato.fiscal_substituto}
            />

            <Campo
              label="Gestor Titular"
              value={contrato.gestor_titular}
            />

            <Campo
              label="Gestor Substituto"
              value={contrato.gestor_substituto}
            />
          </div>
        </Cartao>

        {/* 6. VALORES E ORÇAMENTO */}
        <Cartao
          titulo="Valores e Orçamento"
          icone={<CurrencyDollarIcon size={25} />}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Valor Global"
              value={contrato.valor_global}
            />

            <Campo
              label="Valor Mensal"
              value={contrato.valor_mensal}
            />

            <Campo
              label="Fonte de Recurso"
              value={contrato.fonte_recurso}
            />

            <Campo
              label="Natureza da Despesa"
              value={contrato.natureza_despesa}
            />

            <Campo
              label="Número do Evento"
              value={contrato.numero_evento}
            />

            <Campo
              label="UASG"
              value={contrato.uasg}
            />

            <Campo
              label="Plano Interno"
              value={contrato.plano_interno}
            />

            <Campo
              label="Programa de Trabalho"
              value={contrato.programa_trabalho}
            />

            <Campo
              label="Conta Vinculada"
              value={contrato.conta_vinculada}
            />
          </div>
        </Cartao>

        {/* 7. VERBA */}
        <Cartao
          titulo="Verba"
          icone={<CurrencyDollarIcon size={25} />}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Descrição"
              value={contrato.verba?.descricao}
            />

            <Campo
              label="Valor Disponível"
              value={contrato.verba?.valor_disponivel}
            />

            <Campo
              label="Valor Utilizado"
              value={contrato.verba?.valor_utilizado}
            />
          </div>
        </Cartao>

        {/* 8. REPRESENTANTE LEGAL */}
        <Cartao
          titulo="Representante Legal"
          icone={<UserIcon size={25} />}
        >
          <div className={styles.grupoCampos}>
            <Campo
              label="Representante Legal"
              value={contrato.representante_legal}
            />

            <Campo
              label="CPF"
              value={contrato.cpf_representante}
            />

            <Campo
              label="RG"
              value={contrato.rg_representante}
            />

            <Campo
              label="E-mail"
              value={contrato.email_contato}
            />

            <Campo
              label="Endereço Postal"
              value={contrato.endereco_postal}
            />
          </div>
        </Cartao>

        {/* 9. PRORROGAÇÕES */}
        <Cartao
          titulo="Prorrogações"
          icone={<FileTextIcon size={25} />}
          larguraTotal
        >
          <div className={styles.grupoCampos}>
            {contrato.prorrogacao &&
            contrato.prorrogacao.length > 0 ? (
              contrato.prorrogacao.map((item) => (
                <React.Fragment key={item.id_prorrogacao}>
                  <Campo
                    label= "Novo Prazo"
                    value={item.novo_prazo}
                  />

                  <Campo
                    label= "Novo Valor"
                    value={item.novo_valor}
                  />
                </React.Fragment>
              ))
            ) : (
              <p>Nenhuma prorrogação cadastrada.</p>
            )}
          </div>
        </Cartao>

        {/* 10. PAGAMENTOS */}
        <Cartao
          titulo="Pagamentos"
          icone={<CurrencyDollarIcon size={25} />}
          larguraTotal
        >
          <div className={styles.grupoCampos}>
            {contrato.pagamento &&
            contrato.pagamento.length > 0 ? (
              contrato.pagamento.map((item) => (
                <React.Fragment key={item.id_pagamento}>
                  <Campo
                    label="Descrição"
                    value={item.descricao}
                  />

                  <Campo
                    label= "Valor Pago"
                    value={item.valor_pago}
                  />
                </React.Fragment>
              ))
            ) : (
              <p>Nenhum pagamento cadastrado.</p>
            )}
          </div>
        </Cartao>

        {/* 11. NOTIFICAÇÕES */}
        <Cartao
          titulo="Notificações"
          icone={<FileTextIcon size={25} />}
          larguraTotal
        >
          <div className={styles.grupoCampos}>
            {contrato.notificacao &&
            contrato.notificacao.length > 0 ? (
              contrato.notificacao.map((item) => (
                <React.Fragment key={item.id_notificacao}>
                  <Campo
                    label= "Tipo de Notificação"
                    value={item.tipo_notificacao?.tipo}
                  />

                  <Campo
                    label= "Título"
                    value={item.titulo}
                  />

                  <Campo
                    label= "Descrição"
                    value={item.descricao}
                  />

                  <Campo
                    label= "Tempo de Envio"
                    value={item.tempo_envio}
                  />

                  <Campo
                    label= "Data de Criação"
                    value={item.data_criacao}
                  />
                </React.Fragment>
              ))
            ) : (
              <p>Nenhuma notificação cadastrada.</p>
            )}
          </div>
        </Cartao>

          <button className={styles.botaoSalvar}> Salvar Alterações </button>
      </div>
    </main>
  );
}