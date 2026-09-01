"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  CurrencyDollar,
  User,
  Briefcase,
  Link as LinkIcon,
} from "@phosphor-icons/react";
import { CONTRATOS_DETALHADOS_MOCK } from "@/db/contratosMock";
import styles from "./page.module.css";

interface PropsPagina {
  params: Promise<{ id: string }>;
}

export default function PaginaDetalhesContrato({ params }: PropsPagina) {
  const { id } = React.use(params);

  // Busca o contrato no Mock pelo ID da URL
  const contrato = CONTRATOS_DETALHADOS_MOCK.find(
    (item) => item.id_contrato === Number(id),
  );

  if (!contrato) {
    return (
      <main className={styles.containerNaoEncontrado}>
        <h2>Contrato não encontrado</h2>
        <Link href="/contratos">Voltar para a lista</Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* Cabeçalho da Página */}
      <div className={styles.cabecalho}>
        <Link href="/contratos" className={styles.botaoVoltar}>
          <ArrowLeft size={20} /> Voltar para Contratos
        </Link>
        <div className={styles.areaTitulo}>
          <h2>Detalhes do Contrato #{contrato.id_contrato}</h2>
          <span className={styles.tagStatus}>{contrato.situacao_gov}</span>
        </div>
      </div>

      {/* Grade com os Quadradinhos (Cards Temáticos) */}
      <div className={styles.gradeCartoes}>
        {/* 1. Objeto do Contrato */}
        <section className={`${styles.cartao} ${styles.larguraTotal}`}>
          <div className={styles.cabecalhoCartao}>
            <FileText size={20} />
            <h3>Objeto do Contrato</h3>
          </div>
          <div className={styles.campoUnico}>
            <textarea value={contrato.objeto_contrato} readOnly rows={3} />
          </div>
        </section>

        {/* 2. Informações Gerais e Vigência */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <Briefcase size={20} />
            <h3>Informações Gerais e Vigência</h3>
          </div>
          <div className={styles.grupoCampos}>
            <div className={styles.campo}>
              <label>Natureza do Contrato</label>
              <input type="text" value={contrato.natureza_contrato} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Data de Início</label>
              <input type="text" value={contrato.data_inicio} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Vigência</label>
              <input type="text" value={contrato.vigencia} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Prazo Restante</label>
              <input type="text" value={contrato.prazo_restante} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Data de Celebração</label>
              <input type="text" value={contrato.data_celebracao} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Portaria de Fiscalização</label>
              <input
                type="text"
                value={contrato.portaria_fiscalizacao}
                readOnly
              />
            </div>
          </div>
        </section>

        {/* 3. Financeiro e Orçamento */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <CurrencyDollar size={20} />
            <h3>Financeiro e Orçamento</h3>
          </div>
          <div className={styles.grupoCampos}>
            <div className={styles.campo}>
              <label>Valor Global</label>
              <input type="text" value={contrato.valor_global} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Valor Mensal</label>
              <input type="text" value={contrato.valor_mensal} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Nota de Empenho</label>
              <input type="text" value={contrato.nota_empenho} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Fonte de Recurso</label>
              <input type="text" value={contrato.fonte_recurso} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Natureza da Despesa</label>
              <input type="text" value={contrato.natureza_despesa} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Conta Vinculada</label>
              <input type="text" value={contrato.conta_vinculada} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Plano Interno</label>
              <input type="text" value={contrato.plano_interno} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Programa de Trabalho</label>
              <input type="text" value={contrato.programa_trabalho} readOnly />
            </div>
          </div>
        </section>

        {/* 4. Gestão e Fiscalização */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <User size={20} />
            <h3>Equipe de Gestão e Fiscalização</h3>
          </div>
          <div className={styles.grupoCampos}>
            <div className={styles.campo}>
              <label>Gestor Titular</label>
              <input type="text" value={contrato.gestor_titular} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Gestor Substituto</label>
              <input type="text" value={contrato.gestor_substituto} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Fiscal Titular</label>
              <input type="text" value={contrato.fiscal_titular} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Fiscal Substituto</label>
              <input type="text" value={contrato.fiscal_substituto} readOnly />
            </div>
          </div>
        </section>

        {/* 5. Representante e Contato */}
        <section className={styles.cartao}>
          <div className={styles.cabecalhoCartao}>
            <User size={20} />
            <h3>Representante e Contato</h3>
          </div>
          <div className={styles.grupoCampos}>
            <div className={styles.campo}>
              <label>Representante Legal</label>
              <input
                type="text"
                value={contrato.representante_legal}
                readOnly
              />
            </div>
            <div className={styles.campo}>
              <label>CPF do Representante</label>
              <input type="text" value={contrato.cpf_representante} readOnly />
            </div>
            <div className={styles.campo}>
              <label>RG do Representante</label>
              <input type="text" value={contrato.rg_representante} readOnly />
            </div>
            <div className={styles.campo}>
              <label>E-mail de Contato</label>
              <input type="text" value={contrato.email_contato} readOnly />
            </div>
            <div className={`${styles.campo} ${styles.linhaInteira}`}>
              <label>Endereço Postal</label>
              <input type="text" value={contrato.endereco_postal} readOnly />
            </div>
          </div>
        </section>

        {/* 6. Processos, Licitação e Links */}
        <section className={`${styles.cartao} ${styles.larguraTotal}`}>
          <div className={styles.cabecalhoCartao}>
            <LinkIcon size={20} />
            <h3>Licitação, Processos e Links</h3>
          </div>
          <div className={styles.grupoCamposTresColunas}>
            <div className={styles.campo}>
              <label>Dados da Licitação</label>
              <input type="text" value={contrato.dados_licitacao} readOnly />
            </div>
            <div className={styles.campo}>
              <label>UASG</label>
              <input type="text" value={contrato.UASG} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Número do Evento</label>
              <input type="text" value={contrato.numero_evento} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Nº Processo Celebração</label>
              <input
                type="text"
                value={contrato.numero_processo_celebracao}
                readOnly
              />
            </div>
            <div className={styles.campo}>
              <label>Processo de Gestão</label>
              <input type="text" value={contrato.processo_gestao} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Link Processo Eletrônico</label>
              <input
                type="text"
                value={contrato.link_processo_eletronico}
                readOnly
              />
            </div>
            <div className={styles.campo}>
              <label>Link Pasta de Gestão</label>
              <input type="text" value={contrato.link_pasta_gestao} readOnly />
            </div>
            <div className={styles.campo}>
              <label>Link Pregão SRP</label>
              <input type="text" value={contrato.link_pregao_SRP} readOnly />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
