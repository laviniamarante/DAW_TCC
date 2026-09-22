"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

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
          objeto_contrato,
          data_inicio,
          data_fim,
          empresa (
            id_empresa,
            razao_social,
            nome_fantasia
          ),
          situacao_contrato (
            id_situacao_contrato,
            situacao
          )
        `)
        .order("id_contrato", { ascending: false })
        .limit(5);
        //aqui eu basicamente so to chamando os dados que eu quero la do supabase, coloquei em ordem do maior pro menor para que os contratos mais recentes apareçam antes, e que o limite seja 5, ja que eu só quero os 5 mais recentes
        const contratos = (data || []) as unknown as Contrato[];

        setContratosRecentes(contratos);
        setCarregando(false);
        }

    buscarContratosRecentes();
  }, []);

  //aqui eu simplesmente vou definir a classe css a ser usada conforme a situação do contrato
  const obterClasseEtiqueta = (
    situacao: string | undefined,
  ) => {
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
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            padding: "20px",
          }}
        >
          Carregando contratos...
          {/* exibir essa mensagem enquanto os contratos estão sendo carregados */}
        </p>
      </main>
    );
  }

  return (
    <main className={styles.conteinerPrincipal}>
      <div className={styles.linhaCabecalho}>
        <div className={styles.grupoTitulo}>
          <h2 className={styles.titulo}>
            Contratos recentes
          </h2>

          <p className={styles.subtitulo}>
            Últimos contratos cadastrados no sistema
          </p>
        </div>

        <button className={styles.botaoNovoContrato}>
          + Novo contrato
        </button>
      </div>

      <div className={styles.listaContratos}>
{contratosRecentes.map((contrato) => {
    const situacao =
      contrato.situacao_contrato?.situacao ||
      "Não informado";

    return (
      <div
        key={contrato.id_contrato}
        className={styles.cartaoContrato}
      >
        <div className={styles.cartaoEsquerda}>

<div className={styles.cabecalhoTitulo}>

  <div className={styles.titulosContrato}>
    <h3 className={styles.tituloContrato}>
      {contrato.identificador_contrato}
    </h3>

    <h4 className={styles.nomeEmpresa}>
      {contrato.empresa?.razao_social ||
        "Não informado"}
    </h4>
  </div>

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
            {contrato.empresa?.nome_fantasia ||
              contrato.empresa?.razao_social ||
              "Não informado"}
          </p>

          <p className={styles.infoContrato}>
            <strong>Objeto:</strong>{" "}
            {contrato.objeto_contrato ||
              "Não informado"}
          </p>

          <p className={styles.infoContrato}>
            <strong>Data de início:</strong>{" "}
            {contrato.data_inicio
              ? new Date(
                  contrato.data_inicio,
                ).toLocaleDateString("pt-BR")
              : "Não informado"}
          </p>

          <p className={styles.infoContrato}>
            <strong>Data de fim:</strong>{" "}
            {contrato.data_fim
              ? new Date(
                  contrato.data_fim,
                ).toLocaleDateString("pt-BR")
              : "Não informado"}
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
  })}

</div>

      <div className={styles.envoltorioVerTodos}>
        <Link
          href="/contratos"
          className={styles.linkVerTodos}
        >
          Ver todos os contratos
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </main>
  );
}