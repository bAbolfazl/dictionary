import React from "react";

class EditWordRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      english: this.props.english,
      persian: this.props.persian
    };
  }

  editWord = () => {
    if (this.state.english === "") {
      alert("English is empty");
    } else {
      fetch("http://localhost:3001/edit_word", {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          persian: this.state.persian,
          english: this.state.english,
          id: this.props.id
        })
      })
        .then(res => res.json())
        .then(word => {
          console.log("reached update");
          this.props.getWordList();
          this.setState({ english: word.english, persian: word.persian });
          console.log("22reached update");
        });
      this.props.closeEditWord();
      // }
    }
  };

  handlePersian = e => {
    this.setState({ persian: e.target.value });
  };

  handleEnglish = e => {
    this.setState({ english: e.target.value });
  };

  render() {
    return (
      <div>
        <form className="edit-word-section">
          <div>
            <label>
              Engish word:
              <input value={this.state.english} onChange={this.handleEnglish} />
            </label>
          </div>
          <div>
            <label>
              Persian word:
              <input
                style={{ direction: "rtl" }}
                value={this.state.persian}
                onChange={this.handlePersian}
              />
            </label>
          </div>

          <button onClick={this.editWord}>edit</button>
          <button
            style={{ background: "darkkhaki" }}
            onClick={this.props.closeEditWord}
          >
            close
          </button>
        </form>
      </div>
    );
  }
}

export default EditWordRow;
