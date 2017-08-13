// TCW -- button for script subscription

const html = require('choo/html')

module.exports = function renderSubscribeBtn (state, emit, prescript) {
  console.log('prescript in button', prescript)
  if (prescript.isSubscribed) {
    return html`
      <button id="subscribe-toggle" class="btn center" onmouseout=${onShowSubscribedButton} onmouseover=${onShowUnsubcsribeButton} onclick=${toggleSubscript}>Subscribed<i class="fa fa-check"></i></button>
    `
  } else {
    return html`
      <button id="subscribe-toggle" class="btn primary center" onclick=${toggleSubscript}>Subscribe<i class="fa fa-plus"></i></button>
    `
  }

  function toggleSubscript () {
    state.toggleSubscript(prescript)
  }

  function onShowUnsubcsribeButton () {
    const btn = document.getElementById('subscribe-toggle')
    btn.innerHTML = 'Unsubscribe<i class="fa fa-times"></i>'
  }

  function onShowSubscribedButton () {
    const btn = document.getElementById('subscribe-toggle')
    btn.innerHTML = 'Subscribed<i class="fa fa-check"></i>'
  }
}

// END
