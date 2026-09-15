"use client";

import { useState, FormEvent } from "react";
import {
  MagnifyingGlass,
  Funnel,
  CaretDown,
  CalendarBlank,
  CurrencyDollar,
} from "@phosphor-icons/react";
import estilos from "./page.module.css";

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

export default function PaginaContratos() {
  const [valorBusca, setValorBusca] = useState("");
  const [buscaAtiva, setBuscaAtiva] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const realizarBusca = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setBuscaAtiva(valorBusca);
  };

  const contratosFiltrados = CONTRATOS_MOCK.filter((contrato) => {
    const correspondeBusca =
      contrato.titulo.toLowerCase().includes(buscaAtiva.toLowerCase()) ||
      contrato.empresa.toLowerCase().includes(buscaAtiva.toLowerCase()) ||
      contrato.numero.toLowerCase().includes(buscaAtiva.toLowerCase());

    let correspondeStatus = true;

    if (filtroStatus === "pendente") {
      correspondeStatus = contrato.pagamentosPendentes > 0;
    } else if (filtroStatus === "em_dia") {
      correspondeStatus = contrato.pagamentosPendentes === 0;
    }

    return correspondeBusca && correspondeStatus;
  });

  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Contratos</h2>

      <section className={estilos.cartaoFiltros}>
        <form className={estilos.grupoBusca} onSubmit={realizarBusca}>
          <div className={estilos.containerCampoBusca}>
            <MagnifyingGlass className={estilos.iconeBusca} />
            <input
              type="text"
              placeholder="Buscar por nome ou número do contrato..."
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
            />
          </div>

          <button type="submit" className={estilos.botaoBusca}>
            <MagnifyingGlass size={16} />
            Buscar
          </button>
        </form>

        <div className={estilos.containerSelecaoFiltro}>
          <Funnel className={estilos.iconeFiltro} />

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Com pagamentos pendentes</option>
            <option value="em_dia">Em dia</option>
          </select>

          <CaretDown className={estilos.iconeSeta} />
        </div>
      </section>

    
      <section className={estilos.listaContratos}>
        {contratosFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
            Nenhum contrato encontrado.
          </p>
        ) : (
          contratosFiltrados.map((contrato) => (
            <div key={contrato.id} className={estilos.cartaoContrato}>
              <h3 className={estilos.tituloContrato}>{contrato.titulo}</h3>
              <p className={estilos.subtituloContrato}>{contrato.empresa}</p>

              <div className={estilos.datasContrato}>
                <div className={estilos.itemData}>
                  <CalendarBlank size={18} />
                  <span>Início: {contrato.inicio}</span>
                </div>

                <div className={estilos.itemData}>
                  <CalendarBlank size={18} />
                  <span>Término: {contrato.termino}</span>
                </div>
              </div>

              <div className={estilos.statusContrato}>
                <CurrencyDollar size={18} />

                <span>
                  {contrato.pagamentosPendentes > 0
                    ? `${contrato.pagamentosPendentes} pagamento(s) pendente(s)`
                    : "Pagamentos em dia"}
                </span>
              </div>

              <button
                className={estilos.botaoDetalhes}
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
