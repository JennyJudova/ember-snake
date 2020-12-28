import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';


export default class SnakeComponent extends Component {

  get grid() {
    console.log('this')
    let grid = []
    let i;
    let width = 20;
    let hight = 20;
    for (i = 1; i <= width * hight; i++) {
      grid.push(i);
    }
    return grid
  }
}
