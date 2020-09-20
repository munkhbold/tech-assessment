**Instruction**
# Installation
1. Create `.env` file in root directory same level with src. So you can add follow variables inside the `.env` file.
    RUN_MODE=local
    TEST_DB_NAME=test_ticket_order_db
    DB_NAME=ticket_order_db
    DB_USER=user
    DB_PASSWORD=password
2. Create databases with name assigned to following variables `TEST_DB_NAME` and `DB_NAME`.
3. You can install dependencies, run `npm install`.

# Start-server
You can start server run `npm run dev`.

# Run-test
You can start server run `npm run test-dev`.

# Routes
- GET api/v1/events
  You can filter by query parameters such as id, name, cat and member.
  For example: api/v1/events?id=1&cat=test&name=child&member=true
- GET api/v1/tickets
- GET api/v1/orders
- POST api/v1/orders
      data: {
        customerName: string
        eventId: int
        ticketId: int
        quantity: int
        isMember: true or false
      }