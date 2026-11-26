
"use client";

import { useState } from "react";
import {
  UserCircle,
  MagnifyingGlass,
  UserPlus,
  X,
} from "@phosphor-icons/react";
import estilos from "./page.module.css";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export default function PaginaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@ifpb.edu.br",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@ifpb.edu.br",
    },
    {
      id: 3,
      nome: "Ana Oliveira",
      email: "ana@ifpb.edu.br",
    },
  ]);

  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nome} ${usuario.email}`
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  function cadastrarUsuario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const novoUsuario: Usuario = {
      id: Date.now(),
      nome,
      email,
    };

    setUsuarios([...usuarios, novoUsuario]);

    setNome("");
    setEmail("");
    setSenha("");
    setModalAberto(false);
  }

  return (
    <main className={estilos.containerPrincipal}>
      <div className={estilos.cabecalho}>
        <div>
          <h2 className={estilos.tituloPagina}>Usuários</h2>
          <p className={estilos.subtitulo}>
            Gerencie os fiscais cadastrados e registre novos usuários
            para acesso ao aplicativo mobile.
          </p>
        </div>

        <button
          className={estilos.botaoCadastrar}
          onClick={() => setModalAberto(true)}
        >
          <UserPlus size={20} weight="bold" />
          Cadastrar fiscal
        </button>
      </div>

      <section className={estilos.areaUsuarios}>
        <div className={estilos.topoLista}>
          <div>
            <h3 className={estilos.tituloLista}>
              Fiscais cadastrados
            </h3>
            <p className={estilos.descricaoLista}>
              {usuarios.length} usuários registrados
            </p>
          </div>

          <div className={estilos.campoBusca}>
            <MagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className={estilos.tabelaContainer}>
          <table className={estilos.tabela}>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>E-mail</th>
                <th className={estilos.colunaAcao}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <div className={estilos.usuarioTabela}>
                      <UserCircle
                        size={38}
                        weight="regular"
                        className={estilos.iconeUsuario}
                      />

                      <span>{usuario.nome}</span>
                    </div>
                  </td>

                  <td>{usuario.email}</td>

                  <td className={estilos.colunaAcao}>
                    <span className={estilos.acoesIndisponiveis}>
                      —
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {usuariosFiltrados.length === 0 && (
            <div className={estilos.mensagemVazia}>
              <UserCircle size={42} />
              <p>Nenhum usuário encontrado.</p>
            </div>
          )}
        </div>
      </section>

      {modalAberto && (
        <div className={estilos.overlayModal}>
          <div className={estilos.modal}>
            <div className={estilos.cabecalhoModal}>
              <div>
                <h3>Cadastrar fiscal</h3>
                <p>Preencha os dados do novo usuário.</p>
              </div>

              <button
                className={estilos.botaoFechar}
                onClick={() => setModalAberto(false)}
                type="button"
              >
                <X size={22} />
              </button>
            </div>

            <form
              className={estilos.formulario}
              onSubmit={cadastrarUsuario}
            >
              <div className={estilos.campoFormulario}>
                <label htmlFor="nome">Nome completo</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do fiscal"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className={estilos.campoFormulario}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite o e-mail institucional"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={estilos.campoFormulario}>
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="Digite a senha de acesso"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <div className={estilos.botoesModal}>
                <button
                  type="button"
                  className={estilos.botaoCancelar}
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={estilos.botaoSalvar}
                >
                  Cadastrar fiscal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
