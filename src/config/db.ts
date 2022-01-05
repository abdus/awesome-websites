import mongoose from 'mongoose';

let mongoDBConn: mongoose.Connection | null = null;
const connectionStr = `mongodb+srv://awesome-websites:DflGXoZqyDnCKhVV@cluster0.tptxt.mongodb.net/awesome-websites?retryWrites=true&w=majority`;

if (!mongoDBConn) {
  mongoose
    .connect(connectionStr)
    .then((m) => (mongoDBConn = m.connection))
    .catch(console.error);
}

function getUrlSchema() {
  const UrlsCollection = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    favicon: { type: String },
    description: { type: String },
  });

  return mongoose.model(`Url`, UrlsCollection);
}

export const urlModel = mongoose.models.Url
  ? mongoose.models.Url
  : getUrlSchema();
