"use client";

import { UserCircle } from "@phosphor-icons/react";
import estilos from "./page.module.css";

export default function PaginaPerfil() {
  return (
    <main className={estilos.containerPrincipal}>
      <h2 className={estilos.tituloPagina}>Meu Perfil</h2>

      <section className={estilos.cartao}>
        <div className={estilos.avatar}>
          <UserCircle size={64} />
        </div>

        <div className={estilos.grupoCampos}>
          <div className={estilos.campo}>
            <label>Nome</label>
        
          </div>
          <div className={estilos.campo}>
            <label>E-mail</label>
            <input type="email" value="usuario@exemplo.com" readOnly />
          </div>
          <div className={estilos.campo}>
            <label>Papel no sistema</label>
            <input type="text" value="Administrador" readOnly />
          </div>
        </div>
      </section>
    </main>
  );
}
