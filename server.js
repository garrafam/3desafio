import express from 'express'
import ProductManager from "./productManager.js"
import { pid } from 'process';
const path='./Product.json'
const products= new ProductManager(path);

const app=express()
app.use(express.urlencoded({extended:true}))

const {getProduct}=new ProductManager();
const {getProductById}=new ProductManager();


app.get('/productos',async(req,res)=>{
    const productos= await products.getProduct()
    const {limite} = req.query   
    function obtenerProductosConLimite(limite) {
        // Convertir el límite a un número entero
        limite = parseInt(limite);

        // Validar si el límite es un número entero positivo
        if (!Number.isInteger(limite) || limite <= 0) {
            return "El límite debe ser un número entero positivo.";
        }

        // Devolver la lista de productos con el límite especificado
        return productos.slice(0, limite);
    }

    // Verificar si se proporcionó un límite
    if (limite !== undefined) {
        // Llamar a la función para obtener productos con el límite especificado
        const productosConLimite = obtenerProductosConLimite(limite);

        // Verificar si hubo un error al obtener los productos
        if (typeof productosConLimite === 'string') {
            return res.status(400).json({ error: productosConLimite });
        }

        // Devolver la lista de productos con el límite especificado
        return res.status(200).json(productosConLimite);
    }

    // Si no se proporciona un límite, devolver todos los productos
    res.status(200).json(productos);
})


app.get('/productos/:pid',async(req,res)=>{
   const {pid}=req.params
    const result= await products.getProductById(parseInt(pid))
    console.log('este seria' ,result)
    console.log('este seria' ,pid)   
    res.send( result)

})


app.listen(8080,error=>(
    console.log('escuchando el puerto 8080')
    ))