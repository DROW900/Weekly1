const fetch = require('node-fetch') 
class Producto {

    constructor(lista) {
        this.productos = lista;
    }

    static async getProductosPorId(idSubCategoria){
        let url = `https://api.mercadolibre.com/sites/MLM/search?category=${idSubCategoria}`;
        let Productos
        const resp = await fetch(url);
        const data = await resp.json();
        Productos = new Producto(data);
        return Productos; 
    }

    static obtenerProductosPorId(idProducto) {
        let url = `https://api.mercadolibre.com/sites/MLM/search?category=${idProducto}`;
        let Productos
        fetch(url)
            .then(response => response.json())
            .then(json => {
                Productos = new Producto(json)
                this.Productos = json;
                console.log(Productos);
                Productos.mostrarProductos();
            })
            .catch(error => {
                console.log(error)
                console.error('No hay Productos || TIME OUT');
            })
    } 

    static getTendencias(id){
        let url = `https://api.mercadolibre.com/trends/MLM/${id}`;
        let Tendencias
        fetch(url)
            .then(response => response.json())
            .then(json => {
                Tendencias = new Producto(json)
                this.Tendencias = json;
/*                 console.log(Tendencias); */
                Producto.mostrarTendencias()
            })
            .catch(error => {
                console.log(error)
                console.error('No hay Tendencias');
            })
    }
    static mostrarTendencias(){
        let elemento = document.getElementById('album').style.display="none";
        elemento = document.getElementById('categorias').style.display="none";
        elemento = document.getElementById('lista')
        for(let index = 0; index < this.Tendencias.length; index++){
            elemento.innerHTML += `<a href=${this.Tendencias[index].url}>${this.Tendencias[index].keyword}</a><br>`
        }
        elemento = document.getElementById('lista').style.display="block";
    }

    mostrarProductos() {
        for (let index = 0; index < 9; index++) {
            let elemento = document.getElementById('img'+ index)
            console.log(this.Productos.results[index].thumbnail)
            elemento.setAttribute('src',this.Productos.results[index].thumbnail)
            elemento = document.getElementById('marca'+ index)
            elemento.textContent = this.Productos.results[index].title
            elemento = document.getElementById('precio'+ index)
            elemento.textContent = "Precio: $"+this.Productos.results[index].price
       }
       let elemento = document.getElementById('album').style.display="block";
    }
}
module.exports={Producto}
//SubCategorias.getTendenciasPorSubcategoria('MLA430598');