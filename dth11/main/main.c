#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_http_server.h"
#include "nvs_flash.h"
#include "driver/gpio.h"
#include "esp_netif.h"
#include "esp_rom_delay.h"

// ========== CONFIGURAÇÃO ==========
// 🔧 EDITE AQUI COM SEU WIFI!
#define WIFI_SSID      "DRACARYS_5G"
#define WIFI_PASS      "euderlan03"

// Pinos
#define DHT_PIN        GPIO_NUM_4
#define LED_PIN        GPIO_NUM_15

static const char *TAG = "DHT11_WEB";
static float temperatura = 25.0;
static float umidade = 60.0;
static int contador = 0;
// ==================================

// ========== FUNÇÃO DHT11 SIMPLIFICADA ==========
int ler_dht11(float *temp, float *umid) {
    // Simulação para teste
    // REMOVA ESTA SIMULAÇÃO quando conectar o DHT11 real!
    *temp = 25.0 + (contador % 10) * 0.3;
    *umid = 60.0 + (contador % 5) * 1.2;
    
    if (*temp > 32.0) *temp = 22.0;
    if (*umid > 80.0) *umid = 45.0;
    
    return 0;  // Sempre retorna sucesso na simulação
    
    /* // CÓDIGO REAL DO DHT11 (descomente quando conectar)
    uint8_t data[5] = {0};
    
    gpio_set_direction(DHT_PIN, GPIO_MODE_OUTPUT);
    gpio_set_level(DHT_PIN, 0);
    esp_rom_delay_us(18000);
    gpio_set_level(DHT_PIN, 1);
    esp_rom_delay_us(40);
    
    gpio_set_direction(DHT_PIN, GPIO_MODE_INPUT);
    gpio_set_pull_mode(DHT_PIN, GPIO_PULLUP_ONLY);
    
    // ... implementação completa do DHT11
    */
}
// ===============================================

// ========== WIFI ==========
void iniciar_wifi(void) {
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    
    esp_netif_t *netif = esp_netif_create_default_wifi_sta();
    assert(netif);
    
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));
    
    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASS,
        },
    };
    
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    
    ESP_LOGI(TAG, "Conectando ao WiFi: %s", WIFI_SSID);
    ESP_ERROR_CHECK(esp_wifi_start());
    ESP_ERROR_CHECK(esp_wifi_connect());
}

// Event handler para WiFi
static void wifi_event_handler(void* arg, esp_event_base_t event_base,
                               int32_t event_id, void* event_data) {
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        ESP_LOGI(TAG, "WiFi iniciado");
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        ESP_LOGI(TAG, "WiFi desconectado, tentando reconectar...");
        esp_wifi_connect();
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t* event = (ip_event_got_ip_t*) event_data;
        ESP_LOGI(TAG, "✅ CONECTADO! IP: " IPSTR, IP2STR(&event->ip_info.ip));
        ESP_LOGI(TAG, "🌐 Acesse: http://" IPSTR, IP2STR(&event->ip_info.ip));
    }
}
// ==========================

// ========== SERVIDOR WEB ==========
static const char* PAGINA_HTML = 
"<!DOCTYPE html>"
"<html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'>"
"<title>DHT11 - Franzininho</title>"
"<style>"
"body{font-family:Arial;text-align:center;background:#f0f0f0;margin:0;padding:20px;}"
".container{background:white;border-radius:10px;padding:20px;box-shadow:0 0 10px rgba(0,0,0,0.1);max-width:500px;margin:0 auto;}"
"h1{color:#333;}"
".dados{display:flex;justify-content:space-around;margin:20px 0;}"
".card{padding:15px;border-radius:8px;width:45%;}"
".temp{background:#ffe6e6;border:2px solid #ff6b6b;}"
".umid{background:#e6f3ff;border:2px solid #4d96ff;}"
".valor{font-size:2.5em;font-weight:bold;margin:10px 0;}"
".temp .valor{color:#ff6b6b;}"
".umid .valor{color:#4d96ff;}"
".unidade{font-size:1em;color:#666;}"
".info{background:#f8f9fa;padding:10px;border-radius:5px;margin:15px 0;}"
"button{background:#007bff;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-size:1em;}"
"button:hover{background:#0056b3;}"
"</style>"
"<script>"
"function atualizar(){"
"fetch('/dados').then(r=>r.json()).then(data=>{"
"document.getElementById('temperatura').textContent=data.temp.toFixed(1);"
"document.getElementById('umidade').textContent=data.umid.toFixed(1);"
"document.getElementById('contador').textContent=data.contador;"
"});}"
"setInterval(atualizar,5000);window.onload=atualizar;"
"</script></head>"
"<body>"
"<div class='container'>"
"<h1>🌡️ DHT11 - Franzininho S2</h1>"
"<div class='dados'>"
"<div class='card temp'><div class='valor' id='temperatura'>--.-</div><div class='unidade'>°C</div></div>"
"<div class='card umid'><div class='valor' id='umidade'>--.-</div><div class='unidade'>%</div></div>"
"</div>"
"<div class='info'><p>📊 Leituras: <span id='contador'>0</span></p><p>📍 Franzininho ESP32-S2</p></div>"
"<button onclick='atualizar()'>🔄 Atualizar</button>"
"<p><small>Atualiza automaticamente a cada 5s</small></p>"
"</div></body></html>";

