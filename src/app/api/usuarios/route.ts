
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const secretKey = process.env.SUPABASE_SECRET_KEY!;

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { erro: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const supabaseAuth = createClient(supabaseUrl, publicKey);

    const { data: autenticado, error: erroAuth } =
      await supabaseAuth.auth.getUser(token);

    if (erroAuth || !autenticado.user) {
      return NextResponse.json(
        { erro: "Sessão inválida." },
        { status: 401 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: gestor, error: erroGestor } = await supabaseAdmin
      .from("pessoa")
      .select("perfil")
      .eq("id_auth", autenticado.user.id)
      .single();

    const perfil = gestor?.perfil?.trim().toLowerCase();

    if (erroGestor || perfil !== "gestor") {
    return NextResponse.json(
        { erro: "Apenas gestores podem visualizar os fiscais." },
        { status: 403 }
    );
    }

    const { data: usuarios, error } = await supabaseAdmin
      .from("pessoa")
      .select("id_pessoa, nome, email")
      .eq("perfil", "fiscal")
      .order("nome");

    if (error) {
      return NextResponse.json(
        { erro: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(usuarios);
  } catch {
    return NextResponse.json(
      { erro: "Erro interno ao buscar usuários." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const secretKey = process.env.SUPABASE_SECRET_KEY!;

    // Verifica quem está realizando a solicitação
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { erro: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const supabaseAuth = createClient(supabaseUrl, publicKey);

    const { data: autenticado, error: erroAuth } =
      await supabaseAuth.auth.getUser(token);

    if (erroAuth || !autenticado.user) {
      return NextResponse.json(
        { erro: "Sessão inválida." },
        { status: 401 }
      );
    }

    // Cliente administrativo, utilizado somente no servidor
    const supabaseAdmin = createClient(supabaseUrl, secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verifica se o usuário que está cadastrando é gestor
    const { data: gestor, error: erroGestor } = await supabaseAdmin
      .from("pessoa")
      .select("perfil")
      .eq("id_auth", autenticado.user.id)
      .single();

    const perfil = gestor?.perfil?.trim().toLowerCase();

    if (erroGestor || perfil !== "gestor") {
      return NextResponse.json(
        { erro: "Apenas gestores podem cadastrar fiscais." },
        { status: 403 }
      );
    }

    const { nome, email, senha } = await req.json();

    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !nome.trim() ||
      !email.trim() ||
      senha.length < 6
    ) {
      return NextResponse.json(
        { erro: "Dados inválidos para cadastro." },
        { status: 400 }
      );
    }

    // Cria a conta de autenticação
    const { data: novoAuth, error: erroCadastro } =
      await supabaseAdmin.auth.admin.createUser({
        email: email.trim(),
        password: senha,
      });

    if (erroCadastro || !novoAuth.user) {
      return NextResponse.json(
        { erro: erroCadastro?.message || "Erro ao criar usuário." },
        { status: 400 }
      );
    }

    // Registra os dados na tabela pessoa
    const { error: erroPessoa } = await supabaseAdmin
      .from("pessoa")
      .insert({
        nome: nome.trim(),
        email: email.trim(),
        perfil: "fiscal",
        id_auth: novoAuth.user.id,
      });

    if (erroPessoa) {
      // Remove a conta de autenticação se o cadastro da pessoa falhar
      await supabaseAdmin.auth.admin.deleteUser(novoAuth.user.id);

      return NextResponse.json(
        { erro: erroPessoa.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { mensagem: "Fiscal cadastrado com sucesso!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { erro: "Erro interno ao cadastrar usuário." },
      { status: 500 }
    );
  }
}
