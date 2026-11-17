"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  ArrowLeftIcon,
  FileTextIcon,
  CurrencyDollarIcon,
  UserIcon,
  BriefcaseIcon,
  LinkIcon,
} from "@phosphor-icons/react";

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
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
    categoria: "",
    situacaoContrato: "",
    situacaoGov: "",
    naturezaContrato: "",
    processoCelebracao: "",
    notaEmpenho: "",
    dadosLicitacao: "",
    processoGestao: "",
    portariaFiscalizacao: "",
    linkPastaGestao: "",
    linkProcessoEletronico: "",
    linkPregaoSRP: "",
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
      <Link href="/contratos" className={styles.botaoVoltar}>
        <ArrowLeftIcon size={20} />
      </Link>

      <h1 className={styles.titulo}>GerencIF</h1>
      <p className={styles.subtitulo}>
        Sistema de Gerenciamento de Contratos do IFPB - Campus Esperança
      </p>

      <h1 className={styles.tituloNovo}>Novo Contrato</h1>
      <div className={styles.gradeCartoes}>
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
        <div className={styles.bordaCard}>
          <h2 className={styles.tituloCard}>Empresa</h2>

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
                <label>Razao Social</label>
                <input
                  className={styles.input}
                  type="text"
                  name="razao social"
                  onChange={handleChange}
                  value={form.razaoSocial}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Nome Fantasia</label>
                <input
                  className={styles.input}
                  type="text"
                  name="nome fantasia"
                  onChange={handleChange}
                  value={form.nomeFantasia}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>CNPJ</label>
                <input
                  className={styles.input}
                  type="text"
                  name="cnpj"
                  onChange={handleChange}
                  value={form.cnpj}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>E-mail</label>
                <input
                  className={styles.input}
                  type="e-mail"
                  name="e-mail"
                  onChange={handleChange}
                  value={form.email}
                  placeholder="exemplo@gmail.com"
                />
              </div>

              <div className={styles.field}>
                <label>Telefone</label>
                <input
                  className={styles.input}
                  type="text"
                  name="telefone"
                  onChange={handleChange}
                  value={form.telefone}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Endereço</label>
                <input
                  className={styles.input}
                  type="text"
                  name="endereco"
                  onChange={handleChange}
                  value={form.endereco}
                  placeholder="Digite aqui"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.bordaCard}>
          <h2 className={styles.tituloCard}>Classificação</h2>

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
                <label>Categoria</label>
                <input
                  className={styles.input}
                  type="text"
                  name="categoria"
                  onChange={handleChange}
                  value={form.categoria}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Situação do contrato</label>
                <input
                  className={styles.input}
                  type="text"
                  name="situacao do contrato"
                  onChange={handleChange}
                  value={form.situacaoContrato}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Situação do Gov</label>
                <input
                  className={styles.input}
                  type="text"
                  name="situacao do gov"
                  onChange={handleChange}
                  value={form.situacaoGov}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Natureza do contrato</label>
                <input
                  className={styles.input}
                  type="text"
                  name="natureza do contrato"
                  onChange={handleChange}
                  value={form.naturezaContrato}
                  placeholder="Digite aqui"
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.bordaCard}>
          <h2 className={styles.tituloCard}>Processos e Documentos</h2>

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
                <label>Nº Processo de Celebração</label>
                <input
                  className={styles.input}
                  type="text"
                  name="Nº Processo de Celebração"
                  onChange={handleChange}
                  value={form.processoCelebracao}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Nota de Empenho</label>
                <input
                  className={styles.input}
                  type="text"
                  name="nota de empenho"
                  onChange={handleChange}
                  value={form.notaEmpenho}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Dados da Licitação</label>
                <input
                  className={styles.input}
                  type="text"
                  name="dadosLicitacao"
                  onChange={handleChange}
                  value={form.dadosLicitacao}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Processo de Gestão</label>
                <input
                  className={styles.input}
                  type="text"
                  name="Processo de gestao"
                  onChange={handleChange}
                  value={form.processoGestao}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Portaria de Fiscalização</label>
                <input
                  className={styles.input}
                  type="text"
                  name="Portaria de fiscalizacao"
                  onChange={handleChange}
                  value={form.portariaFiscalizacao}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Link da Pasta de Gestão</label>
                <input
                  className={styles.input}
                  type="text"
                  name="Portaria de fiscalizacao"
                  onChange={handleChange}
                  value={form.linkPastaGestao}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Link do Processo Eletrônico</label>
                <input
                  className={styles.input}
                  type="text"
                  name="link do processo eletronico"
                  onChange={handleChange}
                  value={form.linkProcessoEletronico}
                  placeholder="Digite aqui"
                />
              </div>

              <div className={styles.field}>
                <label>Link do Pregão SRP</label>
                <input
                  className={styles.input}
                  type="text"
                  name="link do pregao srp"
                  onChange={handleChange}
                  value={form.linkPregaoSRP}
                  placeholder="Digite aqui"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
