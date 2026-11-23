
# Cloud Monitor

Projeto de monitoramento de aplicações desenvolvido com Python, FastAPI, Docker, Docker Compose e Prometheus.

O objetivo é construir uma aplicação capaz de disponibilizar métricas de funcionamento, verificar sua disponibilidade e permitir o acompanhamento de seu estado por meio de ferramentas de monitoramento.

## Objetivos

- Desenvolver uma API utilizando FastAPI.
- Implementar um endpoint de verificação de saúde (*health check*).
- Disponibilizar métricas para monitoramento.
- Containerizar a aplicação com Docker.
- Gerenciar serviços com Docker Compose.
- Configurar o Prometheus para coletar métricas.
- Implementar testes automatizados.
- Configurar integração contínua com GitHub Actions.
- Documentar procedimentos de diagnóstico e recuperação de incidentes.

## Tecnologias utilizadas

- Python 3.13
- FastAPI
- Pytest
- HTTPX
- Docker
- Docker Compose
- Prometheus
- Git e GitHub
- GitHub Actions

## Arquitetura

O projeto possui dois serviços principais:

1. **Cloud Monitor:** aplicação responsável por disponibilizar os endpoints e métricas.
2. **Prometheus:** ferramenta responsável por coletar e consultar as métricas da aplicação.

## Estrutura do projeto

```text
cloud-monitor/
├── .github/
│   └── workflows/
│       └── tests.yml
├── app/
│   ├── main.py
│   └── requirements.txt
├── docs/
│   └── runbook.md
├── prometheus/
│   └── prometheus.yml
├── tests/
│   └── test_main.py
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── requirements-dev.txt
└── README.md
```

## Como executar

É necessário ter Docker Desktop e Docker Compose instalados.

Clone o repositório:

```bash
git clone https://github.com/julyasoaresr/cloud-monitor.git
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

Interface:

`http://localhost:9090`

Consulta de disponibilidade:

```promql
up
```

Consulta de requisições:

```promql
http_requests_total
```

## Testes automatizados

O projeto utiliza Pytest para verificar o funcionamento dos endpoints.

Instale as dependências de desenvolvimento:

```bash
pip install -r requirements-dev.txt
```

Execute os testes:

```bash
python -m pytest -v
```

Os testes verificam:

- Funcionamento da página inicial.
- Disponibilidade do endpoint `/health`.
- Exposição das métricas no endpoint `/metrics`.

## Integração contínua

O GitHub Actions executa automaticamente os testes quando alterações são enviadas para a branch `main` ou quando um Pull Request é aberto para essa branch.

O pipeline realiza:

1. Download do código.
2. Configuração do ambiente Python.
3. Instalação das dependências.
4. Execução dos testes automatizados.

## Documentação operacional

O arquivo `docs/runbook.md` apresenta procedimentos para diagnosticar e resolver problemas de disponibilidade da aplicação e do Prometheus.

## Aprendizados

- Desenvolvimento de APIs com Python e FastAPI.
- Containerização de aplicações.
- Comunicação entre serviços em containers.
- Monitoramento e exposição de métricas.
- Testes automatizados.
- Integração contínua.
- Versionamento com Git.
- Documentação de incidentes.

## Melhorias futuras

- Ampliação das métricas monitoradas.
- Implementação de alertas.
- Monitoramento de recursos dos containers.
- Implantação em ambiente de nuvem.