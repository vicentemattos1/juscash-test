import requests
from bs4 import BeautifulSoup
import math
import time
import re

# URL do endpoint
url = "https://dje.tjsp.jus.br/cdje/consultaAvancada.do"

# Payload base da requisição
base_payload = {
    "dadosConsulta.dtInicio": "13/01/2025",        # Data inicial
    "dadosConsulta.dtFim": "13/01/2025",          # Data final
    "dadosConsulta.cdCaderno": "12",              # Código do caderno
    "dadosConsulta.pesquisaLivre": '"RPV" E "pagamento pelo INSS"',  # Palavras-chave
    "pagina": "1"                                 # Página inicial (inicia em 1)
}

# Cabeçalhos HTTP (simula um navegador)
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded",
}

def processar_pagina(payload, obter_total=False):
    response = requests.post(url, data=payload, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        if obter_total:
            # Localizar o div com os resultados
            div_resultados = soup.find("div", id="divResultadosSuperior")
            if div_resultados:
                # Usar regex para capturar apenas o número total de resultados
                match = re.search(r"de\s+(\d+)", div_resultados.text)
                if match:
                    return int(match.group(1))  # Retorna o número total de elementos
        
        # Extrair resultados da página atual
        resultados = soup.find_all("div", id="divResultadosInferior")  # Ajustar conforme o HTML retornado
        print(resultados)
        return [r.text.strip() for r in resultados]
    else:
        print(f"Erro na requisição: {response.status_code}")
        return None


# Obter o total de elementos e calcular o número de páginas
total_elementos = processar_pagina(base_payload, obter_total=True)
resultados_por_pagina = 10  # Baseado no HTML
total_paginas = math.ceil(total_elementos / resultados_por_pagina)

print(f"Total de elementos: {total_elementos}")
print(f"Total de páginas: {total_paginas}")

# Coletar resultados de todas as páginas
todos_resultados = []
for pagina in range(1, total_paginas + 1):
    print(f"Processando página {pagina} de {total_paginas}...")
    base_payload["pagina"] = str(pagina)
    resultados = processar_pagina(base_payload)
    
    if resultados:
        todos_resultados.extend(resultados)
    else:
        print(f"Nenhum resultado encontrado na página {pagina}.")
        break
    
    # Adicionar um atraso entre as requisições
    time.sleep(1)  # Pausa de 1 segundo (ajuste conforme necessário)

# Exibir todos os resultados coletados
print(f"Total de resultados coletados: {len(todos_resultados)}")
for resultado in todos_resultados:
    print(resultado)
