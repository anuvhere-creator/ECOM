import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { userId, product } = req.body;

  try {
    // 1️⃣ Find user's cart
    let cart = await Cart.findOne({ userId });

    // 2️⃣ If cart doesn't exist → create
    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    // 3️⃣ Check if product already in cart
    const index = cart.items.findIndex(
      item =>
        item.productId === product.productId &&
        item.size === product.size
    );

    // 4️⃣ If exists → increase quantity
    if (index > -1) {
      cart.items[index].quantity += 1;
    } 
    // 5️⃣ Else → add product
    else {
      cart.items.push({
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        size: product.size,
        quantity: 1
      });
    }

    // 6️⃣ Save cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    // If cart not created yet
    if (!cart) {
      return res.status(200).json({
        items: []
      });
    }

    res.status(200).json({
      items: cart.items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REMOVE ITEM FROM CART
 * DELETE /api/cart/remove
 */
export const removeFromCart = async (req, res) => {
  const { userId, productId, size, quantity = 1 } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const item = cart.items[itemIndex];
    item.quantity -= quantity;

    if (item.quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    res.status(200).json({
      message: "Item quantity updated",
      items: cart.items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
