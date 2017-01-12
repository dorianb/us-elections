var React = require('react');

var NavBar = React.createClass({
  render: function () {
    return (
      <div className="navbar navbar-inverse" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand" href="/">
              { /*<span className="glyphicon glyphicon-chevron-left"></span>*/ }
              Elections américaines
            </a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-left">
              { /*<li><a href="s/home">Home</a></li>*/ }
              { /*<li><a href="/team">Team</a></li>*/ }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NavBar;
