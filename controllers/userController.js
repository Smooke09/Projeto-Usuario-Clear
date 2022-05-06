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


            let value = this.getValues();



            this.getPhoto((content) => {

                value.photo = content;

                this.addLine(value);
            });

        });
    }

    getPhoto(callback) {

        // Quando usamos o comando new FileReader() ja invoca o metodo constructor
        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item => {
            if (item.name === 'photo') {
                return item;
            }

        });


        let file = elements[0].files[0];

        fileReader.onload = () => {

            callback(fileReader.result);
        };

        fileReader.readAsDataURL(file);
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
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm" /></td>
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

