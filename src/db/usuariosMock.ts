export interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  papel: "Gestor de Contratos" | "Fiscal" | "Direção Escolar";
}

// Usuário logado no momento (ainda sem sistema de autenticação real).
// Quando a autenticação existir, isso deve vir da sessão, não do mock.
export const USUARIO_LOGADO: Usuario = {
  id_usuario: 1,
  nome: "Avaete de Lunetta e Rodrigues Guerra",
  email: "avaete.guerra@ifpb.edu.br",
  papel: "Gestor de Contratos",
};

export const USUARIOS_MOCK: Usuario[] = [
  USUARIO_LOGADO,
  {
    id_usuario: 2,
    nome: "Alan Kleydson Rocha Diniz",
    email: "alan.diniz@ifpb.edu.br",
    papel: "Fiscal",
  },
  {
    id_usuario: 3,
    nome: "Maria das Graças Oliveira",
    email: "maria.oliveira@ifpb.edu.br",
    papel: "Direção Escolar",
  },
];