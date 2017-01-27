var React = require('react');

var MapLegend = React.createClass({
  render: function() {
    return (
      <div className="map-legend-and-switcher">
        <div className="map-legend has-dem-win has-gop-win">
          <table>
            <caption>Legend</caption>
            <thead>
              <tr>
                <th className="name"></th>
                <th className="win">Win</th>
                <th className="lead">Lead</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dem">
                <td className="name">Clinton</td>
                <td className="dem-win"></td>
                <td className="dem-lead"></td>
              </tr>
              <tr className="gop">
                <td className="name">Trump</td>
                <td className="gop-win"></td>
                <td className="gop-lead"></td>
              </tr>
              <tr className="lib">
                <td className="name">Johnson</td>
                <td className="lib-win"></td>
                <td className="lib-lead"></td>
              </tr>
              <tr className="grn">
                <td className="name">Stein</td>
                <td className="grn-win"></td>
                <td className="grn-lead"></td>
              </tr>
              <tr className="bfa">
                <td className="name">McMullin</td>
                <td className="bfa-win"></td>
                <td className="bfa-lead"></td>
              </tr>
              <tr className="other">
                <td className="name">Autres</td>
                <td className="other-win"></td>
                <td className="other-lead"></td>
              </tr>
              <tr className="tossup">
                <td className="name">No Result</td>
                <td className="tossup"></td>
                <td className="tossup-lead"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = MapLegend;
