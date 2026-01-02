import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// 🟢 PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { shippingInfo, paymentMethod, paymentDetails } = req.body;

    console.log("UserId:", userId);
    console.log("Body:", req.body);

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      products: cart.items,
      shippingInfo,
      paymentMethod,
      paymentDetails,
      totalAmount,
    });

    await order.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// 📦 GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ❌ CANCEL ORDER
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.userId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Delivered order cannot be cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

//REMOVE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    // user can delete only their own order
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json("You can delete only your orders");
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json("Order removed successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
