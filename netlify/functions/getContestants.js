const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET});

exports.handler = async (event, context) => {
  try {
    const results = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('contestants'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify(results.data.map(doc => doc.data)),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
