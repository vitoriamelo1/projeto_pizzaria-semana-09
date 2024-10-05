document.addEventListener("DOMContentLoaded", function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId')

    visualizarUsuario(userId);

    // Função para visualizar o usuário
    async function visualizarUsuario(userId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const dados = await response.json();

                // Seleciona o corpo da tabela
                const dadosUsuario = document.getElementById('dadosUsuario');

                const dataCriacao = new Date(dados.user.created_at);
                const dataFormatada = dataCriacao.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false // Formato 24 horas
                });

                dadosUsuario.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${dados.user.name}</h5>
                        <p class="card-text">E-mail: <b>${dados.user.email}</b></p>
                        <p class="card-text">Data de Criação: <b>${dataFormatada}</b></p>
                    </div>
                </div>
            `;
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao visualizar o usuário.');
        }
    }

    // Voltar para a página inicial
    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'listar.html';  // Redireciona para a página inicial
    });
});
