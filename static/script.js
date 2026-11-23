
const healthValue = document.getElementById("health-value");
const requestsValue = document.getElementById("requests-value");
const monitoringValue = document.getElementById("monitoring-value");
const serviceStatus = document.getElementById("service-status");
const lastUpdate = document.getElementById("last-update");

const canvas = document.getElementById("requests-chart");
const ctx = canvas.getContext("2d");

const history = [];
const maxPoints = 20;

// Busca a saúde da aplicação
async function checkHealth() {
    try {
        const response = await fetch("/health");

        if (!response.ok) {
            throw new Error("Serviço indisponível");
        }

        const data = await response.json();

        healthValue.textContent = "Online";

        serviceStatus.textContent = "● Serviço operacional";
        serviceStatus.className = "status-badge online";

        return data;

    } catch (error) {
        healthValue.textContent = "Offline";

        serviceStatus.textContent = "● Serviço indisponível";
        serviceStatus.className = "status-badge offline";

        return null;
    }
}

// Busca as métricas disponibilizadas pela aplicação
async function getMetrics() {
    try {
        const response = await fetch("/metrics");

        if (!response.ok) {
            throw new Error("Não foi possível obter métricas");
        }

        const metrics = await response.text();

        const match = metrics.match(
            /^http_requests_total(?:\{[^}]*\})?\s+([\d.eE+-]+)/m
        );

        if (match) {
            const total = Number(match[1]);

            requestsValue.textContent = total.toLocaleString("pt-BR");

            history.push(total);

            if (history.length > maxPoints) {
                history.shift();
            }

            drawChart();
        }

        monitoringValue.textContent = "Ativo";

    } catch (error) {
        monitoringValue.textContent = "Indisponível";
        console.error("Erro ao buscar métricas:", error);
    }
}

// Desenha o gráfico de requisições
function drawChart() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.clearRect(0, 0, width, height);

    if (history.length === 0) {
        ctx.fillStyle = "#8b9bb4";
        ctx.font = "13px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "Aguardando dados...",
            width / 2,
            height / 2
        );
        return;
    }

    const padding = 35;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const minValue = Math.min(...history);
    const maxValue = Math.max(...history);

    const range = Math.max(maxValue - minValue, 1);

    // Linhas de referência
    ctx.strokeStyle = "#26344b";
    ctx.lineWidth = 1;

    for (let i = 0; i < 4; i++) {
        const y = padding + (chartHeight / 3) * i;

        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Linha do gráfico
    ctx.beginPath();

    history.forEach((value, index) => {
        const x = history.length === 1
            ? width / 2
            : padding + (index / (history.length - 1)) * chartWidth;

        const y = padding + chartHeight -
            ((value - minValue) / range) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle = "#5794f2";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    // Pontos do gráfico
    history.forEach((value, index) => {
        const x = history.length === 1
            ? width / 2
            : padding + (index / (history.length - 1)) * chartWidth;

        const y = padding + chartHeight -
            ((value - minValue) / range) * chartHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#5794f2";
        ctx.fill();
    });
}

// Atualiza o horário da última consulta
function updateTime() {
    const now = new Date();

    lastUpdate.textContent =
        "Última atualização: " +
        now.toLocaleTimeString("pt-BR");
}

// Atualização geral do dashboard
async function updateDashboard() {
    await checkHealth();
    await getMetrics();
    updateTime();
}

// Primeira consulta
updateDashboard();

// Atualização automática a cada 5 segundos
setInterval(updateDashboard, 5000);

// Redesenha o gráfico quando a tela muda de tamanho
window.addEventListener("resize", drawChart);
