import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let version = "";
  let max_connections = "";
  let opened_connections = "";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    version = data.dependencies.database.version;
    max_connections = data.dependencies.database.max_connections;
    opened_connections = data.dependencies.database.opened_connections;
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
      <div>Versão do banco de dados: {version}</div>
      <div>Máximo de Conexões: {max_connections}</div>
      <div>Conexões Abertas: {opened_connections}</div>
    </>
  );
}
