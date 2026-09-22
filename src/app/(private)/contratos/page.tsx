"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  MagnifyingGlass,
  Funnel,
  CaretDown,
  CalendarBlank,
  CurrencyDollar,
} from "@phosphor-icons/react";
import { CONTRATOS_MOCK } from "@/db/contratosMock";
import estilos from "./page.module.css";

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
      contrato.nome_contrato.toLowerCase().includes(buscaAtiva.toLowerCase()) ||
      contrato.nome_contratada
        .toLowerCase()
        .includes(buscaAtiva.toLowerCase()) ||
      contrato.numero_contrato.toLowerCase().includes(buscaAtiva.toLowerCase());

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
            <div key={contrato.id_contrato} className={estilos.cartaoContrato}>
              <h3 className={estilos.tituloContrato}>
                {contrato.nome_contrato}
              </h3>
              <p className={estilos.subtituloContrato}>
                {contrato.nome_contratada}
              </p>

              <div className={estilos.datasContrato}>
                <div className={estilos.itemData}>
                  <CalendarBlank size={18} />
                  <span>Início: {contrato.data_inicio}</span>
                </div>

                <div className={estilos.itemData}>
                  <CalendarBlank size={18} />
                  <span>Término: {contrato.data_final}</span>
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

              <Link
                href={`/detalhes/${contrato.id_contrato}`}
                className={estilos.botaoDetalhes}
              >
                Ver detalhes
              </Link>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
