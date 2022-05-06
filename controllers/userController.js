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

            this.getPhoto().then(
                (content) => {
                    value.photo = content;
                    this.addLine(value);

                },
                (e) => {
                    console.error(e);
                });

        });
    }

    getPhoto() {

        return new Promise(((resolve, reject) => {
            // Quando usamos o comando new FileReader() ja invoca o metodo constructor
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);
            };
            fileReader.onerror = () => {

                reject(e);

            }

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        }));

    }



    getValues() {
        let user = {};

        [...this.formEl.elements].forEach(function (field, index) {
            if (field.name == "gender") {
                if (field.checked) {
                    // Enviando para variavel um JSON o campo e oque esta escrito 
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {

                user[field.name] = field.checked;

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

    // Metodo para inserir no HTML VIEW
    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm" /></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `

        // Inserindo conteudo no HTML Utilizando tamplteString
        this.tableEl.appendChild(tr);



    }; // constructor
}; // class

