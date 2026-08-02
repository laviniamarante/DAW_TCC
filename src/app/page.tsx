"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

export default function Home() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <Image
          src="/logo.png"
          alt="Logo GerencIF"
          width={130}
          height={130}
          className={styles.logo}
          priority
        />

        <h1 className={styles.title}>GerencIF</h1>

        <p className={styles.subtitle}>
          Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
        </p>

        <form className={styles.form}>
          <label>E-mail</label>

          <div className={styles.inputContainer}>
            <MdOutlineAttachEmail className={styles.icon} />

            <input
              type="email"
              placeholder="seu.email@ifpb.edu.br"
            />
          </div>

         <label>Senha</label>

<div className={styles.inputContainer}>
  <RiLockPasswordLine className={styles.icon} />

  <input
    type={mostrarSenha ? "text" : "password"}
    placeholder="••••••••••••••••••"
  />

  <span
    className={styles.eyeButton}
    onClick={() => setMostrarSenha(!mostrarSenha)}
  >
    {mostrarSenha ? (
      <FaRegEye className={styles.eyeIcon} />
    ) : (
      <FaRegEyeSlash className={styles.eyeIcon} />
    )}
  </span>
</div>

          <div className={styles.options}>
            <label>
              <input type="checkbox" />
              Lembrar-me
            </label>

            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}