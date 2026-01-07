#!/bin/bash
echo "=== BUILD FINAL DHT11 ==="
echo ""

# Configurar ambiente
source ~/esp/v5.5.2/esp-idf/export.sh

cd ~/esp/dth11

# Verificar arquivos
echo "Verificando arquivos..."
if [ ! -f "main/main.c" ]; then
    echo "❌ ERRO: main/main.c não encontrado!"
    exit 1
fi

if [ ! -f "main/CMakeLists.txt" ]; then
    echo "Criando main/CMakeLists.txt..."
    cat > main/CMakeLists.txt << 'EOF'
idf_component_register(SRCS "main.c"
                    INCLUDE_DIRS "."
                    REQUIRES 
                        esp_wifi
                        esp_http_server
                        esp_rom
                        esp_event
                        nvs_flash
                        driver
                        esp_netif)
EOF
fi

if [ ! -f "CMakeLists.txt" ]; then
    echo "Criando CMakeLists.txt..."
    cat > CMakeLists.txt << 'EOF'
cmake_minimum_required(VERSION 3.16)
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(dth11)
EOF
fi

# Limpar e configurar
echo "Limpando build anterior..."
rm -rf build sdkconfig 2>/dev/null

echo "Configurando para ESP32-S2..."
idf.py set-target esp32s2

# Build
echo "Compilando..."
idf.py build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉🎉🎉 BUILD SUCESSO! 🎉🎉🎉"
    echo ""
    echo "Para flashear:"
    echo "  idf.py -p /dev/ttyACM0 flash monitor"
    echo ""
    echo "Lembre-se de:"
    echo "1. Configurar WiFi no código (linhas 12-13 do main.c)"
    echo "2. Conectar Franzininho via USB"
    echo "3. Acessar o IP no navegador"
else
    echo "❌ Build falhou!"
    echo "Verifique o erro acima."
fi
