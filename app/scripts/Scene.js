import Camera from './helpers/gl_helpers/Camera'
import GLShader from './helpers/gl_helpers/GLShader';
import GL from './helpers/GLHelpers';
import OrbitalControl from './helpers/gl_helpers/OrbitalControl';

import Floor from './views/Floor';
import ViewBackground from './views/ViewBackground';
import AxisY from './helpers/gl_helpers/views/AxisY';
import ViewSphere from './views/ViewSphere';

let gl;

class Scene {
  constructor(){
    gl = GL.gl;
    this.tick = 0;

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.orbitalControl = new OrbitalControl();
    this.camera = new Camera();

    this.viewBackground = new ViewBackground();
    this.viewFloor = new Floor();
    this.viewSphere = new ViewSphere();

    window.addEventListener('resize', this.resize.bind(this));
  }

  update(){

    this.render();
  }


  render(){
    GL.setMatrices(this.camera);


    this.tick++;
    this.orbitalControl.offsetPosition[0] = 0;
    this.orbitalControl.offsetPosition[1] = 450;
    this.orbitalControl.radius = 800// + Math.cos(this.tick/100) * 100;
    // this.orbitalControl.angleA = Math.PI/2 + Math.cos(this.tick/200) * Math.PI/8;
    this.orbitalControl.angleA += 0.004;
    // this.orbitalControl.angleA = Math.PI /2;
    this.orbitalControl.update();
    this.camera.position = this.orbitalControl.position;

    this.camera.perspective(60 * Math.PI / 180, GL.aspectRatio, 1, 2000);
    var target = [0, 0, 0];
    var up = [0, 1, 0];

    this.camera.lookAt(target, up);

    gl.disable(gl.DEPTH_TEST);
    this.viewBackground.render();
    gl.enable(gl.DEPTH_TEST);

    this.viewFloor.render();
  }

  resize(){
    GL.resize(window.innerWidth, window.innerHeight);
    this.camera.setAspectRatio(GL.aspectRatio);
  }
}


export default Scene;
