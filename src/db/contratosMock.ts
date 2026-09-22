export interface Contrato {
  id_contrato: number;
  numero_contrato: string;
  nome_contrato: string;
  nome_contratada: string;
  vigencia: string;
  prorrogavel: boolean;
  data_inicio: string;
  data_final: string;
  numero_processo_celebracao: string;
  prazo_restante: string;
  nota_empenho: string;
  natureza_contrato: string;
  portaria_fiscalizacao: string;
  objeto_contrato: string;
  fiscal_substituto: string;
  dados_licitacao: string;
  processo_gestao: string;
  data_celebracao: string;
  fonte_recurso: string;
  natureza_despesa: string;
  cnpj: string;
  numero_evento: string;
  link_pasta_gestao: string;
  fiscal_titular: string;
  situacao_gov: string;
  endereco_postal: string;
  valor_global: string;
  UASG: string;
  valor_mensal: string;
  cpf_representante: string;
  conta_vinculada: string;
  link_processo_eletronico: string;
  gestor_titular: string;
  plano_interno: string;
  rg_representante: string;
  programa_trabalho: string;
  representante_legal: string;
  gestor_substituto: string;
  email_contato: string;
  link_pregao_SRP: string;
  telefone_contato: string;
  // Campos usados nas páginas de lista (Contratos e Início)
  pagamentosPendentes: number;
  status: "vencido" | "ativo" | "proximo";
  statusRotulo: string;
  diasRestantes: number;
}

