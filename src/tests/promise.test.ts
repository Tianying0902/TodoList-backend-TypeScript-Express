import queryPromise from "../app/Models/promise";
import dbConnection from "../app/Models/dbConnection";
const connectionMock = jest.fn(dbConnection);

test("make sure connect to database successfully", async () => {
  const selectAllTasks = "SELECT * from todo";
  await queryPromise(selectAllTasks, connectionMock);
  expect(connectionMock.mock.calls.length).toBe(1);
});

test("the fetch fails with a table that is not exist", async () => {
  //   expect.assertions(1);
  const wrongTableName = "xxx";
  const wrongQuery = "SELECT * from " + wrongTableName + "";
  try {
    await queryPromise(wrongQuery, connectionMock);
  } catch (err) {
    expect(String(err)).toBe(
      "Error: ER_NO_SUCH_TABLE: Table 'nodesql.xxx' doesn't exist"
    );
  }
});
