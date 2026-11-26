
"use client";

import { useState } from "react";
import {
  UserCircle,
  PencilSimple,
  LockKey,
  X,
} from "@phosphor-icons/react";
import estilos from "./page.module.css";

export default function PaginaPerfil() {
  const [nome, setNome] = useState("Administrador");
  const [nomeEditado, setNomeEditado] = useState(nome);
  const [editando, setEditando] = useState(false);
  const [modalSenha, setModalSenha] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function salvarNome() {
    if (!nomeEditado.trim()) {
      alert("O nome não pode ficar vazio.");
      return;
    }

    setNome(nomeEditado.trim());
    setEditando(false);
  }

  function cancelarEdicao() {
    setNomeEditado(nome);
    setEditando(false);
  }

  function alterarSenha(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("A alteração de senha ainda precisa ser conectada ao Supabase.");

    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setModalSenha(false);
  }

  return (
    <main className={estilos.containerPrincipal}>
      <div className={estilos.cabecalho}>
        <h2 className={estilos.tituloPagina}>Meu Perfil</h2>
        <p className={estilos.subtitulo}>
          Visualize e gerencie suas informações pessoais.
        </p>
      </div>

      <section className={estilos.cartao}>
        <div className={estilos.areaAvatar}>
          <div className={estilos.avatar}>
            <UserCircle size={80} weight="light" />
          </div>

          <div className={estilos.identificacao}>
            <h3>{nome}</h3>
            <span className={estilos.badge}>Administrador</span>
          </div>
        </div>

        <div className={estilos.divisor}></div>

        <div className={estilos.grupoCampos}>
          <div className={estilos.tituloSecao}>
            <h3>Informações pessoais</h3>
          </div>

          <div className={estilos.campo}>
            <label>Nome completo</label>

            {editando ? (
              <input
                type="text"
                value={nomeEditado}
                onChange={(e) => setNomeEditado(e.target.value)}
              />
            ) : (
              <input type="text" value={nome} readOnly />
            )}
          </div>

          <div className={estilos.campo}>
            <label>E-mail</label>
            <input type="email" value="usuario@exemplo.com" readOnly />
          </div>

          <div className={estilos.campo}>
            <label>Papel no sistema</label>
            <input type="text" value="Gestor de contratos" readOnly />
          </div>

          <div className={estilos.botoes}>
            {editando ? (
              <>
                <button
                  type="button"
                  className={estilos.botaoCancelar}
                  onClick={cancelarEdicao}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className={estilos.botaoSalvar}
                  onClick={salvarNome}
                >
                  Salvar alterações
                </button>
              </>
            ) : (
              <button
                type="button"
                className={estilos.botaoEditar}
                onClick={() => {
                  setNomeEditado(nome);
                  setEditando(true);
                }}
              >
                <PencilSimple size={18} />
                Editar nome
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={estilos.cartaoSenha}>
        <div className={estilos.iconeSenha}>
          <LockKey size={24} />
        </div>

        <div className={estilos.textoSenha}>
          <h3>Segurança da conta</h3>
          <p>
            Mantenha sua conta segura alterando sua senha periodicamente.
          </p>
        </div>

        <button
          type="button"
          className={estilos.botaoSenha}
          onClick={() => setModalSenha(true)}
        >
          Alterar senha
        </button>
      </section>

      {modalSenha && (
        <div
          className={estilos.overlayModal}
          onClick={() => setModalSenha(false)}
        >
          <div
            className={estilos.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={estilos.cabecalhoModal}>
              <div>
                <h3>Alterar senha</h3>
                <p>Preencha os campos para atualizar sua senha.</p>
              </div>

              <button
                type="button"
                className={estilos.botaoFechar}
                onClick={() => setModalSenha(false)}
              >
                <X size={22} />
              </button>
            </div>

            <form className={estilos.formulario} onSubmit={alterarSenha}>
              <div className={estilos.campo}>
                <label>Senha atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  required
                />
              </div>

              <div className={estilos.campo}>
                <label>Nova senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <div className={estilos.campo}>
                <label>Confirmar nova senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <div className={estilos.botoesModal}>
                <button
                  type="button"
                  className={estilos.botaoCancelar}
                  onClick={() => setModalSenha(false)}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={estilos.botaoSalvar}
                >
                  Alterar senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
