# Bug Fixes Documentation

---

## Bug Title: Product quantity decreases below 1

**Line No:** See `decreaseProductItem()` in [`src/app/components/add-to-cart/add-to-cart.component.ts`](src/app/components/add-to-cart/add-to-cart.component.ts)  
**Type:** Logic/UI Bug  
**Identified using:** Manual testing

**Description:**  
Previously, users could decrease the product quantity in the cart to zero or negative values, which caused unexpected UI behavior and logic errors.

**Expected Behavior:**  
The product quantity should not decrease below 1. The minimum allowed quantity is 1.

**Actual Behavior:**  
The quantity could be decreased to zero or less, causing the UI to break and the cart logic to malfunction.

**Steps to Reproduce:**

1. Add a product to the cart.
2. Click the decrease button multiple times.
3. Observe that the quantity goes below 1.

**Logs / Console Output:**  
No relevant output seen in the browser console.

---

## Bug Title: Product item content not rendered properly

**Line No:** See [`src/app/components/product-card/product-card.component.html`](src/app/components/product-card/product-card.component.html)  
**Type:** UI Bug  
**Identified using:** Visual Regression test

**Description:**  
The product item details (such as name, price, and category) were hard coded and all had the same product item details

**Expected Behavior:**  
Each product card should display the correct name, category, and price for the dessert item.

**Actual Behavior:**  
Some or all of the product details were missing or incorrectly rendered in the UI.

**Steps to Reproduce:**

1. Start the application.
2. Observe the product list on the main page.
3. Notice incorrect product details.

**Logs / Console Output:**  
No relevant output seen in the browser console.
