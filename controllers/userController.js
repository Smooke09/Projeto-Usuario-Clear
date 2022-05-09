class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);


        this.onSubmit();
        this.onEditCancel();


    };

    onEditCancel() {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();
        });
    }

    onSubmit() {
        // Evento Para receber os dados ao clicar no button submit
        this.formEl.addEventListener("submit", event => {
            // Cancela o comando padrao que o evento teria
            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");


            btn.disable = true;

            let values = this.getValues();

            if (!values) return false;


            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);

                    this.formEl.reset();

                    btn.disable = false;

                },
                (e) => {
                    console.error(e);
                });

        });
    }

    // Pegar a foto
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
        let isValid = true;


        [...this.formEl.elements].forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false;
            }



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

        // Negação
        if (!isValid) {
            return false;
        }


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

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm" /></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-edit btn-xs btn-flat">Excluir</button>
                </td>
        `

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            console.log(JSON.parse(tr.dataset.user));
            this.showPanelUpdate();


        });

        // Inserindo conteudo no HTML Utilizando tamplteString
        this.tableEl.appendChild(tr);

        this.updateCount();


    };

    showPanelCreate() {

        document.querySelector('#box-user-create').style.display = "block";
        document.querySelector('#box-user-update').style.display = "none";
    }


    showPanelUpdate() {

        document.querySelector('#box-user-create').style.display = "none";
        document.querySelector('#box-user-update').style.display = "block";
    }

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;

        });

        document.querySelector('#number-users').innerHTML = numberUsers;
        document.querySelector('#number-users-admin').innerHTML = numberAdmin;
    };
}; // class