// Handler para página principal
static esp_err_t pagina_principal(httpd_req_t *req) {
    httpd_resp_set_type(req, "text/html");
    httpd_resp_send(req, PAGINA_HTML, strlen(PAGINA_HTML));
    return ESP_OK;
}

// Handler para dados JSON
static esp_err_t dados_json(httpd_req_t *req) {
    char resposta[128];
    snprintf(resposta, sizeof(resposta),
        "{\"temp\":%.1f,\"umid\":%.1f,\"contador\":%d}",
        temperatura, umidade, contador);
    
    httpd_resp_set_type(req, "application/json");
    httpd_resp_send(req, resposta, strlen(resposta));
    return ESP_OK;
}

// Iniciar servidor web
void iniciar_servidor_web(void) {
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();
    config.server_port = 80;
    
    httpd_handle_t server = NULL;
    
    if (httpd_start(&server, &config) == ESP_OK) {
        httpd_uri_t pagina = {.uri = "/", .method = HTTP_GET, .handler = pagina_principal};
        httpd_register_uri_handler(server, &pagina);
        
        httpd_uri_t dados = {.uri = "/dados", .method = HTTP_GET, .handler = dados_json};
        httpd_register_uri_handler(server, &dados);
        
        ESP_LOGI(TAG, "✅ Servidor web iniciado na porta 80");
    }
}
// ==================================

// ========== TAREFA DHT11 ==========
void tarefa_dht11(void *parametro) {
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);
    vTaskDelay(3000 / portTICK_PERIOD_MS);
    
    while (1) {
        float temp, umid;
        
        if (ler_dht11(&temp, &umid) == 0) {
            temperatura = temp;
            umidade = umid;
            contador++;
            
            ESP_LOGI(TAG, "Leitura %d: %.1f°C, %.1f%%", contador, temperatura, umidade);
            
            // Piscar LED
            gpio_set_level(LED_PIN, 1);
            vTaskDelay(100 / portTICK_PERIOD_MS);
            gpio_set_level(LED_PIN, 0);
        }
        
        vTaskDelay(2000 / portTICK_PERIOD_MS);
    }
}
// ==================================

// ========== MAIN ==========
void app_main(void) {
    ESP_LOGI(TAG, "🚀 Iniciando DHT11 Web Monitor");
    
    // 1. Inicializar NVS
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);
    
    // 2. Registrar eventos WiFi
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT, ESP_EVENT_ANY_ID, 
                                                       &wifi_event_handler, NULL, NULL));
    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT, IP_EVENT_STA_GOT_IP,
                                                       &wifi_event_handler, NULL, NULL));
    
    // 3. Iniciar WiFi
    iniciar_wifi();
    
    // 4. Iniciar servidor web
    iniciar_servidor_web();
    
    // 5. Iniciar tarefa DHT11
    xTaskCreate(tarefa_dht11, "tarefa_dht11", 4096, NULL, 5, NULL);
    
    ESP_LOGI(TAG, "✅ Sistema pronto! Aguardando conexão WiFi...");
}
