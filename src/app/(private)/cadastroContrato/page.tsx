"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";

export default function NovoContrato() {
  const [form, setForm] = useState({ teste: "teste" });
  return (
    <main className={styles.container}>
      <h1 className={styles.titulo}>GerencIF</h1>
      <p className={styles.subtitulo}>
        Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
      </p>
      <h1>Novo Contrato</h1>
      <div className={styles.bordaCard}>
        <div className={styles.field}>
          <label>Empresa Contratada</label>
          <input
            className={styles.input}
            onChange={(e) => setForm({ teste: e.target.value })}
            value={form.teste}
            placeholder="Digite aqui"
          ></input>

          <div className={styles.field}>
            <label>Numero do processo</label>
            <input
              className={styles.input}
              onChange={(e) => setForm({ teste: e.target.value })}
              value={form.teste}
              placeholder="Digite aqui"
            ></input>
          </div>
          <div className={styles.field}>
          <label>Nome Representante</label>
          <input
            className={styles.input}
            onChange={(e) => setForm({ teste: e.target.value })}
            value={form.teste}
            placeholder="Digite aqui"
          ></input>
          </div>
        </div>
      </div>

      <Link href="/inicial">←</Link>
    </main>
  );
}
