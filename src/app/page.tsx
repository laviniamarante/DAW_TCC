
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
      <div className={styles.loginLayout}>

        {/* LADO VERDE */}
        <section className={styles.painelVerde}>

          <div className={styles.brandLeft}>
            <div className={styles.logoContainer}>
              <Image
                src="/logo.png"
                alt="Logo GerencIF"
                width={36}
                height={36}
                className={styles.logo}
                priority
              />
            </div>

            <span className={styles.brandName}>GerencIF</span>
          </div>

          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>
              Gestão de contratos
              <br />
              do campus
            </h1>

            <p className={styles.welcomeSubtitle}>
              Sistema de gerenciamento de contratos do IFPB Campus Esperança.
            </p>
          </div>

          <div className={styles.campusFooter}>
            IFPB - Campus Esperança
          </div>

        </section>

        {/* LADO BRANCO */}
        <section className={styles.painelBranco}>

          <div className={styles.formContent}>

            <div className={styles.formHeader}>
              <h1 className={styles.loginTitle}>Entrar</h1>

              <p className={styles.loginSubtitle}>
                Use seu e-mail institucional para acessar.
              </p>
            </div>

            <form className={styles.form} onSubmit={fazerLogin}>

              <label htmlFor="email">E-mail</label>

              <div className={styles.inputContainer}>
                <MdOutlineAttachEmail className={styles.icon} />

                <input
                  id="email"
                  type="email"
                  placeholder="nome@ifpb.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <label htmlFor="senha">Senha</label>

              <div className={styles.inputContainer}>
                <RiLockPasswordLine className={styles.icon} />

                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={
                    mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  {mostrarSenha ? (
                    <FaRegEye className={styles.eyeIcon} />
                  ) : (
                    <FaRegEyeSlash className={styles.eyeIcon} />
                  )}
                </button>
              </div>

              <div className={styles.options}>
                <label className={styles.rememberLabel}>
                  <input type="checkbox" />
                  Lembrar-me
                </label>

                <a href="#" className={styles.forgotPassword}>
                  Esqueci minha senha
                </a>
              </div>

              {erro && (
                <p className={styles.errorMessage}>
                  {erro}
                </p>
              )}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>

            </form>

            <div className={styles.supportFooter}>
              Problemas para acessar? Procure a coordenação de TI do campus.
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
