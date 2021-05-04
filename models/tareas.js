const { Tarea } = require('./tarea')


class Tareas{
    _listado = {};

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        } )


        return listado;
    }

    cargarTareasFromArray(tarea = []){
        Object(tarea).forEach(tareas => {
            this._listado[tareas.id] = tareas;

        })
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        let cont=0;
        this.listadoArr.forEach(tare => {
            cont = cont+1;
            let indi = cont.toString();
            const comple = tare.completadoEn
            if(comple === null){
                console.log( ` ${indi.green+ '.'} ${tare.desc} :::: ${'Pendiente'.red}`);
            }
            else{
                console.log( ` ${indi.green + '.'} ${tare.desc} :::: ${'Completado'.green}` );
            }
        })
    }

    listarCompletadaPendiente(completadas = true) {
        let cont = 0;
        this.listadoArr.forEach(tareas => {
            const comple = tareas.completadoEn;
            if(completadas == true){
                cont = cont + 1;
                let indi = cont.toString();
                if(comple !== null){
                    console.log(` ${indi.green + '.'} ${tareas.desc} :::: ${tareas.completadoEn.toString().green}`)
                }
            }else if(comple == null){
                cont = cont + 1;
                let indi = cont.toString();
                console.log( ` ${indi.green+ '.'} ${tareas.desc} :::: ${'Pendiente'.red}`);

            }
        })
    }

    toggleCompletadas(ids = []){

        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tareas => {

            if ( !ids.includes(tareas.id) ){
                const tarea = this._listado[tareas.id];
                tarea.completadoEn = null;
            }

        })

    }


}

module.exports = {
    Tareas
};