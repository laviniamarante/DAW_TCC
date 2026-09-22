"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CaretDownIcon,
  CalendarBlankIcon,
  CurrencyDollarIcon,
} from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import estilos from "./page.module.css";

interface Contrato {
  id_contrato: number;
  identificador_contrato: string;
  objeto_contrato: string | null;
  data_inicio: string | null;
  data_fim: string | null;

  empresa: {
    razao_social: string;
    nome_fantasia: string | null;
  } | null;

  situacao_contrato: {
    situacao: string;
  } | null;
}

export default function PaginaContratos() {
  const [valorBusca, setValorBusca] = useState("");
  const [buscaAtiva, setBuscaAtiva] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarContratos() {
      const { data, error } = await supabase
        .from("contrato")
        .select(`
          id_contrato,
          identificador_contrato,
          objeto_contrato,
          data_inicio,
          data_fim,
          empresa (
            razao_social,
            nome_fantasia
          ),
          situacao_contrato (
            situacao
          )
        `);

      if (error) {
        console.error("Erro ao buscar contratos:", error);
        setCarregando(false);
        return;
      }

      setContratos(
        (data || []).map((contrato) => ({
          ...contrato,
          empresa: Array.isArray(contrato.empresa)
            ? contrato.empresa[0] || null
            : contrato.empresa,
          situacao_contrato: Array.isArray(contrato.situacao_contrato)
            ? contrato.situacao_contrato[0] || null
            : contrato.situacao_contrato,
        }))
      );
      setCarregando(false);
    }

    buscarContratos();
  }, []);

  const realizarBusca = (e?: { preventDefault: () => void }) => {
    if (e) e.preventDefault();

    setBuscaAtiva(valorBusca);
  };

  const contratosFiltrados = contratos.filter((contrato) => {
    const textoBusca = buscaAtiva.toLowerCase();

    const correspondeBusca =
      contrato.identificador_contrato
        .toLowerCase()
        .includes(textoBusca) ||
      (contrato.objeto_contrato || "")
        .toLowerCase()
        .includes(textoBusca) ||
      (contrato.empresa?.razao_social || "")
        .toLowerCase()
        .includes(textoBusca);

    let correspondeStatus = true;

    if (filtroStatus !== "todos") {
      correspondeStatus =
        contrato.situacao_contrato?.situacao?.toLowerCase() ===
        filtroStatus;
    }

    return correspondeBusca && correspondeStatus;
  });

  if (carregando) {
    return (
      <main className={estilos.containerPrincipal}>
        <h2 className={estilos.tituloPagina}>Contratos</h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            padding: "20px",
          }}
        >
          Carregando contratos...
        </p>
      </main>
    );
  }

  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Contratos</h2>

      <section className={estilos.cartaoFiltros}>
        <form className={estilos.grupoBusca} onSubmit={realizarBusca}>
          <div className={estilos.containerCampoBusca}>
            <MagnifyingGlassIcon className={estilos.iconeBusca} />

            <input
              type="text"
              placeholder="Buscar por nome ou número do contrato..."
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
            />
          </div>

          <button type="submit" className={estilos.botaoBusca}>
            <MagnifyingGlassIcon size={16} />
            Buscar
          </button>
        </form>

        <div className={estilos.containerSelecaoFiltro}>
          <FunnelIcon className={estilos.iconeFiltro} />

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="vencido">Vencidos</option>
            <option value="pendente">Pendentes</option>
          </select>

          <CaretDownIcon className={estilos.iconeSeta} />
        </div>
      </section>

      <section className={estilos.listaContratos}>
        {contratosFiltrados.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#666",
              padding: "20px",
            }}
          >
            Nenhum contrato encontrado.
          </p>
        ) : (
          contratosFiltrados.map((contrato) => (
            <div
              key={contrato.id_contrato}
              className={estilos.cartaoContrato}
            >
              <h3 className={estilos.tituloContrato}>
                {contrato.objeto_contrato || "Objeto não informado"}
              </h3>

              <p className={estilos.subtituloContrato}>
                {contrato.empresa?.razao_social ||
                  "Empresa não informada"}
              </p>

              <p>
                Contrato: {contrato.identificador_contrato}
              </p>

              <div className={estilos.datasContrato}>
                <div className={estilos.itemData}>
                  <CalendarBlankIcon size={18} />

                  <span>
                    Início:{" "}
                    {contrato.data_inicio || "Não informado"}
                  </span>
                </div>

                <div className={estilos.itemData}>
                  <CalendarBlankIcon size={18} />

                  <span>
                    Término:{" "}
                    {contrato.data_fim || "Não informado"}
                  </span>
                </div>
              </div>

              <div className={estilos.statusContrato}>
                <CurrencyDollarIcon size={18} />

                <span>
                  Status:{" "}
                  {contrato.situacao_contrato?.situacao ||
                    "Não informado"}
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
