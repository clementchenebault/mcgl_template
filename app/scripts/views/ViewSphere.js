import GLShader from '../helpers/gl_helpers/GLShader';
import Matrices from '../helpers/gl_helpers/Matrices';
import vs from '../../shaders/weirdSphere.vert'
import fs from '../../shaders/weirdSphere.frag'

import Sphere from '../helpers/gl_helpers/geometry/Sphere';

class ViewSphere {
  constructor(){
    this.tick = 0;
    this.shader = new GLShader(vs, fs);
    this.shader.bind();
    this.sphere = new Sphere(this.shader.shaderProgram, 128, 150);
    this.sphere.position = [0, 200, 100]

    this.back = false;
    var rot = Matrices.identity();
    rot = Matrices.multiply(rot, Matrices.yRotate(rot, Math.PI));
    this.shader.uniform("back", "float", 1);
    this.shader.uniform("time", "float", 0);
    this.shader.uniform("u_matrix", "mat4", rot);

    this.backValue = 0;
    this.targetValue = 0;

    // this.tick =
  }

  render(){

    this.shader.bind(); // just to use propgram
    // // console.log(this.back, this.tick);
    // if(this.back){
    //   this.tick -= 1/20;
    //   this.targetValue = -1;
    //   this.shader.uniform("back", "float", this.backValue);
    //   if(this.tick < -10){
    //     this.back = false;
    //   }
    // }
    // else {
    //   this.tick+= 1/20;
    //   // console.log("here");
    //   this.targetValue = 1;
    //   this.shader.uniform("back", "float", this.backValue);
    // }
    //
    //
    // this.backValue += (this.targetValue - this.backValue)* 0.01;
    //
    // if(this.tick > 10){
    //
    //   this.back = true;
    // }

    this.tick++;

    this.time = Math.cos(this.tick / 200 + Math.PI / 2) * 10
    this.shader.uniform("time", "float", this.time);
    // this.shader.uniform("time", "float", this.tick);
    // this.sphere.render();
    GL.draw(this.sphere);
  }
}

export default ViewSphere;
