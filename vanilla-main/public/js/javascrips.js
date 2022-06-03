var main = document.getElementsByTagName('main')[0];

var btnArquivo = document.getElementById('btnArquivo');
var btnAPI = document.getElementById('btnAPI');
var btnImagem = document.getElementById('btnImagem');
var btnProdutos = document.getElementById('btnProdutos');



function criarLista(produtos){
    const lista = document.createElement('ul');
    for (const produto of produtos) {
        const item = document.createElement('li');
        item.innerText = produto.nome;   
        lista.appendChild(item);                                     
    }
    main.appendChild(lista);
}



function gerarLista(url){
    fetch(url)
    .then((resposta)=> {
        return resposta.json();
    })
    .then((json)=>{
        criarLista(json);
    })
}

function carregarHtml(url, elmento, produto){
    fetch(url)
    .then((resposta)=>{
        return resposta.text();
    }).then((html)=>{
        elemento.innerHTML = html; 

    })

    .then(()=> {
        var txtNome = document.getElementById('nome');
        var txtDesc = document.getElementById('desc');
        txtNome.value = produto.nome;
        txtDesc.value = produto.desc; 

        var btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.onclick = ()=>{

            var txtNome = document.getElementById('nome');
            var txtDesc = document.getElementById('desc');
            var nomeAlterado = txtNome.value;
            var descAlterado = txtDesc.value;


            var json = {
                "nome": nomeAlterado,
                "desc": descAlterado
            }


            fetch('/produtos/ produto.id', {
                method: "PUT",
                body: JSON.stringify(json),
                headers: {
                    'Accept': 'application/json', 
                    'Contect - Type' : 'application/json'
                }
            }); 


            .then(()=> {
                gerarTabela('')
            })
    

        }

    });

}
 function alterarProduto(produto){
     carregarHtml ('html/form.html', main, produto);

 }

function gerarTabela(url){
    fetch(url)
    .then((resposta)=> {
        return resposta.json();
    })
    .then((produtos)=>{
       //código de geração da tabela 
       var table = document.createElement('table');
       var tbody = document.createElement('tbody');
       
       var qtdeLinhas = produtos.length; // cria a quantidade de linhas, conforme a quantidade de dados no BD Json 

       for(var i = 0; i < qtdeLinhas; i++){

        var produto = produtos[i]; 
        
        //Linha que ele cria para as colunas 
       var tr = document.createElement('tr') 
       
       // PRIMEIRA COLUNA 

       var tr = document.createElement('tr'); // linhas
       var td = document.createElement('td'); //colunas
       var txt = document.createTextNode(produto.id);

     // inserinod dados 
        td.appendChild(txt);
        tr.appendChild(td);

        //SEGUNDA COLUNA 
       var tr = document.createElement('tr'); // linhas
       var td = document.createElement('td'); //colunas
       var txt = document.createTextNode(produto.desc);

     // inserinod dados 
        td.appendChild(txt);
        tr.appendChild(td);

       //TERCEIRA COLUNA 

       
       var td = document.createElement('td'); //colunas
       var linkEditar = document.createElement('a'); 
       var txt = document.createTextNode('Editar')
       linkEditar.appendChild(txt);
       linkEditar.href = '#'; // Não deixar navegar
       linkEditar.title = 'Editar'; 
       linkEditar.onclick = ()=>{
           //Chamar form passando produto/
           //produto

           alterarProduto(produto); 
       }

       td.appendChild(linkEditar);
        tr.appendChild(td);

    //    var txt = document.createTextNode('Ações');

     // inserinod dados 
        td.appendChild(txt);
        tr.appendChild(td);

        
        //QUARTA COLUNA 
       var tr = document.createElement('tr'); // linhas
       var td = document.createElement('td'); //colunas
       var txt = document.createTextNode('teste...');

     // inserinod dados 
        td.appendChild(txt);
        tr.appendChild(td);


        tbody.appendChild(tr);

       }

      
       table.appendChild(tbody);
       main.innerHTML = ''; // limpa o que está no main e depos acrescenta a tabela
       main.appendChild(table) // incluindo a tabela no método main 


    


    })
}

function carregarImagem(url){
    fetch(url)
    .then((resposta)=> {
        return resposta.blob();
    })
    .then((imgCarregada)=>{
        var imgElemento = document.createElement('img');
        imgElemento.src = URL.createObjectURL(imgCarregada);
        main.appendChild(imgElemento);
    })
}

btnImagem.onclick = ()=>{
    carregarImagem('imgs/carne1.jpg');
}

btnArquivo.onclick = ()=>{           
    gerarLista('data/arquivo.json');
}

btnAPI.onclick = ()=>{           
   gerarLista('http://localhost:3000/produtos');
}


btnProdutos.onclick = ()=>{

gerarTabela('js/javascript.js')

}