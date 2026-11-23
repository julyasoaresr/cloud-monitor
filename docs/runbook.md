# Runbook — Cloud Monitor

## 1. Objetivo

Este documento descreve os procedimentos para identificar, diagnosticar e resolver problemas de disponibilidade da aplicação Cloud Monitor e do serviço Prometheus.

## 2. Arquitetura monitorada

O ambiente possui dois serviços principais:

- **cloud-monitor:** aplicação desenvolvida com Python e FastAPI.
- **prometheus:** ferramenta responsável por coletar as métricas da aplicação.

## 3. Incidente: aplicação indisponível

**Sintoma:** a aplicação não responde ao acessar `http://localhost:8000`.

### Diagnóstico

Verificar se os containers estão em execução:

```bash
docker ps
```

Consultar os logs da aplicação:

```bash
docker logs cloud-monitor
```

### Resolução

Se o container estiver parado, verificar seu estado:

```bash
docker ps -a
```

Tentar iniciar novamente:

```bash
docker start cloud-monitor
```

Se necessário, recriar os serviços:

```bash
docker compose up -d --build
```

### Validação

Acessar:

`http://localhost:8000/health`

Resultado esperado:

```json
{
  "status": "healthy",
  "service": "cloud-monitor"
}
```

## 4. Incidente: Prometheus não coleta métricas

**Sintoma:** o serviço aparece como DOWN na página de targets.

### Diagnóstico

Verificar os containers:

```bash
docker ps
```

Consultar os logs do Prometheus:

```bash
docker logs prometheus
```

Acessar:

`http://localhost:9090/targets`

### Resolução

Reiniciar o Prometheus:

```bash
docker restart prometheus
```

Se o problema persistir, verificar a configuração em `prometheus/prometheus.yml` e conferir se o alvo está definido como `cloud-monitor:8000`.

### Validação

Na interface do Prometheus, executar:

```promql
up
```

O resultado esperado para os serviços monitorados é `1`.

## 5. Verificação de logs

Para acompanhar os logs da aplicação em tempo real:

```bash
docker logs -f cloud-monitor
```

Para interromper a visualização, pressionar `Ctrl + C`.

## 6. Encerramento do ambiente

Para parar os serviços sem remover os arquivos do projeto:

```bash
docker compose down
```

## 7. Critérios de recuperação

O incidente pode ser considerado resolvido quando:

- O container da aplicação estiver em execução.
- O endpoint `/health` retornar status `healthy`.
- O Prometheus identificar o alvo como UP.
- As métricas estiverem disponíveis no endpoint `/metrics`.

## 8. Observação

Este runbook foi desenvolvido para um ambiente local de laboratório, com finalidade educacional. Os procedimentos devem ser adaptados antes de serem utilizados em ambientes de produção.