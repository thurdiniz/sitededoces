const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

//abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

//fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

//fechar o modal com botão
closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

//Função para adicionar ao carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
        return;
    }
    cart.push({
        name,
        price,
        quantity: 1,
    })
    
    updateCartModal()

}

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        
        <div class="flex items-center justify-between">
            <div class="text-cardap">     
            
            <div class="cardap-div-text">
            <p class="font-bold font-800">${item.name}</p>  
            <p class="Qtd-cardap">|Qtd: ${item.quantity}</p>        
            <p class="font-medium mt-2">|R$ ${item.price.toFixed(2)}</p>  
            <img 
            class="button-remove" data-name="${item.name}"
            width="24" height="24" src="https://img.icons8.com/material-outlined/24/full-trash.png" alt="full-trash"/>
            </div>


            <div/>
        <div/>
 `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)

  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  }); 

  cartCounter.innerHTML = cart.length;


}


cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("button-remove")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
       const item = cart[index];

       if(item.quantity > 1){
        item.quantity -= 1;
         updateCartModal();
          return;
       }

        cart.splice(index, 1);
        updateCartModal();
    }
}



    checkoutBtn.addEventListener("click", function(){

        if(cart.length === 0) return;
        if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
        
    }  
    
    const cartItems = cart.map((item) => {
        return (
             ` ${item.name}
              Quantidade: (${item.quantity})
              Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "5511963319094"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();

})
