const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value:'1',
                name:`${'1.'.yellow} Crear tarea`
            },
            {
                value:'2',
                name: `${'2.'.yellow} Listar tarea`
            },
            {
                value:'3',
                name:`${'3.'.yellow} Listar tareas completadas`
            },
            {
                value:'4',
                name:`${'4.'.yellow} Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${'5.'.yellow} Completar tarea(s)`
            },
            {
                value:'6',
                name:`${'6.'.yellow} Borrar tarea`
            },
            {
                value:'0',
                name:`${'7.'.yellow} Salir`
            }
        ]
    }
];

const pausa = [{
    type:'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar`,
}]

const inquirerMenu = async() => {
    // console.clear();
    console.log('==============='.green);
    console.log('     Menu'.yellow)
    console.log('===============\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const inquirerpausa = async () => {
    console.log('\n')
    const pau = await inquirer.prompt(pausa)

    return pau;
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc

}

const listadoTareasBorrar = async(tareas =[] ) => {

    const choices = tareas.map((tarea, i)=> {
        const idx = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name: 'id',
            message: 'Borrar',
            choices

        }

    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type:'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas =[] ) => {

    const choices = tareas.map((tarea, i)=> {
        const idx = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });


    const pregunta = [
        {
            type:'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }

    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu,
    inquirerpausa,
    leerInput,
    listadoTareasBorrar,
    confirm,
    mostrarListadoCheckList
}