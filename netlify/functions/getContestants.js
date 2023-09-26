const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

export const handler = async (event, context) => {
  try {
    // Fetch the only document in the collection
    const result = await client.query(
      q.Get(
        q.Select(
          [0],
          q.Paginate(q.Documents(q.Collection('contesants')), {
            size: 10,
          })
        )
      )
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(result['data']),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

