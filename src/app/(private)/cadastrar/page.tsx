"use client"
import { useState, ChangeEvent } from "react";
import styles from "./page.module.css";

export default function Cadastrar(){
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [cpf, setCpf] = useState("");
    
const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }

  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  setCpf(valor);
};

    return (
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>GerencIF</h1>

            <p className={styles.subtitle}>
              Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
            </p>

            <h3></h3>
          </div>

          <form className={styles.form}>
            <label>Nome:</label>
            <div className={styles.inputContainer}>
              <input
                type="name"
                placeholder="Digite o nome do novo usuário"
              ></input>
            </div>

            <label>CPF:</label>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                maxLength={14}
              />
            </div>
            <label>Email:</label>
            <div className={styles.inputContainer}>
              <input type="email" placeholder="usuario@ifpb.edu.br" />
            </div>
            <label>Matrícula:</label>
            <div className={styles.inputContainer}>
              <input type="matricula" placeholder="Digite a matrícula" />
            </div>
            <label>Senha</label>
            <div className={styles.inputContainer}>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••••••••••••"
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              Cadastrar novo usuário
            </button>
          </form>
        </div>
      </main>
    );

}