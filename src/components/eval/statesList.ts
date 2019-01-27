import { State } from './state'


var states = [
  new State('http://data.doremus.org/artist/b34f92ab-ad86-361b-a8b8-5c3a4db784d0'), // Vivaldi
  new State('http://data.doremus.org/artist/b34f92ab-ad86-361b-a8b8-5c3a4db784d0', false, true), // Vivaldi flat
  new State('http://data.doremus.org/artist/03954109-0253-35d6-a70e-89ab27dea09c', true), // Schubert
  new State('http://data.doremus.org/artist/1f1c9292-087a-3ac7-b854-84e213e69dc6', true), // Stravinsky
  new State('http://data.doremus.org/expression/d72301f0-0aba-3ba6-93e5-c4efbee9c6ea'), // Moonlight
  new State('http://data.doremus.org/expression/d72301f0-0aba-3ba6-93e5-c4efbee9c6ea', false, true), // Moonlight flat
  new State('http://data.doremus.org/expression/498ba265-1de0-30da-b9d1-07dbc2ec834c', true), //Ring des Nibelungende
  new State('http://data.doremus.org/expression/cded83a6-f8a5-3ea6-a3f5-2e7ff3547df9', true), // Spainish Keys
  new State('http://data.doremus.org/expression/bf596e5a-81f7-38de-a842-dff7d2339868', true), // Concert for clarinet
  new State('http://data.doremus.org/expression/c7889893-f8ca-3de5-9dc1-510531ba47a8', true, true) // Sonata for hapsicord
];


export default states;
