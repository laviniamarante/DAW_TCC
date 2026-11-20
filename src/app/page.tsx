"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function fazerLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      console.error("Erro no login:", error);
      setErro("E-mail ou senha inválidos.");
      setCarregando(false);
      return;
    }

    router.push("/inicial");
  }

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

        <form className={styles.form} onSubmit={fazerLogin}>
          <label>E-mail</label>

          <div className={styles.inputContainer}>
            <MdOutlineAttachEmail className={styles.icon} />

            <input
              type="email"
              placeholder="seu.email@ifpb.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Senha</label>

          <div className={styles.inputContainer}>
            <RiLockPasswordLine className={styles.icon} />

            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••••••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
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

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}