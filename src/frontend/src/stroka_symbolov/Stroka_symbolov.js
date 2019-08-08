import React, { Component, Fragment } from "react";

export class Stroka_symbolov extends Component {
  state = {
    stroka: "",
    resultat: {}
  };

  sortmort(myString) {
    var arr = myString.trim().split("");
    arr.sort();
    var letters_count = {};
    for (let i = 0; i < arr.length; i++) {
      if (letters_count[arr[i]] == undefined) letters_count[arr[i]] = 0;
      letters_count[arr[i]]++;
    }

    return letters_count;
  }

  onChange = e =>
    this.setState({
      resultat: this.sortmort(e.target.value)
    });

  renderTableData(array) {
    const { stroka, resultat } = this.state;
    const keys = Object.keys(resultat);
    return (
      <Fragment>
        {keys.map(i => (
          <Fragment key={i}>
            <tr>
              <td>{i}</td>
              <td>{resultat[i]}</td>
            </tr>
          </Fragment>
        ))}
      </Fragment>
    );
  }

  render() {
    const { stroka, resultat } = this.state;
    const keys = Object.keys(resultat);
    const values = Object.values(resultat);
    console.log(values);
    values.map(i => console.log(i));
    return (
      <Fragment>
        <h2>Строка симболов</h2>
        <div className="container" />
        <input
          className="form-control"
          type="text"
          name="stroka"
          onChange={this.onChange}
        />
        <table className="table table-striped">{this.renderTableData()}</table>
      </Fragment>
    );
  }
}

export default Stroka_symbolov;
