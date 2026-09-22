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

  numero_processo_celebracao: string | null;
  prazo_restante: number | null;
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
}

interface PropsPagina {
  params: Promise<{ id: string }>;
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
            nome_fantasia
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
          Voltar para Contratos
        </Link>

        <div className={styles.areaTitulo}>
          <h2>
            Detalhes do Contrato #{contrato.identificador_contrato}
          </h2>

          <span className={styles.tagStatus}>
            {contrato.situacao_contrato?.situacao ||
              contrato.situacao_gov ||
              "Não informado"}
          </span>
        </div>
      </div>

      <div className={styles.gradeCartoes}>

        {/* OBJETO DO CONTRATO */}
        <section
          className={`${styles.cartao} ${styles.larguraTotal}`}
        >
          <div className={styles.cabecalhoCartao}>
            <FileTextIcon size={20} />
            <h3>Objeto do Contrato</h3>
          </div>

          <div className={styles.campoUnico}>
            <textarea
              value={contrato.objeto_contrato ?? ""}
              readOnly
              rows={3}
            />
          </div>
        </section>

        {/* INFORMAÇÕES GERAIS */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <BriefcaseIcon size={20} />
            <h3>Informações Gerais e Vigência</h3>
          </div>

          <div className={styles.grupoCampos}>

            <div className={styles.campo}>
              <label>Natureza do Contrato</label>
              <input
                type="text"
                value={contrato.natureza_contrato ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Data de Início</label>
              <input
                type="text"
                value={contrato.data_inicio ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Vigência</label>
              <input
                type="text"
                value={contrato.vigencia ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Prazo Restante</label>
              <input
                type="text"
                value={contrato.prazo_restante ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Data de Celebração</label>
              <input
                type="text"
                value={contrato.data_celebracao ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Portaria de Fiscalização</label>
              <input
                type="text"
                value={contrato.portaria_fiscalizacao ?? ""}
                readOnly
              />
            </div>

          </div>
        </section>

        {/* FINANCEIRO */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <CurrencyDollarIcon size={20} />
            <h3>Financeiro e Orçamento</h3>
          </div>

          <div className={styles.grupoCampos}>

            <div className={styles.campo}>
              <label>Valor Global</label>
              <input
                type="text"
                value={contrato.valor_global ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Valor Mensal</label>
              <input
                type="text"
                value={contrato.valor_mensal ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Nota de Empenho</label>
              <input
                type="text"
                value={contrato.nota_empenho ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Fonte de Recurso</label>
              <input
                type="text"
                value={contrato.fonte_recurso ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Natureza da Despesa</label>
              <input
                type="text"
                value={contrato.natureza_despesa ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Conta Vinculada</label>
              <input
                type="text"
                value={contrato.conta_vinculada ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Plano Interno</label>
              <input
                type="text"
                value={contrato.plano_interno ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Programa de Trabalho</label>
              <input
                type="text"
                value={contrato.programa_trabalho ?? ""}
                readOnly
              />
            </div>

          </div>
        </section>

        {/* EQUIPE */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <UserIcon size={20} />
            <h3>Equipe de Gestão e Fiscalização</h3>
          </div>

          <div className={styles.grupoCampos}>

            <div className={styles.campo}>
              <label>Gestor Titular</label>
              <input
                type="text"
                value={contrato.gestor_titular ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Gestor Substituto</label>
              <input
                type="text"
                value={contrato.gestor_substituto ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Fiscal Titular</label>
              <input
                type="text"
                value={contrato.fiscal_titular ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Fiscal Substituto</label>
              <input
                type="text"
                value={contrato.fiscal_substituto ?? ""}
                readOnly
              />
            </div>

          </div>
        </section>

        {/* REPRESENTANTE */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <UserIcon size={20} />
            <h3>Representante e Contato</h3>
          </div>

          <div className={styles.grupoCampos}>

            <div className={styles.campo}>
              <label>Representante Legal</label>
              <input
                type="text"
                value={contrato.representante_legal ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>CPF do Representante</label>
              <input
                type="text"
                value={contrato.cpf_representante ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>RG do Representante</label>
              <input
                type="text"
                value={contrato.rg_representante ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>E-mail de Contato</label>
              <input
                type="text"
                value={contrato.email_contato ?? ""}
                readOnly
              />
            </div>

            <div
              className={`${styles.campo} ${styles.linhaInteira}`}
            >
              <label>Endereço Postal</label>
              <input
                type="text"
                value={contrato.endereco_postal ?? ""}
                readOnly
              />
            </div>

          </div>
        </section>

        {/* LICITAÇÃO, PROCESSOS E LINKS */}
        <section
          className={`${styles.cartao} ${styles.larguraTotal}`}
        >
          <div className={styles.cabecalhoCartao}>
            <LinkIcon size={20} />
            <h3>Licitação, Processos e Links</h3>
          </div>

          <div className={styles.grupoCamposTresColunas}>

            <div className={styles.campo}>
              <label>Dados da Licitação</label>
              <input
                type="text"
                value={contrato.dados_licitacao ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>UASG</label>
              <input
                type="text"
                value={contrato.uasg ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Número do Evento</label>
              <input
                type="text"
                value={contrato.numero_evento ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Nº Processo Celebração</label>
              <input
                type="text"
                value={contrato.numero_processo_celebracao ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Processo de Gestão</label>
              <input
                type="text"
                value={contrato.processo_gestao ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Link Processo Eletrônico</label>
              <input
                type="text"
                value={contrato.link_processo_eletronico ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Link Pasta de Gestão</label>
              <input
                type="text"
                value={contrato.link_pasta_gestao ?? ""}
                readOnly
              />
            </div>

            <div className={styles.campo}>
              <label>Link Pregão SRP</label>
              <input
                type="text"
                value={contrato.link_pregao_srp ?? ""}
                readOnly
              />
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}