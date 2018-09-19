import ArtistController from './artist.api';

export default class ArtistRoutes {
  static init(router) {
    router.get('/artist/:id/performances', ArtistController.performances);
    router.get('/artist/:id/works', ArtistController.works);
    //artist detail
    router.get('/artist/:id', ArtistController.get);
    //artist list
    router.get('/artist', ArtistController.query);
  }
}
