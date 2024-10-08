const OrderModel = require("../models/Order");

exports.getAllOrders = (req, res) => {
  OrderModel.find({})
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.createOrder = async (req, res) => {
  try {
    // Step 1: Find the latest order by orderID
    const latestOrder = await OrderModel.findOne({})
      .sort({ orderID: -1 })
      .exec();

    // Step 2: Extract the number from the last orderID and increment it
    let nextOrderID = "ord10"; // Default starting point if no orders exist

    if (latestOrder) {
      const lastOrderID = latestOrder.orderID; // e.g., "ord10"
      const orderNumber = parseInt(lastOrderID.replace("ord", "")); // Extract the number part
      nextOrderID = `ord${orderNumber + 1}`; // Increment the number
    }

    // Step 3: Create the new order with the incremented orderID
    const order = { ...req.body, orderID: nextOrderID };
    const newOrder = new OrderModel(order);
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order", details: err });
  }
};

exports.getOrderById = (req, res) => {
  const id = req.params.id;
  OrderModel.findById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch order", details: err });
    });
};

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const updatedOrder = req.body;

  OrderModel.findByIdAndUpdate(id, updatedOrder, { new: true })
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).json({ error: "Failed to update order", details: err })
    );
};

exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  OrderModel.findByIdAndDelete(id)
    .then((deletedOrder) => {
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order deleted successfully", deletedOrder });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getOrderWithDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId).populate("customer_ID"); // Populate customer details
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch order details", details: err.message });
  }
};

exports.createOrderWithDetails = async (req, res) => {
  try {
    const { orderID, orderDate, totalPrice, customer_ID, items } = req.body;

    const newOrder = new OrderModel({
      orderID,
      orderDate,
      totalPrice,
      customer_ID,
      orderDetails: items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        subTotal: item.quantity * item.price,
      })),
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: err.message });
  }
};
