"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { List, FileText, X, House, Folders } from "@phosphor-icons/react";
import styles from "./layout.module.css";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <List size={26} />
          </button>
          <div className={styles.logoContainer}>
            <FileText size={28} />
            <div className={styles.logoText}>
              <h1>GerencIF</h1>
              <span>Gestão de Contratos</span>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay e Drawer (Menu Lateral) */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
      )}

      <aside
        className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ""}`}
      >
        <div className={styles.drawerHeader}>
          <h2>Navegação</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={styles.closeBtn}
          >
            <X size={22} />
          </button>
        </div>
        <nav className={styles.navList}>
          <Link
            href="/pagInicial"
            className={styles.navItem}
            onClick={() => setIsMenuOpen(false)}
          >
            <House size={20} />
            Página Inicial
          </Link>
          <Link
            href="/contratos"
            className={styles.navItem}
            onClick={() => setIsMenuOpen(false)}
          >
            <Folders size={20} />
            Todos os Contratos
          </Link>
        </nav>
      </aside>

      {children}
    </>
  );
}
