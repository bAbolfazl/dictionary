import React, { Component } from "react";

import EditWordRow from "./EditWordRow";

class WordRow extends Component {
  constructor() {
    super();
    this.state = {
      isShown: true,
      editIsShown: false,
    //   updated: true
    };
  }

//   update = () => {console.log(this.state.updated)
//     this.setState({ updated: !this.state.updated });
//   };

  editWord = () => {
    this.setState({ editIsShown: true });
  };

  closeEditWord = () => {
    this.setState({ editIsShown: false });
  };

  deleteWord = () => {
    const { id } = this.props;

    fetch("http://localhost:3001/delete_word", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id
      })
    })
      //   .then(res => res.json())
      .then(() => {
        this.setState({ isShown: false });
        alert("deleted");
      });
  };

  render() {
    // console.log("wordRow props", this.props);
    const { persian, english, id } = this.props;
    if (!this.state.isShown) {
      return <div></div>;
    }
    return (
      <div className="singleData">
        <div className="singleData__">
          <button onClick={this.editWord}>E</button>
          <button onClick={this.deleteWord}>D</button>
        </div>
        <div className="singleData__eng">{english}</div>
        <div className="singleData__per">{persian}</div>
        {this.state.editIsShown && (
          <EditWordRow
            closeEditWord={this.closeEditWord}
            update={this.update}
            persian={persian}
            english={english}
            id={id}
            getWordList={this.props.getWordList}
          />
        )}
      </div>
    );
  }
}

export default WordRow;
