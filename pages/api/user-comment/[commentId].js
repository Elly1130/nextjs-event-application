import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util';

export default async function handler(req, res) {
  const id = req.query.commentId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed.' });
    return;
  }

  if (req.method === 'POST') {
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    const newComment = {
      email: email,
      name: name,
      text: text,
      id: id,
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);

      console.log(result);

      res.status(201).json({
        message: 'Success',
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Inserting data to the database failed.' });
    }
  } else if (req.method === 'GET') {
    let documents;
    try {
      documents = await getAllDocuments('comments', { _id: -1 });
      res.status(201).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed' });
    }
  }
  client.close();
}
