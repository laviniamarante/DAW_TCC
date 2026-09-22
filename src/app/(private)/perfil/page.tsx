"use client";

import { UserCircle } from "@phosphor-icons/react";
import { USUARIO_LOGADO } from "@/db/usuariosMock";
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
            <input type="text" value={USUARIO_LOGADO.nome} readOnly />
          </div>
          <div className={estilos.campo}>
            <label>E-mail</label>
            <input type="text" value={USUARIO_LOGADO.email} readOnly />
          </div>
          <div className={estilos.campo}>
            <label>Papel no sistema</label>
            <input type="text" value={USUARIO_LOGADO.papel} readOnly />
          </div>
        </div>
      </section>
    </main>
  );
}
