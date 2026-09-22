"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

interface Contrato {
  id_contrato: number;
  identificador_contrato: string;
  data_fim: string | null;
  data_celebracao: string | null;

  empresa: {
    razao_social: string;
    nome_fantasia: string | null;
  } | null;

  situacao_contrato: {
    situacao: string;
  } | null;
}

export default function PaginaInicial() {
  const [contratosRecentes, setContratosRecentes] = useState<Contrato[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarContratosRecentes() {
      const { data, error } = await supabase
        .from("contrato")
        .select(`
          id_contrato,
          identificador_contrato,
          data_fim,
          data_celebracao,
          empresa (
            razao_social,
            nome_fantasia
          ),
          situacao_contrato (
            situacao
          )
        `)
        .order("data_celebracao", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Erro ao buscar contratos recentes:", error);
        setCarregando(false);
        return;
      }

      setContratosRecentes(
        (data || []).map((contrato) => ({
          ...contrato,
          empresa: contrato.empresa?.[0] || null,
          situacao_contrato: contrato.situacao_contrato?.[0] || null,
        })),
      );
      setCarregando(false);
    }

    buscarContratosRecentes();
  }, []);

  const obterClasseEtiqueta = (situacao: string | undefined) => {
    switch (situacao?.toLowerCase()) {
      case "vencido":
        return styles.etiquetaVencido;

      case "ativo":
        return styles.etiquetaAtivo;

      case "pendente":
        return styles.etiquetaProximo;

      default:
        return "";
    }
  };

  if (carregando) {
    return (
      <main className={styles.conteinerPrincipal}>
        <div className={styles.linhaCabecalho}>
          <div className={styles.grupoTitulo}>
            <h2 className={styles.titulo}>Contratos recentes</h2>
            <p className={styles.subtitulo}>
              Últimos contratos cadastrados no sistema
            </p>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
          Carregando contratos...
        </p>
      </main>
    );
  }

  return (
    <main className={styles.conteinerPrincipal}>
      <div className={styles.linhaCabecalho}>
        <div className={styles.grupoTitulo}>
          <h2 className={styles.titulo}>Contratos recentes</h2>

          <p className={styles.subtitulo}>
            Últimos contratos cadastrados no sistema
          </p>
        </div>

        <button className={styles.botaoNovoContrato}>
          + Novo contrato
        </button>
      </div>

      <div className={styles.listaContratos}>
        {contratosRecentes.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
            Nenhum contrato cadastrado.
          </p>
        ) : (
          contratosRecentes.map((contrato) => {
            const situacao =
              contrato.situacao_contrato?.situacao || "Não informado";

            return (
              <div
                key={contrato.id_contrato}
                className={styles.cartaoContrato}
              >
                <div className={styles.cartaoEsquerda}>
                  <div className={styles.cabecalhoTitulo}>
                    <h3 className={styles.tituloContrato}>
                      {contrato.identificador_contrato}
                    </h3>

                    <span
                      className={`${styles.etiqueta} ${obterClasseEtiqueta(
                        situacao,
                      )}`}
                    >
                      {situacao}
                    </span>
                  </div>

                  <p className={styles.infoContrato}>
                    <strong>Fornecedor:</strong>{" "}
                    {contrato.empresa?.razao_social ||
                      "Não informado"}
                  </p>

                  <p className={styles.infoContrato}>
                    <strong>Vencimento:</strong>{" "}
                    {contrato.data_fim || "Não informado"}
                  </p>
                </div>

                <Link
                  href={`/detalhes/${contrato.id_contrato}`}
                  className={styles.botaoDetalhes}
                >
                  Ver detalhes
                </Link>
              </div>
            );
          })
        )}
      </div>

      <div className={styles.envoltorioVerTodos}>
        <Link href="/contratos" className={styles.linkVerTodos}>
          Ver todos os contratos
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </main>
  );
}