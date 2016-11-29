const {version} = require('./package');

function normalizedUri(input) {
  var prefix = 'http://';

  if (!/^([^:\/]+)(:\/\/)/g.test(input) && !prefix.includes(input)) {
    input = prefix + input;
  }

  return input;
}

var BrowserNavbarBtn = React.createClass({
  render: function() {
    return <a href="#" className={this.props.disabled?'disabled':''} title={this.props.title} onClick={this.props.onClick}><i className={'fa fa-'+this.props.icon} /></a>
  }
})

var BrowserNavbarLocation = React.createClass({
  onKeyDown: function (e) {
    if (e.keyCode == 13)
      this.props.onEnterLocation(normalizedUri(e.target.value))
  },
  onChange: function (e) {
    this.props.onChangeLocation(normalizedUri(e.target.value))
  },
  render: function() {
  return <div />
    return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} onContextMenu={this.props.onContextMenu} value={this.props.page.location} />
  }
})



var BrowserNavbar = React.createClass({
  render: function() {
    return <div id="browser-navbar">
       {/*
       <BrowserNavbarBtn title="Dev" icon="bug" onClick={this.props.onOpenDev} />
       <BrowserNavbarBtn title="Dev" icon="apple" onClick={this.props.onTest} />
      <BrowserNavbarBtn title="首页" icon="angle-double-left fa-lg" onClick={this.props.onClickHome} disabled={!this.props.page.canGoBack} />
       */}
      <BrowserNavbarBtn title="后退" icon="angle-left fa-lg" onClick={this.props.onClickBack} disabled={!this.props.page.canGoBack} />
      <BrowserNavbarBtn title="前进" icon="angle-right fa-lg" onClick={this.props.onClickForward} disabled={!this.props.page.canGoForward} />
      <BrowserNavbarBtn title="刷新" icon="fa fa-refresh" onClick={this.props.onClickRefresh} disabled={!this.props.page.canRefresh} />
      <div className="input-group">
        <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
      </div>
      <div className="version">
        当前版本：{version}
      </div>
    </div>
  }
})
