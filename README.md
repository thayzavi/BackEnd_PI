🌊 Sistema de Monitoramento e Alerta de Enchentes – Back-end (API)

Este repositório contém o back-end do sistema de monitoramento e alerta de enchentes utilizando IoT, desenvolvido com o objetivo de oferecer uma solução automatizada, acessível e eficiente para prevenção de desastres naturais.
O sistema integra ESP32, sensor ultrassônico para medição de nível da água.

📡 Arquitetura Geral do Sistema

- Fluxo de funcionamento:
O ESP32 coleta em tempo real o nível da água usando um sensor ultrassônico.
O dispositivo envia os dados para esta API Back-end.

- A API:
Armazena as medições 🔎
Analisa se o nível ultrapassou limites definidos ⚠️
