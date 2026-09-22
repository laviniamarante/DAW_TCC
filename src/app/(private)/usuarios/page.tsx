"use client";

import Link from "next/link";
import { UserCircle } from "@phosphor-icons/react";
import { USUARIOS_MOCK } from "@/db/usuariosMock";
import estilos from "./page.module.css";

function obterClassePapel(papel: string) {
  if (papel === "Gestor de Contratos") return estilos.papelGestor;
  if (papel === "Fiscal") return estilos.papelFiscal;
  return estilos.papelDirecao;
}

export default function PaginaUsuarios() {
  return (
    <main className={estilos.containerPrincipal}>
      <div className={estilos.cabecalho}>
        <div>
          <h2 className={estilos.tituloPagina}>Usuários</h2>
          <p className={estilos.subtitulo}>
            Fiscais e direção escolar cadastrados no sistema
          </p>
        </div>
        <Link href="/cadastrar" className={estilos.botaoNovoUsuario}>
          + Novo usuário
        </Link>
      </div>

      <section className={estilos.listaUsuarios}>
        {USUARIOS_MOCK.map((usuario) => (
          <div key={usuario.id_usuario} className={estilos.cartaoUsuario}>
            <UserCircle size={36} className={estilos.iconeUsuario} />
            <div className={estilos.infoUsuario}>
              <h3>{usuario.nome}</h3>
              <p>{usuario.email}</p>
            </div>
            <span
              className={`${estilos.tagPapel} ${obterClassePapel(usuario.papel)}`}
            >
              {usuario.papel}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
