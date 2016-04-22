import mongoose from 'mongoose';

const _doremusSchema = {
  createdAt: {type: Date, default: Date.now}
}

export default mongoose.Schema(_doremusSchema);
