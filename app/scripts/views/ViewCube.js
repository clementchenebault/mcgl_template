import GL from '../helpers/GLHelpers';
import GLShader from '../helpers/gl_helpers/GLShader';
import Matrices from '../helpers/gl_helpers/Matrices';
import vs from '../../shaders/cdv_2_cube.vert'
import fs from '../../shaders/cdv_2_cube.frag'

import Cube from '../helpers/gl_helpers/geometry/Cube';


class ViewCube {
  constructor(){
    this.tick = 0;
    this.shader = new GLShader(vs, fs);
    this.shader.bind();
    this.cube = new Cube(this.shader.shaderProgram, 100, 100, 100);
    this.cube.position = [0, 200, 100]

    this.backValue = 0;
    this.targetValue = 0;

    this.dirLight = null;
    this.pointLight = null;

    this.angle = 0;

    this.baseMatrix = Matrices.identity();
    // this.cubeRotationMatrix = Matrices.identity(); //Matrices.rotationMatrix([0,1,0], this.angle);
    // this.cubeTranslationMatrix = Matrices.identity(); //Matrices.rotationMatrix([0,1,0], this.angle);
    // this.cubeTranslationMatrix = Matrices.translation(-this.cube.width/2, -this.cube.height/2, -this.cube.depth, this.cubeTranslationMatrix);
    // this.cubeTranslationMatrix = Matrices.translation(this.cube.width/2, this.cube.height/2, this.cube.depth/2, this.cubeTranslationMatrix);
    // this.tick =
  }

  attachLights(directionalLight, pointLight){
    this.dirLight = directionalLight;
    this.pointLight = pointLight;
  }

  render(){

    this.shader.bind(); // just to use propgram

    if(this.dirLight){
      this.shader.uniform("u_lightDir", 'vec3', this.dirLight.dir);
      this.shader.uniform("u_colorLightDir", 'vec4', this.dirLight.color);
    }

    if(this.pointLight){
      this.shader.uniform("u_pointLightPos", 'vec3', this.pointLight.pos);
      this.shader.uniform("u_colorLightPoint", 'vec3', this.pointLight.color);
    }

    this.angle += 0.02;
    this.baseMatrix = Matrices.identity(this.baseMatrix);
    this.baseMatrix = Matrices.translate(this.baseMatrix, -25, -25, -25);
    this.baseMatrix = Matrices.yRotate(this.baseMatrix, this.angle);

    // Matrices.yRotation(this.angle, this.cubeRotationMatrix), this.cubeTranslationMatrix);
    // this.baseMatrix = Matrices.translate(Matrices.yRotation(this.angle, this.cubeRotationMatrix), this.cubeTranslationMatrix);
    this.shader.uniform("u_matrix", 'mat4', this.baseMatrix);

    this.tick++;

    this.time = Math.cos(this.tick / 200 + Math.PI / 2) * 10
    this.cube.render();
  }
}

export default ViewCube;
