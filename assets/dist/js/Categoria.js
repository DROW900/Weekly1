class Categorias {

    constructor(categorias) {
        this.categorias = categorias;
    }

    static getSubCategorias(idCategoria) {
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
                nombreCategoria.innerHTML += '<button  id="' + this.info.children_categories[index].id + '", onclick="Categorias.verSubcategorias(this.id)",type= "button">' + this.info.children_categories[index].name + '</button>'
            }
            elemento = document.getElementById('categorias').style.display="block";
            elemento = document.getElementById('lista').style.display="none";
            this.bandera = true;
        }
        elemento = document.getElementById('categorias').style.display="block";
        elemento = document.getElementById('lista').style.display="none";
    }

    static mostrarTendencias() {
        Producto.getTendencias('MLM1648')
    }

    static verSubcategorias(id) {
        Producto.getProductosPorId(id);
    }

}
Categorias.getSubCategorias('MLM1648'); //computadoras