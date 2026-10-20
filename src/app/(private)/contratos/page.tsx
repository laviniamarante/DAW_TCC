
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CaretDownIcon,
  CalendarBlankIcon,
  CheckIcon,
} from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

interface Contrato {
  id_contrato: number;
  identificador_contrato: string;
  objeto_contrato: string | null;
  data_inicio: string | null;
  data_fim: string | null;

  empresa: {
    nome_contratada: string;
    natureza_contrato: string | null;
  } | null;

  situacao_contrato: {
    situacao: string;
  } | null;
}

const opcoesStatus = [
  {
    valor: "todos",
    texto: "Todos os status",
    classe: "pontoTodos",
  },
  {
    valor: "ativo",
    texto: "Ativos",
    classe: "pontoAtivo",
  },
  {
    valor: "vencido",
    texto: "Vencidos",
    classe: "pontoVencido",
  },
  {
    valor: "pendente",
    texto: "Pendentes",
    classe: "pontoPendente",
  },
];

export default function PaginaContratos() {
  const [valorBusca, setValorBusca] = useState("");
  const [buscaAtiva, setBuscaAtiva] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const [menuStatusAberto, setMenuStatusAberto] = useState(false);

  const filtroRef = useRef<HTMLDivElement>(null);

  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [carregando, setCarregando] = useState(true);

  function formatarData(data: string | null) {
    if (!data) return "Não informado";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  // Busca os contratos no Supabase
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
            nome_contratada,
            natureza_contrato
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
          situacao_contrato: Array.isArray(
            contrato.situacao_contrato
          )
            ? contrato.situacao_contrato[0] || null
            : contrato.situacao_contrato,
        })) as Contrato[]
      );

      setCarregando(false);
    }

    buscarContratos();
  }, []);

  // Fecha o menu quando o usuário clica fora dele ou pressiona Esc
  useEffect(() => {
    function fecharMenu(event: MouseEvent) {
      if (
        filtroRef.current &&
        !filtroRef.current.contains(event.target as Node)
      ) {
        setMenuStatusAberto(false);
      }
    }

    function fecharComEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuStatusAberto(false);
      }
    }

    document.addEventListener("mousedown", fecharMenu);
    document.addEventListener("keydown", fecharComEsc);

    return () => {
      document.removeEventListener("mousedown", fecharMenu);
      document.removeEventListener("keydown", fecharComEsc);
    };
  }, []);

  // Executa a busca por texto
  const realizarBusca = (
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    setBuscaAtiva(valorBusca.trim());
  };

  // Aplica a busca e o filtro de status
  const contratosFiltrados = contratos.filter((contrato) => {
    const textoBusca = buscaAtiva.toLowerCase();

    const correspondeBusca =
      contrato.identificador_contrato
        .toLowerCase()
        .includes(textoBusca) ||
      (contrato.objeto_contrato || "")
        .toLowerCase()
        .includes(textoBusca) ||
      (contrato.empresa?.nome_contratada || "")
        .toLowerCase()
        .includes(textoBusca);

    let correspondeStatus = true;

    if (filtroStatus !== "todos") {
      correspondeStatus =
        contrato.situacao_contrato?.situacao?.trim().toLowerCase() ===
        filtroStatus;
    }

    return correspondeBusca && correspondeStatus;
  });

  const statusSelecionado =
    opcoesStatus.find(
      (opcao) => opcao.valor === filtroStatus
    ) || opcoesStatus[0];

  if (carregando) {
    return (
      <main className={styles.containerPrincipal}>
        <h2 className={styles.tituloPagina}>Contratos</h2>

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
    <main className={styles.containerPrincipal}>
      <h2 className={styles.tituloPagina}>Contratos</h2>

      {/* Painel de busca e filtragem */}
      <section className={styles.cartaoFiltros}>
        <form
          className={styles.grupoBusca}
          onSubmit={realizarBusca}
        >
          <div className={styles.containerCampoBusca}>
            <MagnifyingGlassIcon
              className={styles.iconeBusca}
            />

            <input
              type="text"
              placeholder="Buscar por nome ou número do contrato..."
              value={valorBusca}
              onChange={(e) =>
                setValorBusca(e.target.value)
              }
              aria-label="Buscar contratos"
            />
          </div>

          <button
            type="submit"
            className={styles.botaoBusca}
          >
            <MagnifyingGlassIcon size={16} />
            Buscar
          </button>
        </form>

        {/* Menu de status personalizado */}
        <div
          className={styles.containerSelecaoFiltro}
          ref={filtroRef}
        >
          <button
            type="button"
            className={`${styles.botaoFiltro} ${
              menuStatusAberto
                ? styles.botaoFiltroAberto
                : ""
            }`}
            onClick={() =>
              setMenuStatusAberto((aberto) => !aberto)
            }
            aria-haspopup="listbox"
            aria-expanded={menuStatusAberto}
            aria-label="Filtrar contratos por status"
          >
            <FunnelIcon
              className={styles.iconeFiltro}
            />

            <span>{statusSelecionado.texto}</span>

            <CaretDownIcon
              className={`${styles.iconeSeta} ${
                menuStatusAberto
                  ? styles.iconeSetaAberta
                  : ""
              }`}
            />
          </button>

          {menuStatusAberto && (
            <div
              className={styles.menuOpcoesFiltro}
              role="listbox"
              aria-label="Opções de status"
            >
              {opcoesStatus.map((opcao) => {
                const selecionada =
                  filtroStatus === opcao.valor;

                return (
                  <button
                    key={opcao.valor}
                    type="button"
                    role="option"
                    aria-selected={selecionada}
                    className={`${
                      styles.opcaoFiltro
                    } ${
                      selecionada
                        ? styles.opcaoSelecionada
                        : ""
                    }`}
                    onClick={() => {
                      setFiltroStatus(opcao.valor);
                      setMenuStatusAberto(false);
                    }}
                  >
                    <span
                      className={`${styles.pontoStatus} ${
                        styles[opcao.classe]
                      }`}
                    />

                    <span
                      className={styles.textoOpcaoFiltro}
                    >
                      {opcao.texto}
                    </span>

                    {selecionada && (
                      <CheckIcon
                        className={
                          styles.iconeOpcaoSelecionada
                        }
                        weight="bold"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lista de contratos */}
      <section className={styles.listaContratos}>
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
              className={styles.cartaoContrato}
            >
              <h3 className={styles.tituloContrato}>
                {contrato.identificador_contrato ||
                  "Contrato sem identificador"}
              </h3>

              <p className={styles.subtituloContrato}>
                {contrato.empresa?.nome_contratada ||
                  "Nome da empresa não informado"}
              </p>

              <div className={styles.naturezaContrato}>
                <span>
                  Natureza do contrato:{" "}
                  {contrato.empresa?.natureza_contrato ||
                    "Não informada"}
                </span>
              </div>

              <div className={styles.statusContrato}>
                <span>
                  Status:{" "}
                  {contrato.situacao_contrato?.situacao ||
                    "Não informado"}
                </span>
              </div>

              <div className={styles.datasContrato}>
                <div className={styles.itemData}>
                  <CalendarBlankIcon size={18} />

                  <span>
                    Início:{" "}
                    {formatarData(contrato.data_inicio)}
                  </span>
                </div>

                <div className={styles.itemData}>
                  <CalendarBlankIcon size={18} />

                  <span>
                    Término:{" "}
                    {formatarData(contrato.data_fim)}
                  </span>
                </div>
              </div>

              <Link
                href={`/detalhes/${contrato.id_contrato}`}
                className={styles.botaoDetalhes}
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
