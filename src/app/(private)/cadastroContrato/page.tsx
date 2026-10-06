"use client"
import { useState } from "react"
import Link from "next/link";
import styles from "./page.module.css"


export default function NovoContrato() {
    const [form, setForm] = useState({

    })
    return (
      <main className={styles.container}>
        <h1 className={styles.titulo}>GerencIF</h1>
        <p className={styles.subtitulo}>
          Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
        </p>
        <h1>Novo Contrato</h1>
        
     <div className={styles.cardInicial}></div>
        
        <Link href="/inicial">←</Link>
      </main>
    );
}