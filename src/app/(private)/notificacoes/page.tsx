"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Warning, CheckCircle } from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import estilos from "./page.module.css";

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
    identificador_contrato: string;
    objeto_contrato: string | null;
    data_fim: string | null;

    situacao_contrato: {
      situacao: string;
    } | null;
  } | null;
}

function obterNivelAlerta(situacao: string | undefined) {
  const status = situacao?.trim().toLowerCase();

  if (status === "vencido") {
    return {
      classe: estilos.alertaVermelho,
      rotulo: "Contrato vencido",
      Icone: Warning,
    };
  }

  if (status === "pendente") {
    return {
      classe: estilos.alertaAmarelo,
      rotulo: "Contrato pendente",
      Icone: Bell,
    };
  }

  return {
    classe: estilos.alertaVerde,
    rotulo: "Contrato ativo",
    Icone: CheckCircle,
  };
}

function formatarData(data: string | null) {
  if (!data) {
    return "Data não informada";
  }

  return new Date(data).toLocaleDateString("pt-BR");
}

export default function PaginaNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarNotificacoes() {
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
            identificador_contrato,
            objeto_contrato,
            data_fim,
            situacao_contrato (
              situacao
            )
          )
        `)
        .order("data_criacao", { ascending: false });

      if (error) {
        console.error("Erro ao buscar notificações:", error);
        setCarregando(false);
        return;
      }

      const notificacoesFormatadas: Notificacao[] = (data || []).map(
        (notificacao) => {
          const contrato = notificacao.contrato?.[0];

          return {
            ...notificacao,
            tipo_notificacao: notificacao.tipo_notificacao?.[0] || null,
            contrato: contrato
              ? {
                  ...contrato,
                  situacao_contrato:
                    contrato.situacao_contrato?.[0] || null,
                }
              : null,
          };
        }
      );

      setNotificacoes(notificacoesFormatadas);
      setCarregando(false);
    }

    buscarNotificacoes();
  }, []);

  if (carregando) {
    return (
      <main className={estilos.containerPrincipal}>
        <h2 className={estilos.tituloPagina}>Notificações</h2>

        <p className={estilos.vazio}>
          Carregando notificações...
        </p>
      </main>
    );
  }

  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Notificações</h2>

      <p className={estilos.subtitulo}>
        Contratos com vencimento próximo, organizados por urgência
      </p>

      <section className={estilos.listaNotificacoes}>
        {notificacoes.length === 0 ? (
          <p className={estilos.vazio}>
            Nenhuma notificação encontrada.
          </p>
        ) : (
          notificacoes.map((notificacao) => {
            const situacao =
              notificacao.contrato?.situacao_contrato?.situacao;

            const { classe, rotulo, Icone } =
              obterNivelAlerta(situacao);

            return (
              <Link
                key={notificacao.id_notificacao}
                href={
                  notificacao.contrato
                    ? `/detalhes/${notificacao.contrato.identificador_contrato}`
                    : "#"
                }
                className={`${estilos.itemNotificacao} ${classe}`}
              >
                <Icone
                  size={22}
                  className={estilos.iconeAlerta}
                />

                <div className={estilos.conteudoNotificacao}>
                  <h3>
                    {notificacao.contrato
                      ?.identificador_contrato ||
                      "Contrato não informado"}
                  </h3>

                  <p>
                    {notificacao.titulo}
                  </p>

                  <span className={estilos.rotuloAlerta}>
                    {rotulo}
                    {" · "}
                    {notificacao.tempo_envio !== null
                      ? `Enviar ${notificacao.tempo_envio} dias antes`
                      : `Criado em ${formatarData(
                          notificacao.data_criacao
                        )}`}
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