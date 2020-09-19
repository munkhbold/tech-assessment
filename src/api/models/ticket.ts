const TicketModel = (sequelize, type) => {
    return sequelize.define('tickets', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      max_purchasable: type.INTEGER,
      price: type.FLOAT,
      description:  type.STRING,
    });
  };

export default TicketModel;