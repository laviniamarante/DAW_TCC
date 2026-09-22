"use client";

import Link from "next/link";
import { Bell, Warning, CheckCircle } from "@phosphor-icons/react";
import { CONTRATOS_MOCK } from "@/db/contratosMock";
import estilos from "./page.module.css";

function obterNivelAlerta(diasRestantes: number) {
  if (diasRestantes <= 30) {
    return {
      classe: estilos.alertaVermelho,
      rotulo: "Vence em até 30 dias",
      Icone: Warning,
    };
  }
  if (diasRestantes <= 60) {
    return {
      classe: estilos.alertaAmarelo,
      rotulo: "Vence em até 60 dias",
      Icone: Bell,
    };
  }
  return {
    classe: estilos.alertaVerde,
    rotulo: "Vence em até 90 dias",
    Icone: CheckCircle,
  };
}

export default function PaginaNotificacoes() {
  // Mostra só contratos dentro da janela de 90 dias de aviso.
  const notificacoes = CONTRATOS_MOCK.filter(
    (contrato) => contrato.diasRestantes <= 90,
  ).sort((a, b) => a.diasRestantes - b.diasRestantes);

  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Notificações</h2>
      <p className={estilos.subtitulo}>
        Contratos com vencimento próximo, organizados por urgência
      </p>

      <section className={estilos.listaNotificacoes}>
        {notificacoes.length === 0 ? (
          <p className={estilos.vazio}>
            Nenhum contrato com vencimento nos próximos 90 dias.
          </p>
        ) : (
          notificacoes.map((contrato) => {
            const { classe, rotulo, Icone } = obterNivelAlerta(
              contrato.diasRestantes,
            );

            return (
              <Link
                key={contrato.id_contrato}
                href={`/detalhes/${contrato.id_contrato}`}
                className={`${estilos.itemNotificacao} ${classe}`}
              >
                <Icone size={22} className={estilos.iconeAlerta} />
                <div className={estilos.conteudoNotificacao}>
                  <h3>{contrato.nome_contrato}</h3>
                  <p>{contrato.nome_contratada}</p>
                  <span className={estilos.rotuloAlerta}>
                    {rotulo} · {contrato.diasRestantes} dia(s) restante(s)
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </main>
  );
}
