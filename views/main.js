var html = require('choo/html')

var TITLE = 'gl-starter - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <section class="fl mw6 w-50-m w-third-l pa3">
          <h2>webgl starter</h2>
          <input type="range" oninput=${handleSlider}>
          ${state.canvas}
        </section>
      </main>
    </body>
  `

  function handleSlider (e) {
    var num = e.target.value
    emit('slider', num)
  }
}
