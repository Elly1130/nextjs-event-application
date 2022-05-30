import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://mongodb:(E1l1L3y0)MN@cluster0.o0vk4.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(`${collection}`).insertOne(document);

  return result;
}

export async function getAllDocuments(collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(`${collection}`)
    .find()
    .sort(sort) // -1 to sort descending and +1 to sort ascending
    .toArray();

  return documents;
}
