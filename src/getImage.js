import human from './assets/human.jpg';
import droid from './assets/Droid.png';
import gungan from './assets/Gungans.jpg';
import kaminoan from './assets/kamioans.jpg';
import tholothian from './assets/tholothian.jpg';
import unknown from './assets/yoda.jpg';
import wookiee from './assets/wookiee.jpg';
import pauan from './assets/pauan.jpg';
import rodian from './assets/rodian.jpg';
import twilek from './assets/twilek.png';
import mirialan from './assets/mirialan.jpg';

export function getImage(species) {
    switch (species) {
        case 'Human':
            return human;
        case 'Droid':
            return droid;
        case 'Gungan':
            return gungan;
        case 'Tholothian':
            return tholothian;
        case 'Kaminoan':
            return kaminoan;
        case 'Wookie':
            return wookiee;
        case "Pau'an":
            return pauan;
        case 'Rodian':
            return rodian;
        case "Twi'lek":
            return twilek;
        case 'Mirialan':
            return mirialan;
        default:
            return unknown;
    }
}
