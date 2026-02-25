var cart=[];
function loadCart(){try{cart=JSON.parse(sessionStorage.getItem('humenCart')||'[]')}catch(e){cart=[]}updateCartCount()}
function saveCart(){sessionStorage.setItem('humenCart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){var t=cart.reduce(function(s,i){return s+i.qty},0);document.querySelectorAll('.cart-count').forEach(function(el){el.textContent=t;el.style.display=t>0?'inline-flex':'none'})}
function addToCart(name,price,size,collection){var found=false;for(var i=0;i<cart.length;i++){if(cart[i].name===name&&cart[i].size===size){cart[i].qty++;found=true;break}}if(!found){cart.push({name:name,price:parseFloat(price),size:size||'One Size',collection:collection||'',qty:1})}saveCart();showCartNotification(name)}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCartPage()}
function updateQty(i,d){cart[i].qty+=d;if(cart[i].qty<1)cart[i].qty=1;saveCart();renderCartPage()}
function showCartNotification(name){var n=document.getElementById('cart-notif');if(!n)return;n.querySelector('.cn-text').textContent=name+' added to cart!';n.classList.add('cn-show');setTimeout(function(){n.classList.remove('cn-show')},2500)}
function getCartTotal(){return cart.reduce(function(s,i){return s+(i.price*i.qty)},0)}
function renderCartPage(){var c=document.getElementById('cart-items'),t=document.getElementById('cart-total'),e=document.getElementById('cart-empty'),f=document.getElementById('cart-filled');if(!c)return;if(cart.length===0){e.style.display='block';f.style.display='none';return}e.style.display='none';f.style.display='block';var h='';for(var i=0;i<cart.length;i++){var it=cart[i];h+='<div class="cart-item"><div class="cart-item-info"><div class="cart-item-name">'+it.name+'</div><div class="cart-item-meta">'+it.size+'</div><div class="cart-item-price">$'+it.price.toFixed(2)+'</div></div><div class="cart-item-qty"><button onclick="updateQty('+i+',-1)" class="qty-btn">&minus;</button><span class="qty-num">'+it.qty+'</span><button onclick="updateQty('+i+',1)" class="qty-btn">+</button></div><div class="cart-item-total">$'+(it.price*it.qty).toFixed(2)+'</div><button onclick="removeFromCart('+i+')" class="cart-remove">&times;</button></div>'}c.innerHTML=h;t.textContent='$'+getCartTotal().toFixed(2)}

// STRIPE PAYMENT LINKS - Add your links here
// Go to: Stripe Dashboard > Payment Links > + Create
// Copy each URL and paste below
var stripeLinks={
"HUMEN Collage Logo Hoodie":"",
"HUMEN Collage Logo Tee":"",
"HUMEN Collage Logo Cap":"",
"RUN Collection Hoodie":"",
"RUN Collection Tee":"",
"HUMEN For Her Designer Hoodie":"",
"HUMEN For Her Tee":"",
"On Dat Kool-Aid Tee":"",
"On Dat Kool-Aid Flat Bill Cap":"",
"On Dat Kool-Aid Hoodie":"",
"Archetypes Tee":"",
"Archetypes Cap":"",
"Archetypes Hoodie":"",
"HEAL Hoodie":"",
"HEAL Tee":"",
"HEAL Candle":"",
"I\'M HUMAN Tee":"",
"I\'M HUMAN Hoodie":"",
"Game of Spades Tee":"",
"Game of Spades Hoodie":"",
"Game of Spades Card Game":"",
"Game of Spades Cap":"",
};

function handleCheckout(){
if(cart.length===0)return;
var link='';
for(var i=0;i<cart.length;i++){
  var l=stripeLinks[cart[i].name]||'';
  if(l){link=l;break}
}
if(link){window.open(link,'_blank')}
else{alert('Checkout coming soon! To set up:\n\n1. Go to Stripe Dashboard > Payment Links\n2. Create a link for each product\n3. Add the URLs in the stripeLinks section of your site code\n\nSearch for stripeLinks in the HTML file.')}
}

loadCart();
