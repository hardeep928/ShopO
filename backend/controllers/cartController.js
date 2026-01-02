import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, title, price, image } = req.body;

    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist → create new
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, title, price, image, quantity: 1 }],
      });
    } else {
      // Check if product already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, title, price, image, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.productId === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      message: "Cart quantity updated",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};
