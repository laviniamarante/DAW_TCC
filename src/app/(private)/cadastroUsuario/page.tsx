"use client"

import { useState } from "react";
import estilos from "./page.module.css";

export default function Cadastrar() {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <main className={estilos.container}>
            <div className={estilos.cartao}>

                <div className={estilos.cabecalho}>
                    <h1 className={estilos.titulo}>GerencIF</h1>

                    <p className={estilos.subtitulo}>
                        Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
                    </p>
                </div>

                <form className={estilos.formulario}>

                    <label>Nome:</label>
                    <div className={estilos.containerCampo}>
                        <input
                            type="text"
                            placeholder="Digite o nome do novo usuário"
                        />
                    </div>

                    <label>Email:</label>
                    <div className={estilos.containerCampo}>
                        <input
                            type="email"
                            placeholder="usuario@ifpb.edu.br"
                        />
                    </div>

                    <label>Senha:</label>
                    <div className={estilos.containerCampo}>
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="••••••••••••••••••"
                        />
                    </div>

                    <button type="submit" className={estilos.botaoLogin}>
                        Cadastrar novo usuário
                    </button>

                </form>
            </div>
        </main>
    );
}

