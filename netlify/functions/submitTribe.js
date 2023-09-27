const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

exports.handler = async function (event, context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  };

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: 'Method Not Allowed',
      headers: corsHeaders
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return { 
      statusCode: 400, 
      body: 'Bad Request: Invalid Input',
      headers: corsHeaders 
    };
  }

  try {
    const response = await client.query(
      q.Create(q.Collection('sofaTribes'), { data: data })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: corsHeaders
    };
  } catch (error) {
    console.error('Error Details:', error);
    console.error('Sent Data:', data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: corsHeaders
    };
  }
};
