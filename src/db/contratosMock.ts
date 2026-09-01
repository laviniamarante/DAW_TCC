export interface ContratoDetalhado {
  id_contrato: number;
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
  cnpj: string,
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
}

export const CONTRATOS_DETALHADOS_MOCK: ContratoDetalhado[] = [
  {
    id_contrato: 1,
    nome_contrato: "CT MO 05-2026",
    nome_contratada: "KADESCH CONSTRUÇÕES E TERC. DE SERV. DE MÃO DE OBRA LTDA",
    vigencia: "16 meses",
    prorrogavel: true,
    data_inicio: "1-jun.-12",
    data_final: "27-mai.-27",
    numero_processo_celebracao: "23799.000298.2026-61",
    prazo_restante: "12 meses",
    nota_empenho: "2026NE00043",
    natureza_contrato: "Mão de Obra",
    portaria_fiscalizacao: "-",
    objeto_contrato: "O objeto do presente instrumento é a contratação de empresa especializada na prestação, de forma contínua e com a dedicação de mão-de-obra, de serviços de apoio administrativo (com fornecimento de materiais e equipamentos), para fins de atendimento das demandas institucionais do campus Esperança do IFPB, nas condições estabelecidas no Termo de Referência.",
    fiscal_substituto: "-",
    dados_licitacao: "Pregão Eletrônico nº 05/2024",
    processo_gestao: "23000.005678/2025-44",
    data_celebracao: "27-mai.-26",
    fonte_recurso: "Funcionamento - 1000000000",
    natureza_despesa: "Serviços com Mão de Obra - Pessoa Jurídica - 339037",
    cnpj: "11.428.002/0001-00",
    numero_evento: "-",
    link_pasta_gestao: "https://drive.google.com/drive/folders/13xW7DibejfBfiOmRHyKGWR25xCs1fIeQ?usp=drive_link",
    fiscal_titular: "Alan Kleydson Rocha Diniz",
    situacao_gov: "Ativo / Em Execução",
    endereco_postal: "Aprigio Pereira Nepomuceno, 1100 - Jardim Paulistano - Campina Grande/PB - CEP: 58.415-310",
    valor_global: "R$ 376.319,95",
    UASG: "155893",
    valor_mensal: "R$ 31.360,00",
    cpf_representante: "-",
    conta_vinculada: "Ag: 1234-5 / CC: 98765-4",
    link_processo_eletronico: "https://suap.ifpb.edu.br/processo_eletronico/processo/342818/",
    gestor_titular: "Avaete de Lunetta e Rodrigues Guerra",
    plano_interno: "L0000P0100N",
    rg_representante: "-",
    programa_trabalho: "Ação de Funcionamento - 231620",
    representante_legal: "Dalva Sayonara Maracajá Ramos dos Santos",
    gestor_substituto: "-",
    email_contato: "kadesch.diretoria@gmail.com financeiro.kadesch@gmail.com operacionalkadesch@gmail.com gerencia.kadesch@gmail.com",
    link_pregao_SRP: "https://comprasnet.gov.br/pregao=99",
    telefone_contato: "(83) 3077-4812"
}
];