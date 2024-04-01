import fs from 'fs'

//import app from "./app.js"
export default class ProductManager{
    constructor(path){
        this.path=path
    }
    
    
    
    
    readFile = async()=>{
        try{const dataJson= await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(dataJson)
           

        }
        
        catch(error){
            return[]

        }
        

    }
    
    
    addProduct = async(product)=>{
        try{
            const productsBd= await this.readFile()
            //console.log ('arranca ', productsBd);
           
            //validar

            const productFound=productsBd.find(prod=>product.code===prod.code)
            
          
            if (productFound) return 'codigo producto repetido'
                
            
            
        

            //asig id
            if(productsBd.length===0){
                product.id=1
            }else{
                product.id= productsBd[productsBd.length-1].id+1
            }
            //agreg prod
            productsBd.push(product)
           // console.log ('los productos', product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsBd,null,'\t'),'utf-8')
            return productsBd
                      
        }
        catch(error){
            console.log(error)
        }
    }
    getProduct=async()=>{
        try{return await this.readFile()
            

        }
        catch(error){console.log(error)

        }
    }
    
    getProductById= async(pid)=>{
        const productsBd= await this.readFile() 
        //console.log(productsBd)
        const product=productsBd.find(prod=>prod.id===pid)
        if(!product)return 'no está el producto solicitado'
        return (product)

        
    }
    updateProduct=async(pid,update2)=>{
        try{const productsBd= await this.readFile()
            const product=productsBd.findIndex(prod=>prod.id===pid)
            
          //  console.log('actualizacion',productsBd)            
            console.log('producto',product)
           // console.log(update)
            //console.log(pid)
            if (product===-1){ return'no existe el producto a actualizar'}
           else{
                 const update1={ ...update2,id:pid };
                 const objetoActual = product;
                const nuevoObjetoKeys = Object.keys(update1);
                console.log(Object.keys(update1))

        // Iterar sobre las claves del nuevo objeto
        for (const key of nuevoObjetoKeys) {
            // Si la clave existe en el objeto actual, actualizar el valor
            if (objetoActual.hasOwnProperty(key)) {
                objetoActual[key] = update1[key];
                console.log ('hola actualice',objetoActual)
                // const elactualizado=productsBd.splice(product,0,update1)
                 
           //await fs.promises.writeFile(this.path, JSON.stringify(productsBd,null,'\t'),'utf-8')
           return productsBd

           
           console.log( '2parte',update1)
           
          
           
        }}}}
        
        catch(error) {console.log(error)

        }
    }
    deleteProduct=async(pid)=>{
        try{const productsBd= await this.readFile()
            const product=productsBd.findIndex(prod=>prod.id===pid)
            console.log(productsBd)
            if(product===-1){console.log('el id no existe')}
            else{ 
                const deletedProduct = productsBd.splice(product,1);
    fs.writeFileSync(this.path, JSON.stringify(productsBd,'\t'),'utf-8');
    
    return deletedProduct;

         
            console.log('el objeto fue eliminado',product)}

        } catch(error){console.log(error)

        }
    }

}
//module.exports={
    ProductManager
//}

