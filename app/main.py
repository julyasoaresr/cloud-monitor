
from fastapi import FastAPI
from prometheus_client import Counter, generate_latest
from fastapi.responses import Response

app = FastAPI(title="Cloud Monitor")

# Contador de requisições
requests_total = Counter(
    "http_requests_total",
    "Total de requisições recebidas"
)

@app.get("/")
def home():
    requests_total.inc()
    return {"message": "Cloud Monitor está funcionando!"}


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "cloud-monitor"
    }


@app.get("/metrics")
def metrics():
    return Response(
        content=generate_latest(),
        media_type="text/plain"
    )
