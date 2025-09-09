let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
let bagItemObjects = [];
let totalMRP = 0; 
let totalDiscount=0;

// Make sure dressItems is loaded
if (typeof dressItems === "undefined") {
  alert("Product data not loaded. Try again.");
  throw new Error("dressItems not found.");
}

// ✅ Map to bagItemObjects with extra logging
bagItemObjects = bagItems.map(itemId => {
  const paddedId = itemId.toString().padStart(3, '0');
  const item = dressItems.find(d => d.id === paddedId);
  if (!item) console.warn(`⚠️ Item ID ${paddedId} not found in dressItems`);
  return item;
}).filter(Boolean); // remove undefined entries

console.log("👜 Mapped bag item objects:", bagItemObjects);
bagItemObjects.forEach(bagItem => {
  totalMRP += bagItem.strike_price;
  totalDiscount += bagItem.strike_price - bagItem.current_price
})

let totalamount = totalMRP - totalDiscount + 99

// Warn if total is zero
if (totalMRP <= 0) {
  alert("Your bag is empty!");
}

document.querySelector(".btn-place-order").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalamount * 100 }),
  });

  const data = await response.json();
  console.log("🧾 Razorpay order data:", data);
  if (!data.id) {
    alert("Error: Razorpay order failed to create.");
    return;
  }

  const options = {
    key: "rzp_test_tbI2hXFtT8VLY5",
    amount: data.amount,
    currency: data.currency,
    name: "Myntra Clone",
    description: "Order Payment",
    image: "../Frontend/images/myntra.png",
    order_id: data.id,
    handler: function (response) {
      window.location.href = "./thank_you.html";
    },
    theme: {
      color: "#f16565",
    },
  };

  const razor = new Razorpay(options);
  razor.open();
});
