
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from prometheus_client import Counter, generate_latest

app = FastAPI(title="Cloud Monitor")

# Caminho dos arquivos da interface
STATIC_DIR = Path(__file__).resolve().parent.parent / "static"

# Contador de requisições
requests_total = Counter(
    "http_requests_total",
    "Total de requisições recebidas"
)

# Disponibiliza CSS e JavaScript
app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static"
)


@app.get("/")
def dashboard():
    requests_total.inc()
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api")
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
