function iniciar() {
    listarCidade();
}

async function listarCidade() {
    var url = `./php/cidade_listar.php`;
    var res = await fetch(url).then(resposta => { return resposta.json(); });
    console.log(res);

    var tabela = document.getElementById('tabelaCidade');
    var a = '';
    for (var i = 0; i < res.length; i++) {
        a = a + `<tr>
                    <td>${res[i].idcidade}</td>
                    <td>${res[i].cidade}</td>
                    <td>${res[i].uf}</td>
                    <td>
                        <button class="btn btn-success" data-bs-toggle="modal"
                            data-bs-target="#modalCidade"
                            onclick="abrirCidade(${res[i].idcidade})">Alterar</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="excluirCidade(${res[i].idcidade})">Excluir</button>
                    </td>
                </tr>`;
    }
    tabela.innerHTML = a;

}

async function abrirCidade(idcidade) {
    var inputIdCidade = document.getElementById('idcidade');
    var inputCidade = document.getElementById('cidade');
    var inputUf = document.getElementById('uf');

    if (idcidade == 0) {
        document.getElementById('tituloCidade').innerHTML =
            `Inserindo nova cidade`;

        inputIdCidade.value = '';
        inputCidade.value = '';
        inputUf.value = '';
    }
    else {
        document.getElementById('tituloCidade').innerHTML =
            `Alterado cidade ${idcidade}`;

        var url = `./php/cidade_selecionar.php?idcidade=${idcidade}`;
        var res = await fetch(url).then(resposta => { return resposta.json(); });
        console.log(res);

        inputIdCidade.value = res[0].idcidade;
        inputCidade.value = res[0].cidade;
        inputUf.value = res[0].uf;
    }

}


async function salvarCidade() {
    var inputIdCidade = document.getElementById('idcidade');
    var inputCidade = document.getElementById('cidade');
    var inputUf = document.getElementById('uf');
    var url = '';

    if (inputIdCidade.value == '') {
        url = `./php/cidade_inserir.php?
                cidade=${inputCidade.value}&
                uf=${inputUf.value}`;

        await fetch(url).then(resposta => { return resposta.json(); });
    }
    else {
        url = `./php/cidade_alterar.php?
                cidade=${inputCidade.value}&
                uf=${inputUf.value}&
                idcidade=${inputIdCidade.value}`;

        await fetch(url).then(resposta => { return resposta.json(); });
    }
    listarCidade();
}

async function excluirCidade(idcidade) {
    if (!confirm('Deseja realmente excluir a cidade agora?'))
        return;

    var url = `./php/cidade_excluir.php?idcidade=${idcidade}`;
    await fetch(url).then(resposta => { return resposta.json() });

    listarCidade();
}

