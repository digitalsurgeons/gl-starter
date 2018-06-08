var regl = require('regl')
var camera = require('regl-camera')
var bunny = require('bunny')

module.exports = store

function store (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
    state.canvas = document.createElement('canvas')
    state.width = state.canvas.width = window.innerWidth
    state.height = state.canvas.height = window.innerHeight

    state.regl = regl({canvas: state.canvas})

    state.camera = camera(state.regl, {
      distance: 30
    })

    state.draw = state.regl({
      frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }`,

      vert: `
      precision mediump float;
      uniform mat4 projection, view;
      attribute vec3 position;
      void main() {
        gl_Position = projection * view * vec4(position, 1);
      }`,

      attributes: {
        position: bunny.positions
      },

      uniforms: {
        color: state.regl.prop('color')
      },

      elements: bunny.cells
    })

    state.regl.frame(function (props) {
      state.regl.clear({
        color: [0, 0, 0, 0],
        depth: 1
      })

      state.camera(function () {
        state.draw({
          color: [
            Math.cos(props.time * state.slideColor || 0.1),
            Math.sin(props.time * 0.8),
            Math.cos(props.time * 0.3),
            1
          ]
        })
      })
    })

    emitter.emit('render')

    emitter.on('color', function (slide) {
      state.slideColor = slide
    })
  })
}
