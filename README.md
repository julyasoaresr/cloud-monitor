# Cloud Monitor

Um projeto de monitoramento de aplicações desenvolvido com Python, FastAPI, Docker e Prometheus.

O objetivo é construir uma aplicação capaz de disponibilizar métricas de funcionamento e permitir o acompanhamento de sua disponibilidade por meio de ferramentas de monitoramento.

## Objetivos

- Desenvolver uma API utilizando FastAPI.
- Implementar um endpoint de verificação de saúde (*health check*).
- Disponibilizar métricas para monitoramento.
- Containerizar a aplicação com Docker.
- Gerenciar serviços com Docker Compose.
- Configurar o Prometheus para coletar métricas.

## Tecnologias utilizadas

- Python
- FastAPI
- Prometheus Client
- Docker
- Docker Compose
- Prometheus

## Arquitetura

O projeto possui dois serviços principais:

1. **Cloud Monitor:** aplicação responsável por disponibilizar os endpoints e métricas.
2. **Prometheus:** ferramenta responsável por coletar e consultar as métricas da aplicação.

## Estrutura do projeto

```text
cloud-monitor/
├── app/
│   ├── main.py
│   └── requirements.txt
├── prometheus/
│   └── prometheus.yml
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Como executar

É necessário ter Docker Desktop e Docker Compose instalados.

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd cloud-monitor
```

Inicie os serviços:

```bash
docker compose up -d --build
```

## Endpoints disponíveis

| Endpoint | Descrição |
|---|---|
| `/` | Página inicial da aplicação |
| `/health` | Verificação de saúde do serviço |
| `/metrics` | Exposição de métricas para o Prometheus |
| `/docs` | Documentação interativa da API |

## Monitoramento

O Prometheus coleta métricas da aplicação a cada 5 segundos.

A interface pode ser acessada em:

`http://localhost:9090`

Consulta de disponibilidade:

```promql
up
```

Consulta de requisições:

```promql
http_requests_total
```

## Aprendizados

Este projeto foi desenvolvido com foco no aprendizado prático de:

- Containerização de aplicações.
- Comunicação entre serviços em containers.
- Monitoramento de aplicações.
- Exposição e coleta de métricas.
- Uso de ambientes Linux e Docker.

## Melhorias futuras

- Implementação de testes automatizados.
- Integração contínua com GitHub Actions.
- Ampliação das métricas monitoradas.
- Documentação de incidentes e procedimentos de recuperação.
