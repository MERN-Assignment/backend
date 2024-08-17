const OrderModel = require("../models/Order");
const OrderDetailModel = require("../models/OrderDetails");

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
    const order = req.body;
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
    const order = await OrderModel.findById(orderId).populate("customerID");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const orderDetails = await OrderDetailModel.find({ order: orderId });
    res.json({ order, orderDetails });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch order details", details: err.message });
  }
};

exports.createOrderWithDetails = async (req, res) => {
  try {
    const { orderID, orderDate, totalPrice, customerID, items } = req.body;

    const newOrder = new OrderModel({
      orderID,
      orderDate,
      totalPrice,
      customerID,
    });

    await newOrder.save();

    const orderDetails = items.map((item) => ({
      order: newOrder._id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const savedOrderDetails = await OrderDetailModel.insertMany(orderDetails);

    newOrder.orderDetails = savedOrderDetails.map((detail) => detail._id);
    await newOrder.save();

    res.status(201).json({ order: newOrder, orderDetails: savedOrderDetails });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: err.message });
  }
};
