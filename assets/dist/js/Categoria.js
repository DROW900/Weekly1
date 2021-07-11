const fetch = require('node-fetch')
const {Producto} = require('./Producto') 
class Categorias {

    constructor(data) {
        this.subCategorias = data;
    }

    static async getSubCategorias(idCategoria){
        let subCategorias
        const url = `https://api.mercadolibre.com/categories/${idCategoria}`
        const resp = await fetch(url);
        const data = await resp.json();
        subCategorias = new Categorias(data)
        return subCategorias
    }
    static obtenerSubCategorias(idCategoria) {
        let url = `https://api.mercadolibre.com/categories/${idCategoria}`;
        let Categoria
        fetch(url)
            .then(response => response.json())
            .then(json => {
                Categoria = new Categorias(json)
                this.info = json;
                this.bandera = false
                // console.log(Categoria);
            })
            .catch(error => {
                console.log(error)
                console.error('No hay Categorias || TIME OUT');
            })
    }
    
    static mostrarCategorias() {
        let elemento
        if(this.bandera == false){
            for (let index = 0; index < this.info.children_categories.length; index++) {
                //console.log(this.info.children_categories[index]);
                let nombreCategoria = document.getElementById('categorias');
                nombreCategoria.innerHTML += '<button  id="' + this.info.children_categories[index].id + '", class="btn btn-primary my-2" ,onclick="Categorias.verSubcategorias(this.id)",type= "button">' + this.info.children_categories[index].name + '</button>'
            }
            elemento = document.getElementById('categorias').style.display="block";
            elemento = document.getElementById('lista').style.display="none";
            this.bandera = true;
        }
        elemento = document.getElementById('categorias').style.display="block";
        elemento = document.getElementById('lista').style.display="none";
    }
    async obtenerIdentificadores(){
        let subCategorias = []
        for(let i = 0; i < this.subCategorias.children_categories.length; i++){
            subCategorias.push(this.subCategorias.children_categories[i].id)
        }
        console.log(subCategorias)
        return subCategorias
    }
    static mostrarTendencias() {
        Producto.getTendencias('MLM1648')
    }

    static verSubcategorias(id) {
        console.log('Hola')
        Producto.obtenerProductosPorId(id);
    }

}
/* Categorias.obtenerSubCategorias('MLM1648') */
module.exports={Categorias} 
