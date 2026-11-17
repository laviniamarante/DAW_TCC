"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";

export default function NovoContrato() {
  const [form, setForm] = useState({
    objeto: "",
    identificador: "",
    vigencia: "",
    dataInicio: "",
    dataFim: "",
    prorrogavel: "",
    prazoRestante: "",
    dataCelebracao: "",
    representanteLegal: "",
  });
  const [aberto, setAberto] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <main className={styles.container}>
      <Link href="/inicial">←</Link>

      <h1 className={styles.titulo}>GerencIF</h1>
      <p className={styles.subtitulo}>
        Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
      </p>

      <h1 className={styles.tituloNovo}>Novo Contrato</h1>

      <div className={styles.bordaCard}>
        <h2 className={styles.tituloCard}>Identificação do Contrato</h2>
        
        <button
          type="button"
          className={styles.setaBotao}
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
        >
          <span className={aberto ? styles.setaAberta : styles.seta}>▼</span>
        </button>
        {aberto && (
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Objeto do contrato</label>
            <input
              className={styles.input}
              type="text"
              name="objeto"
              onChange={handleChange}
              value={form.objeto}
              placeholder="Digite aqui"
            />
          </div>

          <div className={styles.field}>
            <label>Identificador do contrato</label>
            <input
              className={styles.input}
              type="text"
              name="identificador"
              onChange={handleChange}
              value={form.identificador}
              placeholder="Digite aqui"
            />
          </div>

          <div className={styles.field}>
            <label>Vigência</label>
            <input
              className={styles.input}
              type="number"
              name="vigencia"
              onChange={handleChange}
              value={form.vigencia}
              placeholder="Digite aqui"
            />
          </div>

          <div className={styles.field}>
            <label>Data de início</label>
            <input
              className={styles.input}
              type="date"
              name="dataInicio"
              onChange={handleChange}
              value={form.dataInicio}
            />
          </div>

          <div className={styles.field}>
            <label>Data de fim</label>
            <input
              className={styles.input}
              type="date"
              name="dataFim"
              onChange={handleChange}
              value={form.dataFim}
            />
          </div>

          <div className={styles.field}>
            <label>Prorrogável</label>
            <input
              className={styles.input}
              type="text"
              name="prorrogavel"
              onChange={handleChange}
              value={form.prorrogavel}
              placeholder="Sim/Não"
            />
          </div>

          <div className={styles.field}>
            <label>Prazo restante</label>
            <input
              className={styles.input}
              type="number"
              name="prazoRestante"
              onChange={handleChange}
              value={form.prazoRestante}
              placeholder="Digite aqui"
            />
          </div>

          <div className={styles.field}>
            <label>Data de celebração</label>
            <input
              className={styles.input}
              type="date"
              name="dataCelebracao"
              onChange={handleChange}
              value={form.dataCelebracao}
            />
          </div>

          <div className={styles.field}>
            <label>Representante Legal</label>
            <input
              className={styles.input}
              type="text"
              name="representanteLegal"
              onChange={handleChange}
              value={form.representanteLegal}
              placeholder="Digite aqui"
            />
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
