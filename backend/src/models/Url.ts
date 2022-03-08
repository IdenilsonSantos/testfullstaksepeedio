import { model, Schema } from 'mongoose';

const UrlSchema: Schema = new Schema({
  urlOrigin: { type: String, required: true },
  urlShort:  { type: String, required: true },
  urlShortHash: { type: String, required: true },
  urlTitle: { type: String, required: true },
  urlViewsCounter: { type: Number, required: false },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }]
}, { timestamps: true });

const Url = model('Url', UrlSchema, 'urls');

export default Url;