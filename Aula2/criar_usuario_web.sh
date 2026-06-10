#!/bin/bash

# Script para criar um novo usuário e configurar o diretório public_html
# para ser servido pelo Apache com mod_userdir.
# Requer execução com privilégios de superusuário (sudo).

# --- Validação do Input ---
if [ "$#" -ne 1 ]; then
    echo "Uso: $0 <nome_do_usuario>"
    exit 1
fi

# --- Variáveis ---
USERNAME=$1
USER_HOME="/home/$USERNAME"
PUBLIC_HTML_DIR="$USER_HOME/public_html"

# --- Verificação de Root ---
if [ "$(id -u)" -ne 0 ]; then
    echo "Este script precisa ser executado como root. Use 'sudo'."
    exit 1
fi

echo "-> Iniciando a criação do usuário '$USERNAME'..."

# --- Criação do Usuário ---
# -m: cria o diretório home
# -s /bin/bash: define o shell padrão
if useradd -m -s /bin/bash "$USERNAME"; then
    echo "-> Usuário '$USERNAME' criado com sucesso."
    # Define uma senha para o novo usuário
    echo "-> Por favor, defina uma senha para '$USERNAME':"
    passwd "$USERNAME"
else
    echo "ERRO: Falha ao criar o usuário '$USERNAME'. O usuário já existe?"
    exit 1
fi

# --- Configuração do Diretório public_html ---
echo "-> Configurando o diretório public_html..."

# Cria o diretório public_html
mkdir "$PUBLIC_HTML_DIR"
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao criar o diretório $PUBLIC_HTML_DIR."
    exit 1
fi

# --- Definição de Permissões e Propriedade ---
# O diretório home do usuário precisa ter permissão de execução (x) para 'outros',
# para que o Apache possa atravessá-lo e acessar o public_html.
# 711 (rwx--x--x) é seguro, pois não permite que outros listem o conteúdo do home.
chmod 711 "$USER_HOME"
echo "-> Permissão do diretório home ($USER_HOME) definida para 711."

# O diretório public_html e seu conteúdo devem pertencer ao novo usuário.
chown -R "$USERNAME:$USERNAME" "$PUBLIC_HTML_DIR"
echo "-> Propriedade de $PUBLIC_HTML_DIR definida para o usuário '$USERNAME'."

# O diretório public_html precisa ser legível e executável por todos.
chmod 755 "$PUBLIC_HTML_DIR"
echo "-> Permissão de $PUBLIC_HTML_DIR definida para 755."

# --- Criação de um arquivo de teste ---
echo "-> Criando um arquivo index.html de teste..."
echo "<!DOCTYPE html>
<html>
<head>
    <title>Bem-vindo!</title>
    <meta charset=\"UTF-8\">
</head>
<body>
    <h1>Página de teste de $USERNAME</h1>
    <p>Se você está vendo esta página, o diretório public_html foi configurado corretamente!</p>
</body>
</html>" > "$PUBLIC_HTML_DIR/index.html"

# Define a permissão e propriedade do arquivo de teste
chown "$USERNAME:$USERNAME" "$PUBLIC_HTML_DIR/index.html"
chmod 644 "$PUBLIC_HTML_DIR/index.html"

# --- Conclusão ---
echo ""
echo "------------------------------------------------------------"
echo "PROCESSO CONCLUÍDO COM SUCESSO!"
echo "Acesse a página do usuário em:"
echo "http://<ip_do_servidor>/~$USERNAME/"
echo "------------------------------------------------------------"

exit 0
