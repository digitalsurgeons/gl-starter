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
        color: [1, 0, 0, 1]
      },

      elements: bunny.cells
    })

    state.regl.frame(function (props) {
      state.camera(function () {
        state.draw()
      })
    })

    emitter.emit('render')

    // emitter.on('slider', function (num) {
    //   state.count = num
    //   state.regl.clear({
    //     color: [0, 0, 0, 1],
    //     depth: 1
    //   })
    //   state.colors = [1, 0, 1, 1]
    //   state.draw()
    // })
  })
}
