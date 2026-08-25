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
    selecionado: true,
  },
];

export default function PaginaInicial() {
  const getBadgeClass = (status: ContratoRecente["status"]) => {
    switch (status) {
      case "vencido":
        return styles.badgeVencido;
      case "ativo":
        return styles.badgeAtivo;
      case "proximo":
        return styles.badgeProximo;
    }
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.outerCard}>
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <h2>Contratos recentes</h2>
            <p>Últimos contratos cadastrados no sistema</p>
          </div>
          <button className={styles.newContractBtn}>+ Novo contrato</button>
        </div>

        <div className={styles.contractsList}>
          {CONTRATOS_RECENTES.map((contrato) => (
            <div
              key={contrato.id}
              className={`${styles.contractCard} ${
                contrato.selecionado ? styles.cardSelected : ""
              }`}
            >
              <div className={styles.cardLeft}>
                <div className={styles.titleHeader}>
                  <h3 className={styles.contractTitle}>{contrato.titulo}</h3>
                  <span
                    className={`${styles.badge} ${getBadgeClass(
                      contrato.status,
                    )}`}
                  >
                    {contrato.statusRotulo}
                  </span>
                </div>
                <p className={styles.contractInfo}>
                  Fornecedor: {contrato.fornecedor}
                </p>
                <p className={styles.contractInfo}>
                  Vencimento: {contrato.vencimento}
                </p>
              </div>

              {/* Redireciona para a tela de lista passando parâmetro de busca */}
              <Link
                href={`/contratos?search=${encodeURIComponent(contrato.titulo)}`}
                className={styles.detailsBtn}
              >
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>

        {/* Link para ver a lista completa de contratos */}
        <div className={styles.viewAllWrapper}>
          <Link href="/contratos" className={styles.viewAllLink}>
            Ver todos os contratos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
