import VocabularyController from './vocabulary.api';

function sendNameList(req, res) {
  res.json([
    'carrier',
    'color',
    'derivation',
    'function',
    'genre',
    'diabolo/genre',
    'iaml/genre',
    'itema3/genre',
    'itema3/genre/musdoc',
    'redomi/genre',
    'id',
    'key',
    'level',
    'mode',
    'mop',
    'diabolo/mop',
    'iaml/mop',
    'itema3/mop',
    'redomi/mop',
    'noise_reduction',
    'performance_condition',
    'performer_status',
    'playing_speed',
    'recording_equipment',
    'responsibility',
    'spazialization',
    'technique',
    'work_type',
  ]);
}

export default class VocabularyRoutes {
  static init(router) {
    router.get('/vocabulary/:id', VocabularyController.get);
    router.get('/vocabulary/:brand/:id', VocabularyController.get);
    router.get('/vocabulary/', sendNameList);
  }
}
