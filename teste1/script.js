async function inicio() {
    var input = document.getElementById('input'); 
    var area = document.getElementById('rowCards'); 

 
    if (!input.value.trim()) {
        alert("Por favor, insira um ID válido.");
        return;
    }

    try {
        
        var res = await fetch(`https://rickandmortyapi.com/api/character/${input.value}`);
        if (!res.ok) {
            throw new Error("Erro na requisição. Status: " + res.status);
        }

        var personagem = await res.json();

     
        if (!personagem || personagem.error) {
            alert("Personagem não encontrado. Verifique o ID.");
            return;
        }

        
        area.innerHTML = `
            <div class="row">
                <div class="col-lg-2">
                    <div class="card">
                        <div class="card-body">
                            ${personagem.id}
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="card">
                        <div class="card-body"><strong>Gênero:</strong> ${personagem.gender}</div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="card">
                        <div class="card-body"><strong>Espécie:</strong> ${personagem.species}</div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="card">
                        <div class="card-body"><strong>Origem:</strong> ${personagem.origin.name}</div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="card">
                        <div class="card-body"><strong>Status:</strong> ${personagem.status}</div>
                    </div>
                </div>
            </div>`;

       
        await inserirLog('character', input.value);

    } catch (error) {
        console.error("Erro ao buscar o personagem:", error);
        alert("Erro ao buscar o personagem. Tente novamente.");
    }
}

async function inserirLog(metodo, resultado) {
    try {
        const res = await fetch(
            `https://www.piway.com.br/unoesc/api/inserir/log/328401/https://rickandmortyapi.com/api/${metodo}/${resultado}`
        );
        if (!res.ok) {
            throw new Error("Erro ao inserir log. Status: " + res.status);
        }
        await res.json();
    } catch (error) {
        console.error("Erro ao inserir log:", error);
    }
}

async function exibirLogs() {
    try {
        var res = await fetch(`https://www.piway.com.br/unoesc/api/logs/432608`);
        if (!res.ok) {
            throw new Error("Erro na requisição. Status: " + res.status);
        }

        var logs = await res.json();

        var modal = document.getElementById('tabela');
        modal.innerHTML = ''; 

        if (!Array.isArray(logs) || logs.length === 0) {
            modal.innerHTML = '<tr><td colspan="5">Nenhum log encontrado.</td></tr>';
            return;
        }

        logs.forEach(log => {
            modal.innerHTML += `
                <tr>
                    <td>${log.idlog}</td>
                    <td>${log.log}</td>
                    <td>${log.api}</td>
                    <td>${log.metodo}</td>
                    <td>${log.resultado}</td>
                    <td><button onclick="ExcluirLog(${log.idlog})" class="btn btn-danger btn-sm">Excluir</button></td>
                </tr>`;
        });
    } catch (error) {
        console.error("Erro ao exibir logs:", error);
        alert("Erro ao carregar logs. Tente novamente mais tarde.");
    }
}

async function ExcluirLog(id) {
    try {
        const res = await fetch(`https://www.piway.com.br/unoesc/api/excluir/log/${id}/aluno/432608`);
        if (!res.ok) {
            throw new Error("Erro ao excluir log. Status: " + res.status);
        }
        await res.json();
        exibirLogs();
    } catch (error) {
        console.error("Erro ao excluir log:", error);
    }
}
