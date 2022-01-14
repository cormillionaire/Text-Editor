import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put  to the database');
  const jateDb = await openDB('content', 1);
  const tx = jateDb.transaction('content', 'readwrite').objectStore('content');
  const objectStoreContent = objectStore.get(content)
  objectStoreContent.onsuccess = () => {
    const data = objectStoreContent.result
    const updateContentRequest = tx.put(data);
    updateContentRequest.onerror = function (event) {
      console.error('getDb not implemented');
    };
    updateContentRequest.onsuccess = function (event) {
      displayData();
    }
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('content', 1);
  const tx = jateDb.transaction('content', 'readonly');
  const store = tx.objectStore('content');
  const request = store.getAll();
  const result = await request;
  request.onsuccess = function (event) {
    return result;
  };
  request.onerror = function (event) {
    console.error('getDb not implemented');
  };
};

initdb();