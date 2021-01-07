import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SnakeComponent extends Component {
  speed = 200;
  width = 20;
  hight = 20;

  interval = null;
  isPlaying = false;
  squares = [];

  @tracked currentSnake = [2, 1, 0];
  @tracked appleIndex = 0;
  @tracked direction = 1;

  get grid() {
    for (let i = 0; i < this.width * this.hight; i++) {
      const cell = document.createElement('DIV')
      this.squares.push(cell)
    }

    return this.squares
  }

  setupGame() {
    this.currentSnake.forEach(index => this.squares[index].classList.remove('snake'))
    this.squares[this.appleIndex].classList.remove('apple')
    this.direction = 1
    this.currentSnake = [2, 1, 0]
    this.currentSnake.forEach(index => this.squares[index].classList.add('snake'))
    this.randomApple()
  }

  randomApple() {
    do {
      this.appleIndex = Math.floor(Math.random() * this.squares.length)
    } while (this.squares[this.appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    return this.squares[this.appleIndex].classList.add('apple')
  }

  moveOutcomes() {
    if (
      (this.currentSnake[0] + this.width >= (this.width * this.width) && this.direction === this.width) || //bottom
      (this.currentSnake[0] % this.width === this.width - 1 && this.direction === 1) || //right wall
      (this.currentSnake[0] % this.width === 0 && this.direction === -1) || //left wall
      (this.currentSnake[0] - this.width < 0 && this.direction === -this.width) ||  //top
      this.squares[this.currentSnake[0] + this.direction].classList.contains('snake') //itself
    ) {
      clearInterval(this.interval)
      this.isPlaying = false
      return alert('game over')
    }

    const tail = this.currentSnake.pop()
    this.squares[tail].classList.remove('snake')
    this.currentSnake.unshift(this.currentSnake[0] + this.direction) //gives direction to the head of the array

    //snake gets apple
    if (this.squares[this.currentSnake[0]].classList.contains('apple')) {
      this.squares[this.currentSnake[0]].classList.remove('apple')
      this.squares[this.currentSnake[0]].classList.add('snake')
      this.squares[tail].classList.add('snake')
      this.currentSnake.push(tail)
      this.randomApple()
    }
    this.squares[this.currentSnake[0]].classList.add('snake')
  }

  @action
  startGame() {
    let gs = this;

    if (!this.isPlaying) {
      this.setupGame()
      this.isPlaying = true;
    }

    this.interval = setInterval(this.moveOutcomes.bind(this), this.speed);

    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 39) {
        gs.direction = 1 //right
        return
      } else if (e.keyCode === 38) {
        gs.direction = -gs.width // up
        return
      } else if (e.keyCode === 37) {
        gs.direction = -1 // left
        return
      } else if (e.keyCode === 40) {
        gs.direction = +gs.width // down
        return
      }
    })
  }
}
