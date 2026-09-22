"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { CONTRATOS_MOCK, Contrato } from "@/db/contratosMock";
import styles from "./page.module.css";

export default function PaginaInicial() {
  const contratosRecentes = CONTRATOS_MOCK.slice(0, 3);

  const obterClasseEtiqueta = (status: Contrato["status"]) => {
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
          {contratosRecentes.map((contrato) => (
            <div key={contrato.id_contrato} className={styles.cartaoContrato}>
              <div className={styles.cartaoEsquerda}>
                <div className={styles.cabecalhoTitulo}>
                  <h3 className={styles.tituloContrato}>
                    {contrato.nome_contrato}
                  </h3>
                  <span
                    className={`${styles.etiqueta} ${obterClasseEtiqueta(
                      contrato.status,
                    )}`}
                  >
                    {contrato.statusRotulo}
                  </span>
                </div>
                <p className={styles.infoContrato}>
                  <strong>Fornecedor:</strong> {contrato.nome_contratada}
                </p>
                <p className={styles.infoContrato}>
                  <strong>Vencimento:</strong> {contrato.data_final}
                </p>
              </div>

              <Link
                href={`/detalhes/${contrato.id_contrato}`}
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
            <ArrowRightIcon size={16} />
          </Link>
        </div>
     
    </main>
  );
}
