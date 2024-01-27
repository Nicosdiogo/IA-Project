document.addEventListener('DOMContentLoaded', () => {
  // Restaurar carrinho salvo, se existir
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      const cartData = JSON.parse(savedCart);
      populateCart(cartData);
      updateTotal();
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
  for (let i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  // Adicione esta parte para chamar a função updateQuantity quando a quantidade mudar
  document.querySelector(".scroller dl").addEventListener("input", function(event) {
      if (event.target.classList.contains("product-qtd-input")) {
          updateQuantity(event);
      }
  });
});

function addProductToCart(event) {
  const button = event.target;
  const productInfos = button.parentElement.parentElement;
  const productImage = productInfos.querySelector(".product-image").src
  const productName = productInfos.querySelector(".product-name").innerText;
  const productPrice = productInfos.querySelector(".product-price").innerText;

  // Verificar se o produto já está no carrinho
  const cartData = getCartData();
  const existingProductIndex = cartData.findIndex(product => product.name === productName && product.price === parseFloat(productPrice.replace("Akz", "").replace(",", ".")));

  if (existingProductIndex !== -1) {
      // Atualizar a quantidade do produto no carrinho
      cartData[existingProductIndex].quantity++;
  } else {
      // Adicionar novo produto ao carrinho
      const newProduct = {
          image: productImage,
          name: productName,
          price: parseFloat(productPrice.replace("Akz", "").replace(",", ".")),
          quantity: 1
      };
      cartData.push(newProduct);
  }

  // Atualizar e salvar o carrinho no localStorage
  updateAndSaveCart(cartData);

  // Atualizar a exibição do carrinho
  updateTotal();
  populateCart(cartData); // Adiciona o novo produto em tempo real
}

function updateQuantity(event) {
  const input = event.target;
  const quantity = parseInt(input.value);
  const productName = input.parentElement.parentElement.querySelector(".cart-product-title a").innerText;

  const cartData = getCartData();
  const productToUpdate = cartData.find(product => product.name === productName);

  if (productToUpdate) {
      productToUpdate.quantity = quantity;
      updateAndSaveCart(cartData);
      updateTotal();
  }
}

function populateCart(cartData) {
  const tableBody = document.querySelector(".scroller dl");
  tableBody.innerHTML = "";

  cartData.forEach(product => {
      let newCartProduct = document.createElement("dd");
      newCartProduct.classList.add("cart-product");

      newCartProduct.innerHTML = `
          <li>
              <a href="#"><img src="${product.image}" alt="${product.name}" width="37" height="34"></a>
              <strong class="cart-product-title" style="font-size: 12px; width: 140px; "><a href="#">${product.name}</a></strong>
              <em style="width: 98px; font-size: 14px;" class="cart-product-price">${formatPrice(product.price)}</em>
              <button style="margin-left: 0px;" type="button" class="del-goods">&nbsp;</button>
              <input style="font-size: 10px;"  type="number" value="${product.quantity}" min="0" class="product-qtd-input" >
          </li>
      `;

      tableBody.append(newCartProduct);

      newCartProduct.getElementsByClassName("del-goods")[0].addEventListener("click", removeProduct);
  });
}

function removeProduct(event) {
  const productElement = event.target.parentElement;
  const productName = productElement.querySelector(".cart-product-title a").innerText;

  const cartData = getCartData();
  const updatedCartData = cartData.filter(product => product.name !== productName);

  // Atualizar e salvar o carrinho no localStorage
  updateAndSaveCart(updatedCartData);

  // Atualizar a exibição do carrinho
  updateTotal();
  populateCart(updatedCartData);
}

function updateAndSaveCart(cartData) {
  // Salvar carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cartData));
}

function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product");
  let totalAmount = 0;

  for (let i = 0; i < cartProducts.length; i++) {
      const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace( "Akz", "").replace(",", ".");
      const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

      totalAmount += productPrice * productQuantity;
  }

  totalAmount = totalAmount.toFixed(2);
  totalAmount = totalAmount.replace(',', '.');
  document.querySelector(".text-right b").innerText =  totalAmount + "Akz";
}

function getCartData() {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
}

function formatPrice(price) {
  return `${price.toFixed(2).replace('.', ',')}Akz`;
}

function redirectToCheckout() {
  window.location.href = "checkout.html";
}
function makePurchase() {
  const totalAmount = parseFloat(document.querySelector(".text-right b").innerText.replace("Akz", "").replace(",", "."));

  if (totalAmount === 0) {
      alert("Seu carrinho está vazio!");
  } else {
      alert(
          `
          Obrigado pela sua compra!
          Valor do pedido: Akz${totalAmount}\n
          Volte sempre :)
          `
      );

      // Limpar carrinho e localStorage após a compra
      localStorage.removeItem('cart');
      document.querySelector(".scroller dl").innerHTML = "";
      updateTotal();

      // Redirecionar para a página de checkout após a limpeza do carrinho
      redirectToCheckout();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Restaurar carrinho salvo, se existir
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      const cartData = JSON.parse(savedCart);
      populateCart(cartData);
      updateTotal();
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
  for (let i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  // Adicione esta parte para chamar a função updateQuantity quando a quantidade mudar
  document.querySelector(".scroller dl").addEventListener("input", function(event) {
      if (event.target.classList.contains("product-qtd-input")) {
          updateQuantity(event);
      }
  });

  // Botão comprar
  const purchaseButton = document.querySelector(".purchase-button");
  if (purchaseButton) {
      purchaseButton.addEventListener("click", makePurchase);
  }
});


// Atualizar o valor total do carrinho
function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product")
  totalAmount = 0

  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace( "Akz", "").replace(",", ".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

    totalAmount += productPrice * productQuantity
  }
  
  totalAmount = totalAmount.toFixed(2)
  totalAmount = totalAmount.replace(',', '.')
  document.querySelector(".text-right b").innerText =  totalAmount + "Akz"
}