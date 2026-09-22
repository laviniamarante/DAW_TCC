"use client";

import { UserCircle } from "@phosphor-icons/react";
import estilos from "./page.module.css";

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
      </div>

      <section className={estilos.listaUsuarios}>
        <div className={estilos.cartaoUsuario}>
          <UserCircle
            size={36}
            className={estilos.iconeUsuario}
          />

          <div className={estilos.infoUsuario}>
            <h3>Usuários</h3>
            <p>O gerenciamento de usuários ainda não está disponível.</p>
          </div>
        </div>
      </section>
    </main>
  );
}