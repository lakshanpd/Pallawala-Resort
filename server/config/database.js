import React, { Component } from 'react';
import p5 from 'p5';

class Mover {
  constructor(x, y, p) {
    this.colorMap = ['#1abc9c', '#3498db', '#9b59b6'];
    this.maxSpeed = 6;
    this.rotation = 0;

    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.p = p;
  }

  update() {
    const { mouseX, mouseY, pmouseX, pmouseY } = this.p;

    const mouseSpeed = this.p.dist(mouseX, mouseY, pmouseX, pmouseY);

    this.acceleration = this.p.createVector(mouseX - this.position.x, mouseY - this.position.y);
    this.acceleration.setMag(0.2);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    const vd = this.p.createVector(mouseX - this.position.x, mouseY - this.position.y);

    this.rotation = this.p.atan2(vd.y, vd.x);
  }

  draw() {
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.rotation);
    this.p.noStroke();
    this.p.rect(-20, -5, 20, 5);
    this.p.fill(
      this.colorMap[Math.floor(Math.random() * this.colorMap.length)]
    );
    this.p.rect(0, -5, 5, 5);
    this.p.pop();
  }
}

class Sketch extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.numMovers = 20;
  }

  componentDidMount() {
    this.sketch = new p5(this.createSketch, this.canvasRef.current);
  }

  componentWillUnmount() {
    this.sketch.remove();
  }

  createSketch = (p) => {
    let movers = [];

    p.setup = () => {
      const { innerWidth, innerHeight } = window;
      p.createCanvas(innerWidth, innerHeight);

      for (let i = 0; i < this.numMovers; i++) {
        movers.push(
          new Mover(p.random(0, p.width), p.random(0, p.height), p)
        );
      }
    };

    p.draw = () => {
      p.background(33);

      const { mouseX, mouseY, pmouseX, pmouseY } = p;

      const mouseSpeed = p.dist(mouseX, mouseY, pmouseX, pmouseY);

      // Increase the number of movers only when the mouse speeds up
      if (mouseSpeed > 10) { // You can adjust the threshold for speed increase
        this.numMovers += 1;
        movers.push(
          new Mover(p.random(0, p.width), p.random(0, p.height), p)
        );
      }

      movers.forEach((mover) => {
        mover.update();
        mover.draw();
      });
    };

    p.windowResized = () => {
      const { innerWidth, innerHeight } = window;
      p.resizeCanvas(innerWidth, innerHeight);
    };
  };

  render() {
    return <div ref={this.canvasRef}></div>;
  }
}

export default Sketch;
