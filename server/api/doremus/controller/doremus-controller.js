import DoremusDAO from '../dao/doremus-dao';

export default class DoremusController {
  static getAll(req, res) {
    DoremusDAO
      .getAll()
  }
