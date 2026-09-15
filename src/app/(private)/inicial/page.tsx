"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import styles from "./page.module.css";

interface ContratoRecente {
  id: number;
  titulo: string;
  fornecedor: string;
  vencimento: string;
  status: "vencido" | "ativo" | "proximo";
  statusRotulo: string;
  selecionado?: boolean;
}

const CONTRATOS_RECENTES: ContratoRecente[] = [
  {
    id: 1,
    titulo: "Fornecimento de Material de Escritório",
    fornecedor: "Papelaria Central Ltda",
    vencimento: "13/01/2026",
    status: "vencido",
    statusRotulo: "Vencido",
  },
  {
    id: 2,
    titulo: "Fornecimento de Equipamentos de Laboratório",
    fornecedor: "Lab Equipamentos Científicos",
    vencimento: "13/01/2026",
    status: "ativo",
    statusRotulo: "Ativo",
  },
  {
    id: 3,
    titulo: "Serviços de Limpeza e Conservação",
    fornecedor: "Limpeza Total Serviços",
    vencimento: "12/01/2026",
    status: "proximo",
    statusRotulo: "Próximo do vencimento",
    
  },
];

export default function PaginaInicial() {
  const obterClasseEtiqueta = (status: ContratoRecente["status"]) => {
    switch (status) {
      case "vencido":
        return styles.etiquetaVencido;
      case "ativo":
        return styles.etiquetaAtivo;
      case "proximo":
        return styles.etiquetaProximo;
    }
  };

  return (
    <main className={styles.conteinerPrincipal}>
      <div className={styles.cartaoExterno}>
        <div className={styles.linhaCabecalho}>
          <div className={styles.grupoTitulo}>
            <h2 className={styles.titulo}>Contratos recentes</h2>
            <p className={styles.subtitulo}>
              Últimos contratos cadastrados no sistema
            </p>
          </div>
          <button className={styles.botaoNovoContrato}>+ Novo contrato</button>
        </div>

        <div className={styles.listaContratos}>
          {CONTRATOS_RECENTES.map((contrato) => (
            <div
              key={contrato.id}
              className={`${styles.itemContrato} ${
                contrato.selecionado ? styles.cartaoSelecionado : ""
              }`}
            >
              <div className={styles.cartaoEsquerda}>
                <div className={styles.cabecalhoTitulo}>
                  <h3 className={styles.tituloContrato}>{contrato.titulo}</h3>
                  <span
                    className={`${styles.etiqueta} ${obterClasseEtiqueta(
                      contrato.status,
                    )}`}
                  >
                    {contrato.statusRotulo}
                  </span>
                </div>
                <p className={styles.infoContrato}>
                  <strong>Fornecedor:</strong> {contrato.fornecedor}
                </p>
                <p className={styles.infoContrato}>
                  <strong>Vencimento:</strong> {contrato.vencimento}
                </p>
              </div>

              <Link
                href={`/contratos?busca=${encodeURIComponent(contrato.titulo)}`}
                className={styles.botaoDetalhes}
              >
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.envoltorioVerTodos}>
          <Link href="/contratos" className={styles.linkVerTodos}>
            Ver todos os contratos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
