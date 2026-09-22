"use client";

import { Gear } from "@phosphor-icons/react";
import estilos from "./page.module.css";

export default function PaginaConfiguracoes() {
  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Configurações</h2>

      <section className={estilos.cartao}>
        <Gear size={40} className={estilos.icone} />
        <p className={estilos.mensagem}>
          As opções de configuração do sistema ainda serão definidas.
        </p>
      </section>
    </main>
  );
}
