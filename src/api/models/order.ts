const OrderModel = (sequelize, type) => {
    return sequelize.define('orders', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_placed: {
        type: type.DATE,
        defaultValue: sequelize.NOW
      },
      customer_name: type.STRING,
      event_id: type.INTEGER,
      ticket_type_id:  type.INTEGER,
      ticket_quantity:  type.INTEGER,
      is_member_purchase:  type.BOOLEAN,
    });
  };

export default OrderModel;