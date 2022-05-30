import { connectDatabase, insertDocument } from '../../../helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    let client;
    try {
      client = connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed.' });
      return;
    }

    const document = { email: email };

    try {
      await insertDocument(client, 'emails', document);
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Inserting data to the database failed.' });
      return;
    }

    res.status(201).json({
      message: 'Success',
    });
  }
}
