"use client";

import { useState } from "react";

export default function Home() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <main className="pagina-login">
      <section className="card-login">
        <div className="logo">📄</div>

        <h1>GerencIF</h1>
        <p className="subtitulo">Sistema de Gerenciamento de Contratos</p>

        <form>
          <label htmlFor="email">E-mail:</label>
          <div className="campo">
            <input
              id="email"
              type="email"
              placeholder="seu.email@ifpb.edu.br"
            />
          </div>

          <label htmlFor="senha">Senha:</label>
          <div className="campo">
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••••"
            />

            <button
              type="button"
              className="botao-olho"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <div className="opcoes">
            <label className="lembrar">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>

            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit" className="botao-entrar">
            Entrar
          </button>

          <p className="criar-conta">
            Não tem uma conta? <a href="#">Criar conta</a>
          </p>
        </form>
      </section>
    </main>
  );
}