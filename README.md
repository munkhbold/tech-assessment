**Instruction**
# Installation
1. Create `.env` file in the root directory at the same level as src. So you can add the following variables inside the `.env` file.
```
    RUN_MODE=local
    TEST_DB_NAME=test_db_name
    DB_NAME=db_name
    DB_USER=user
    DB_PASSWORD=password
```
2. Create databases with the name assigned to the following variables `TEST_DB_NAME` and `DB_NAME`
3. You can install dependencies, run `npm install`.

# Start-server
You can start server with `npm run dev` command.

# Run-test
You can execute all tests with `npm run test-dev` command.

# Routes
- GET api/v1/events
```
  You can filter by query parameters such as id, name, cat and member.
  For example: api/v1/events?id=1&cat=test&cat=asd&name=child&member=true
```
- GET api/v1/tickets
```
  You can filter by id.
  For example: api/v1/events?id=1
```
- GET api/v1/orders
- POST api/v1/orders
```
      data: {
        customerName: string
        eventId: int
        ticketId: int
        quantity: int
        isMember: bool ('true' or 'false')
      }
```