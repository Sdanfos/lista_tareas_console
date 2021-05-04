require('colors');

// const { mostrarMenu, pausa } = require('./helpers/mensajes')
const { inquirerMenu,
    inquirerpausa,
    leerInput,
    listadoTareasBorrar,
    confirm,
    mostrarListadoCheckList} = require('./helpers/inquirer')
const { Tareas }  = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')

console.clear();
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray(tareasDB);
    }
    await inquirerpausa();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1' :
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;

            case '2' :
                tareas.listadoCompleto()
            break;

            case '3':
                tareas.listarCompletadaPendiente(true)
                break;

            case '4':
                tareas.listarCompletadaPendiente(false)
                break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)

                tareas.toggleCompletadas(ids)
                break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if(id !== '0') {
                    const ok = await confirm('¿Estas seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;



        }
        guardarDB( tareas.listadoArr );

        await inquirerpausa();
    } while (opt !== '0')

}
main();