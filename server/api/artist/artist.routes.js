import ArtistController from './artist.api';

export default class ArtistRoutes {
  static init(router) {
    //artist detail
    router.get('/artist/:id', ArtistController.get);
    //artist list
    router.get('/artist', ArtistController.query);
  }
}
