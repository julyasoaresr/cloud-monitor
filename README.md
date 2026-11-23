
# Cloud Monitor

Projeto de monitoramento de aplicações desenvolvido com Python, FastAPI, Docker, Docker Compose e Prometheus.

O Cloud Monitor é uma aplicação que permite acompanhar a disponibilidade de um serviço, consultar métricas de funcionamento e visualizar informações de monitoramento em um dashboard web próprio.

O projeto foi desenvolvido como laboratório prático de estudos em DevOps, Cloud Operations, monitoramento e automação.

## Dashboard

O projeto possui uma interface web própria para visualizar o estado da aplicação e acompanhar suas métricas.

O dashboard apresenta:

- Status de disponibilidade do serviço.
- Total de requisições recebidas.
- Estado do monitoramento.
- Gráfico de atividade das requisições.
- Atualização automática dos indicadores a cada 5 segundos.

A interface foi desenvolvida com HTML, CSS e JavaScript, consumindo os endpoints disponibilizados pela API FastAPI.

## Objetivos

- Desenvolver uma API utilizando FastAPI.
- Implementar um endpoint de verificação de saúde (health check).
- Disponibilizar métricas para monitoramento.
- Construir um dashboard de monitoramento.
- Containerizar a aplicação com Docker.
- Gerenciar serviços com Docker Compose.
- Configurar o Prometheus para coletar métricas.
- Implementar testes automatizados.
- Configurar integração contínua com GitHub Actions.
- Documentar procedimentos de diagnóstico e recuperação de incidentes.

## Tecnologias utilizadas

- Python 3.13
- FastAPI
- HTML5
- CSS3
- JavaScript
- Pytest
- HTTPX
- Docker
- Docker Compose
- Prometheus
- Git e GitHub
- GitHub Actions

## Arquitetura

O projeto possui dois serviços principais:

1. **Cloud Monitor:** aplicação responsável por disponibilizar os endpoints, métricas e dashboard.
2. **Prometheus:** ferramenta responsável por coletar e consultar as métricas da aplicação.

A interface web consulta os endpoints da API para apresentar informações atualizadas.

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
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
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

## Acessando a aplicação

Após iniciar os containers, os serviços estarão disponíveis localmente:

| Serviço | Endereço |
|---|---|
| Dashboard Cloud Monitor | http://localhost:8000 |
| Prometheus | http://localhost:9090 |
| Documentação da API | http://localhost:8000/docs |

## Endpoints da API

| Endpoint | Descrição |
|---|---|
| `/` | Dashboard web |
| `/api` | Mensagem de funcionamento da aplicação |
| `/health` | Verificação de saúde do serviço |
| `/metrics` | Exposição de métricas para o Prometheus |
| `/docs` | Documentação interativa da API |

## Monitoramento

O Prometheus coleta métricas da aplicação a cada 5 segundos.

Interface:

http://localhost:9090

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

- Entrega da página inicial em HTML.
- Funcionamento do endpoint `/api`.
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
- Construção de interfaces web com HTML, CSS e JavaScript.
- Containerização de aplicações.
- Comunicação entre serviços em containers.
- Monitoramento e exposição de métricas.
- Construção de dashboards.
- Testes automatizados.
- Integração contínua.
- Versionamento com Git.
- Documentação de incidentes.

## Melhorias futuras

- Ampliação das métricas monitoradas.
- Implementação de alertas.
- Monitoramento de recursos dos containers.
- Implantação em ambiente de nuvem.
- Histórico persistente de métricas.
