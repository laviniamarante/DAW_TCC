import Link from "next/link";

export default function NovoContrato() {
    return (
        <main>
            <Link href="/inicial">
                ←
            </Link>

            <h1>Novo Contrato</h1>
            <p>Cadastre um novo contrato no sistema</p>
        </main>
    );
}