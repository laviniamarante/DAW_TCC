"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Warning, CheckCircle } from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import estilos from "./page.module.css";

type Filtro = "todos" | "ativo" | "pendente" | "vencido";

const FILTROS: { valor: Filtro; texto: string; cor: string }[] = [
  { valor: "todos", texto: "Todos", cor: "#4b5563" },
  { valor: "ativo", texto: "Ativos", cor: "#39c172" },
  { valor: "pendente", texto: "Pendentes", cor: "#d97706" },
  { valor: "vencido", texto: "Vencidos", cor: "#e53935" },
];

interface Notificacao {
  id_notificacao: number;
  titulo: string;
  descricao: string | null;
  tempo_envio: number | null;
  data_criacao: string | null;

  tipo_notificacao: {
    tipo: string;
  } | null;

  contrato: {
    id_contrato: number;
    identificador_contrato: string;
    objeto_contrato: string | null;
    data_fim: string | null;

    empresa: {
      nome_contratada: string | null;
    } | null;

    situacao_contrato: {
      situacao: string;
    } | null;
  } | null;
}

export default function PaginaNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>("todos");

  useEffect(() => {
    async function buscarNotificacoes() {
      try {
        const { data, error } = await supabase
          .from("notificacao")
          .select(`
            id_notificacao,
            titulo,
            descricao,
            tempo_envio,
            data_criacao,
            tipo_notificacao (
              tipo
            ),
            contrato (
              id_contrato,
              identificador_contrato,
              objeto_contrato,
              data_fim,
              empresa (
                nome_contratada
              ),
              situacao_contrato (
                situacao
              )
            )
          `)
          .order("data_criacao", { ascending: false });

        if (error) {
          console.error("Erro ao buscar notificações:", error);
          return;
        }

        // Ajusta os relacionamentos retornados pelo Supabase.
        const dados = (data || []) as any[];

        const notificacoesFormatadas: Notificacao[] = dados.map(
          (notificacao) => {
            const contrato = Array.isArray(notificacao.contrato)
              ? notificacao.contrato[0]
              : notificacao.contrato;

            return {
              ...notificacao,

              tipo_notificacao: Array.isArray(notificacao.tipo_notificacao)
                ? notificacao.tipo_notificacao[0] || null
                : notificacao.tipo_notificacao,

              contrato: contrato
                ? {
                    ...contrato,

                    empresa: Array.isArray(contrato.empresa)
                      ? contrato.empresa[0] || null
                      : contrato.empresa,

                    situacao_contrato: Array.isArray(
                      contrato.situacao_contrato
                    )
                      ? contrato.situacao_contrato[0] || null
                      : contrato.situacao_contrato,
                  }
                : null,
            };
          }
        );

        setNotificacoes(notificacoesFormatadas);
      } catch (error) {
        console.error("Erro inesperado:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarNotificacoes();
  }, []);

  // Descobre a situação do contrato.
  function descobrirTipo(item: Notificacao): Filtro {
    const status = item.contrato?.situacao_contrato?.situacao
      ?.trim()
      .toLowerCase();

    if (status === "vencido") {
      return "vencido";
    }

    if (status === "pendente") {
      return "pendente";
    }

    return "ativo";
  }

  // Quantidade de notificações por filtro.
  const contagens: Record<Filtro, number> = {
    todos: notificacoes.length,
    ativo: notificacoes.filter((n) => descobrirTipo(n) === "ativo").length,
    pendente: notificacoes.filter((n) => descobrirTipo(n) === "pendente")
      .length,
    vencido: notificacoes.filter((n) => descobrirTipo(n) === "vencido")
      .length,
  };

  // Aplica o filtro selecionado.
  const notificacoesFiltradas = notificacoes.filter((item) => {
    if (filtro === "todos") {
      return true;
    }

    return descobrirTipo(item) === filtro;
  });

  // Define o ícone e a cor do alerta.
  function obterAlerta(tipo: Filtro) {
    if (tipo === "vencido") {
      return {
        classe: estilos.iconeVermelho,
        Icone: Warning,
      };
    }

    if (tipo === "pendente") {
      return {
        classe: estilos.iconeAmarelo,
        Icone: Warning,
      };
    }

    return {
      classe: estilos.iconeVerde,
      Icone: CheckCircle,
    };
  }

  function formatarData(data: string | null) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(data).toLocaleDateString("pt-BR");
  }

  if (carregando) {
    return (
      <main className={estilos.containerPrincipal}>
        <h2 className={estilos.tituloPagina}>Notificações</h2>
        <p className={estilos.vazio}>Carregando notificações...</p>
      </main>
    );
  }

  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Notificações</h2>

      <p className={estilos.subtitulo}>
        Acompanhe os alertas dos contratos cadastrados no sistema
      </p>

      {/* Filtros */}
      <div
        className={estilos.areaFiltros}
        role="tablist"
        aria-label="Filtrar notificações"
      >
        {FILTROS.map((item) => {
          const selecionado = filtro === item.valor;

          return (
            <button
              key={item.valor}
              role="tab"
              aria-selected={selecionado}
              className={`${estilos.botaoFiltro} ${
                selecionado ? estilos.botaoFiltroSelecionado : ""
              }`}
              style={{ "--cor": item.cor } as CSSProperties}
              onClick={() => setFiltro(item.valor)}
            >
              <span className={estilos.pontoFiltro} aria-hidden="true" />
              <span>{item.texto}</span>
              <span className={estilos.contadorFiltro}>
                {contagens[item.valor]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lista de notificações */}
      <section className={estilos.listaNotificacoes}>
        {notificacoesFiltradas.length === 0 ? (
          <p className={estilos.vazio}>Nenhuma notificação encontrada.</p>
        ) : (
          notificacoesFiltradas.map((notificacao) => {
            const tipo = descobrirTipo(notificacao);
            const { classe, Icone } = obterAlerta(tipo);

            const contrato = notificacao.contrato;

            return (
              <Link
                key={notificacao.id_notificacao}
                href={contrato ? `/detalhes/${contrato.id_contrato}` : "#"}
                className={estilos.itemNotificacao}
              >
                {/* Ícone */}
                <div className={`${estilos.iconeAlerta} ${classe}`}>
                  <Icone size={24} weight="fill" color="white" />
                </div>

                {/* Informações */}
                <div className={estilos.conteudoNotificacao}>
                  <h3>
                    {contrato?.identificador_contrato ||
                      "Contrato não informado"}
                  </h3>

                  <p className={estilos.tituloCard}>{notificacao.titulo}</p>

                  <span className={estilos.tempoTexto}>
                    {notificacao.tempo_envio !== null
                      ? `Enviar ${notificacao.tempo_envio} dias antes`
                      : `Criado em ${formatarData(notificacao.data_criacao)}`}
                  </span>

                  <p className={estilos.subtituloCard}>
                    Nome da contratada:{" "}
                    {contrato?.empresa?.nome_contratada || "Não informado"}
                  </p>

                  <p className={estilos.dataVencimento}>
                    Vencimento: {formatarData(contrato?.data_fim || null)}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </main>
  );
}