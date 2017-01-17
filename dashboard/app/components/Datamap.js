var React = require('react');
var Datamaps = require('datamaps/dist/datamaps.all.min.js');


var Datamap = React.createClass({

    propTypes: {
        arc: React.PropTypes.array,
        arcOptions: React.PropTypes.object,
        bubbleOptions: React.PropTypes.object,
        bubbles: React.PropTypes.array,
        graticule: React.PropTypes.bool,
        labels: React.PropTypes.bool
    },

    componentWillMount: function () {
      console.log("Datamap will mount");

      window.addEventListener('resize', this.resize);
    },

    resize: function () {
      console.log("Datamap is resizing");

      if (this.map) {
          this.map.resize();
      }
    },

    componentDidMount: function () {
      console.log("Datamap compnent did mount");

      this.drawMap();
    },

    componentWillReceiveProps: function () {
      console.log("Datamap component received props");

      this.clear();
    },

    componentDidUpdate: function () {
      console.log("Datamap component did update");

      this.drawMap();
    },

    componentWillUnmount: function () {
      console.log("Datamap component will unmount");

      this.clear();
      window.removeEventListener('resize', this.resize);
    },

    clear: function() {
      console.log("Datamap is clearing");

      var container = this.refs.container;
      for (var child of Array.from(container.childNodes)) {
        container.removeChild(child);
      }
    },

    drawMap: function() {

      var obj = {};
      var obj2 = {
          element: this.refs[this.props.reference],
          projection: 'mercator',
          responsive: true
      };

      for (var attrname in this.props) { obj[attrname] = this.props[attrname]; }
      for (var attrname in obj2) { obj[attrname] = obj2[attrname]; }

      var map = new Datamaps(obj);

      if (this.props.arc) {
          map.arc(this.props.arc, this.props.arcOptions);
      }

      if (this.props.bubbles) {
          map.bubbles(this.props.bubbles, this.props.bubbleOptions);
      }

      if (this.props.graticule) {
          map.graticule();
      }

      if (this.props.labels) {
          map.labels();
      }

      this.map = map;
    },

    render: function () {
      console.log("Datamap rendering");

      var style = {
          position: 'relative',
          width: '110%',
          height: '100%'
      };

      return <div ref={this.props.reference} style={style}></div>;
    }
});

module.exports = Datamap;
