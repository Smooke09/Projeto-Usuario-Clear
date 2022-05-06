class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);


        this.onSubmit();


    };

    onSubmit() {
        // Evento Para receber os dados ao clicar no button submit
        this.formEl.addEventListener("submit", event => {
            // Cancela o comando padrao que o evento teria
            event.preventDefault();

            this.addLine(this.getValues());

        });
    }

    getValues() {
        let user = {};

        [...this.formEl.elements].forEach(function (field, index) {
            if (field.name == "gender") {
                if (field.checked) {
                    // Enviando para variavel um JSON o campo e oque esta escrito 
                    user[field.name] = field.value;
                }
            } else {
                user[field.name] = field.value;
            };
        });
        // Classe 
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin

        );
    }

    // Metodo para inserir no HTML
    addLine(dataUser) {


        // Inserindo conteudo no HTML Utilizando tamplteString
        this.tableEl.innerHTML = `
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



    }; // constructor
}; // class

