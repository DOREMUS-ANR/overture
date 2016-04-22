import Doremus from '../../../server/api/doremus/dao/doremus-dao';
import dbJson from './db.json';

exports.setupMongoose = (mongoose) => {
  mongoose.models = {};
  mongoose.connect(dbJson.db.test.url);
  mongoose.connection.on('error', () => {});
}

exports.createDoremus = () => {
    let _array = [];

    return Doremus.createDoremus(_array);
}
