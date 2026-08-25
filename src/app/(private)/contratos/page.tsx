"use client";

import { useState, FormEvent } from "react";
import {
  MagnifyingGlass,
  Funnel,
  CaretDown,
  CalendarBlank,
  CurrencyDollar,
} from "@phosphor-icons/react";
import styles from "./page.module.css";

interface Contrato {
  id: number;
  numero: string;
  titulo: string;
  empresa: string;
  inicio: string;
  termino: string;
  pagamentosPendentes: number;
}

const CONTRATOS_MOCK: Contrato[] = [
  {
    id: 1,
    numero: "01/2025",
    titulo: "Fornecimento de Material de Escritório",
    empresa: "Papelaria Central Ltda",
    inicio: "14/01/2025",
    termino: "30/05/2026",
    pagamentosPendentes: 1,
  },
  {
    id: 2,
    numero: "02/2025",
    titulo: "Serviços de Limpeza e Conservação",
    empresa: "Limpeza Total Serviços",
    inicio: "01/02/2025",
    termino: "01/02/2026",
    pagamentosPendentes: 0,
  },
];

export default function ContratosPage() {
  const [inputValue, setInputValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  
  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setActiveSearch(inputValue);
  };

  const contratosFiltrados = CONTRATOS_MOCK.filter((contrato) => {
    const matchesSearch =
      contrato.titulo.toLowerCase().includes(activeSearch.toLowerCase()) ||
      contrato.empresa.toLowerCase().includes(activeSearch.toLowerCase()) ||
      contrato.numero.toLowerCase().includes(activeSearch.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "pendente") {
      matchesStatus = contrato.pagamentosPendentes > 0;
    } else if (statusFilter === "em_dia") {
      matchesStatus = contrato.pagamentosPendentes === 0;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <main className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Contratos</h2>

      {/* Filtros */}
      <section className={styles.filterCard}>
        <form className={styles.searchGroup} onSubmit={handleSearch}>
          <div className={styles.searchInputWrapper}>
            <MagnifyingGlass className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por nome ou número do contrato..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.searchBtn}>
            <MagnifyingGlass size={16} />
            Buscar
          </button>
        </form>

        <div className={styles.filterSelectWrapper}>
          <Funnel className={styles.filterIcon} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Com pagamentos pendentes</option>
            <option value="em_dia">Em dia</option>
          </select>
          <CaretDown className={styles.arrowIcon} />
        </div>
      </section>

      {/* Lista */}
      <section className={styles.contractsList}>
        {contratosFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
            Nenhum contrato encontrado.
          </p>
        ) : (
          contratosFiltrados.map((contrato) => (
            <div key={contrato.id} className={styles.contractCard}>
              <h3 className={styles.contractTitle}>{contrato.titulo}</h3>
              <p className={styles.contractSubtitle}>{contrato.empresa}</p>

              <div className={styles.contractDates}>
                <div className={styles.dateItem}>
                  <CalendarBlank size={18} />
                  <span>Início: {contrato.inicio}</span>
                </div>
                <div className={styles.dateItem}>
                  <CalendarBlank size={18} />
                  <span>Término: {contrato.termino}</span>
                </div>
              </div>

              <div className={styles.contractStatus}>
                <CurrencyDollar size={18} />
                <span>
                  {contrato.pagamentosPendentes > 0
                    ? `${contrato.pagamentosPendentes} pagamento(s) pendente(s)`
                    : "Pagamentos em dia"}
                </span> /*opcional */
              </div>

              <button
                className={styles.detailsBtn}
                onClick={() => alert(`Detalhes do contrato ${contrato.id}`)}
              >
                Ver detalhes
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
