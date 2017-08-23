const html = require('choo/html')

module.exports = function renderSubscribeBtn (state, emit, gizmo) {
  if (gizmo.isSubscribed) {
    return html`
      <button id="subscribe-toggle" class="btn center" onmouseout=${onShowSubscribedButton} onmouseover=${onShowUnsubscribeButton} onclick=${toggleSubscribe}>Subscribed<i class="fa fa-check"></i></button>
    `
  } else {
    return html`
      <button id="subscribe-toggle" class="btn primary center" onclick=${toggleSubscribe}>Subscribe<i class="fa fa-plus"></i></button>
    `
  }

  function toggleSubscribe () {
    state.toggleSubscribe(gizmo)
  }

  function onShowUnsubscribeButton () {
    const btn = document.getElementById('subscribe-toggle')
    btn.innerHTML = 'Unsubscribe<i class="fa fa-times"></i>'
  }

  function onShowSubscribedButton () {
    const btn = document.getElementById('subscribe-toggle')
    btn.innerHTML = 'Subscribed<i class="fa fa-check"></i>'
  }
}
