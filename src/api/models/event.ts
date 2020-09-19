const EventModel = (sequelize, type) => {
    return sequelize.define('events', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_name: type.STRING,
      start_date: type.TIME,
      end_date: type.TIME,
      member_only:  type.BOOLEAN,
      category:  type.STRING,
    });
  };

export default EventModel;