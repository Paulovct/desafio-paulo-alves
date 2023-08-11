class CaixaDaLanchonete {
        
        listaDeProdutos = ["cafe","chantily","suco","sanduiche","queijo","salgado","combo1","combo2"];
        listaDeValores = [3.00,1.50,6.20,6.50,2.00,7.25,9.50,7.50];

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if(["dinheiro","credito", "debito"].includes(metodoDePagamento)){
            
            if(itens.length > 0){
                let valor = 0.0;
                
                for(let i = 0; i < itens.length ; i++){
                    let item = itens[i].split(",");

                    if(item.length != 2) return "Item inválido!";
                    if(!this.listaDeProdutos.includes(item[0])) return "Item inválido!";
                    if(!parseInt(item[1]) > 0) return "Quantidade inválida!";
                    if(item[0] == "chantily" && !itens.find((item)=> item.split(",")[0] == "cafe")) return "Item extra não pode ser pedido sem o principal";
                    if(item[0] == "queijo" && !itens.find((item)=> item.split(",")[0] == "sanduiche")) return "Item extra não pode ser pedido sem o principal";
                    
                    valor += this.valorDoProduto(item[0],metodoDePagamento,item[1]);
                }

                return `R$ ${valor.toFixed(2)}`.replace(".",",");
            
            } else {
                return "Não há itens no carrinho de compra!";
            }
        
        } else {
            return "Forma de pagamento inválida!";
        }   
    }

    valorDoProduto(produto,metodoDePagamento,quantidade){
        let valor = this.listaDeValores[this.listaDeProdutos.findIndex((item)=> item == produto)];
        switch (metodoDePagamento){
            case "dinheiro":
                return (valor - (valor * 0.05)) * quantidade;
            case "credito":
                return (valor + (valor * 0.03)) * quantidade;
            default:
                return valor * quantidade;                
        }
    }
}



export { CaixaDaLanchonete };