export const CONTRATOS_MOCK: Contrato[] = [
  {
    id_contrato: 1,
    numero_contrato: "05/2026",
    nome_contrato: "CT MO 05-2026",
    nome_contratada:
      "KADESCH CONSTRUÇÕES E TERC. DE SERV. DE MÃO DE OBRA LTDA",
    vigencia: "16 meses",
    prorrogavel: true,
    data_inicio: "1-jun.-12",
    data_final: "27-mai.-27",
    numero_processo_celebracao: "23799.000298.2026-61",
    prazo_restante: "12 meses",
    nota_empenho: "2026NE00043",
    natureza_contrato: "Mão de Obra",
    portaria_fiscalizacao: "-",
    objeto_contrato:
      "O objeto do presente instrumento é a contratação de empresa especializada na prestação, de forma contínua e com a dedicação de mão-de-obra, de serviços de apoio administrativo (com fornecimento de materiais e equipamentos), para fins de atendimento das demandas institucionais do campus Esperança do IFPB, nas condições estabelecidas no Termo de Referência.",
    fiscal_substituto: "-",
    dados_licitacao: "Pregão Eletrônico nº 05/2024",
    processo_gestao: "23000.005678/2025-44",
    data_celebracao: "27-mai.-26",
    fonte_recurso: "Funcionamento - 1000000000",
    natureza_despesa: "Serviços com Mão de Obra - Pessoa Jurídica - 339037",
    cnpj: "11.428.002/0001-00",
    numero_evento: "-",
    link_pasta_gestao:
      "https://drive.google.com/drive/folders/13xW7DibejfBfiOmRHyKGWR25xCs1fIeQ?usp=drive_link",
    fiscal_titular: "Alan Kleydson Rocha Diniz",
    situacao_gov: "Ativo / Em Execução",
    endereco_postal:
      "Aprigio Pereira Nepomuceno, 1100 - Jardim Paulistano - Campina Grande/PB - CEP: 58.415-310",
    valor_global: "R$ 376.319,95",
    UASG: "155893",
    valor_mensal: "R$ 31.360,00",
    cpf_representante: "-",
    conta_vinculada: "Ag: 1234-5 / CC: 98765-4",
    link_processo_eletronico:
      "https://suap.ifpb.edu.br/processo_eletronico/processo/342818/",
    gestor_titular: "Avaete de Lunetta e Rodrigues Guerra",
    plano_interno: "L0000P0100N",
    rg_representante: "-",
    programa_trabalho: "Ação de Funcionamento - 231620",
    representante_legal: "Dalva Sayonara Maracajá Ramos dos Santos",
    gestor_substituto: "-",
    email_contato:
      "kadesch.diretoria@gmail.com financeiro.kadesch@gmail.com operacionalkadesch@gmail.com gerencia.kadesch@gmail.com",
    link_pregao_SRP: "https://comprasnet.gov.br/pregao=99",
    telefone_contato: "(83) 3077-4812",
    pagamentosPendentes: 1,
    status: "vencido",
    statusRotulo: "Vencido",
    diasRestantes: 15,
  },
  {
    id_contrato: 2,
    numero_contrato: "01/2025",
    nome_contrato: "Fornecimento de Material de Escritório",
    nome_contratada: "Papelaria Central Ltda",
    vigencia: "12 meses",
    prorrogavel: false,
    data_inicio: "14/01/2025",
    data_final: "30/05/2026",
    numero_processo_celebracao: "-",
    prazo_restante: "-",
    nota_empenho: "-",
    natureza_contrato: "Fornecimento de material",
    portaria_fiscalizacao: "-",
    objeto_contrato:
      "Fornecimento de material de escritório para as demandas do campus Esperança do IFPB.",
    fiscal_substituto: "-",
    dados_licitacao: "-",
    processo_gestao: "-",
    data_celebracao: "-",
    fonte_recurso: "-",
    natureza_despesa: "-",
    cnpj: "-",
    numero_evento: "-",
    link_pasta_gestao: "-",
    fiscal_titular: "-",
    situacao_gov: "Ativo / Em Execução",
    endereco_postal: "-",
    valor_global: "-",
    UASG: "-",
    valor_mensal: "-",
    cpf_representante: "-",
    conta_vinculada: "-",
    link_processo_eletronico: "-",
    gestor_titular: "-",
    plano_interno: "-",
    rg_representante: "-",
    programa_trabalho: "-",
    representante_legal: "-",
    gestor_substituto: "-",
    email_contato: "-",
    link_pregao_SRP: "-",
    telefone_contato: "-",
    pagamentosPendentes: 1,
    status: "proximo",
    statusRotulo: "Próximo do vencimento",
    diasRestantes: 45,
  },
  {
    id_contrato: 3,
    numero_contrato: "02/2025",
    nome_contrato: "Serviços de Limpeza e Conservação",
    nome_contratada: "Limpeza Total Serviços",
    vigencia: "12 meses",
    prorrogavel: false,
    data_inicio: "01/02/2025",
    data_final: "01/02/2026",
    numero_processo_celebracao: "-",
    prazo_restante: "-",
    nota_empenho: "-",
    natureza_contrato: "Serviços",
    portaria_fiscalizacao: "-",
    objeto_contrato:
      "Prestação de serviços de limpeza e conservação nas dependências do campus Esperança do IFPB.",
    fiscal_substituto: "-",
    dados_licitacao: "-",
    processo_gestao: "-",
    data_celebracao: "-",
    fonte_recurso: "-",
    natureza_despesa: "-",
    cnpj: "-",
    numero_evento: "-",
    link_pasta_gestao: "-",
    fiscal_titular: "-",
    situacao_gov: "Ativo / Em Execução",
    endereco_postal: "-",
    valor_global: "-",
    UASG: "-",
    valor_mensal: "-",
    cpf_representante: "-",
    conta_vinculada: "-",
    link_processo_eletronico: "-",
    gestor_titular: "-",
    plano_interno: "-",
    rg_representante: "-",
    programa_trabalho: "-",
    representante_legal: "-",
    gestor_substituto: "-",
    email_contato: "-",
    link_pregao_SRP: "-",
    telefone_contato: "-",
    pagamentosPendentes: 0,
    status: "ativo",
    statusRotulo: "Ativo",
    diasRestantes: 80,
  },
];