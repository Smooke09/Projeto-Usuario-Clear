// pegando todos valores do formulario de uma vez
let fields = document.querySelectorAll("#form-user-create [name]");
// criando uma Variavel que armazena um JSON
let user = {};

// Funcao para inserir no HTML
function addLine(dataUser) {

    console.log(dataUser);

    // Inserindo conteudo no HTML Utilizando tamplteString
    document.getElementById('table-users').innerHTML = `

    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm" /></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
  </tr>
  `;
}

// Evento Para receber os dados ao clicar no button submit
document.getElementById('form-user-create').addEventListener("submit", function (event) {

    // Cancela o comando padrao que o evento teria
    event.preventDefault();

    fields.forEach(function (field, index) {
        if (field.name == "gender") {
            if (field.checked) {
                // Enviando para variavel um JSON o campo e oque esta escrito 
                user[field.name] = field.value;
            }
        } else {
            user[field.name] = field.value;
        };
    });


    let objectUser = new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin

    );

    addLine(objectUser)

});


