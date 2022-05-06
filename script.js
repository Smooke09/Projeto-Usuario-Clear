// pegando todos valores do formulario de uma vez
let fields = document.querySelectorAll("#form-user-create [name]");
let user = {};


fields.forEach(function (field, index) {

    if (field.name == "gender") {

        if (field.checked) {
            user[field.name] = field.value;
        }

    } else {
        user[field.name] = field.value
    }
});

console.log(user);