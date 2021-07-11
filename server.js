const server = require('http')
require('dotenv').config();
//Modulos propios
const {Categorias} = require('./assets/dist/js/Categoria')
const {Producto} = require('./assets/dist/js/Producto')

async function request(req,res){
    const subCategorias = await Categorias.getSubCategorias('MLM1648')
    let identificadoresSubCategorias = await subCategorias.obtenerIdentificadores();
    let productos = await Producto.getProductosPorId(identificadoresSubCategorias[0]);
    res.writeHead(200, {'content-Type' : 'application/json'});
    /* res.write(JSON.stringify(subCategorias.subCategorias)) */
    res.write(JSON.stringify(productos.productos))
    res.end()
}

const servidor = server.createServer(request);
servidor.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`http://${process.env.HOST}:${process.env.PORT}`)
})