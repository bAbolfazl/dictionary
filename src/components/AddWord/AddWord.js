import React from "react";

class AddWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      english: "",
      persian: ""
    };
  }

  closeAddWord = () => {
    this.props.closeAddWord();
  };

  handleChange = event => {
    // console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  // onPerChange = e => {
  //   this.setState({ persian: e.target.value });
  // };
  // onEngChange = e => {
  //   this.setState({ english: e.target.value });
  // };

  addWordDB = e => {
    // e.preventDefault();

    fetch("http://localhost:3001/add_word", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        persian: this.state.persian,
        english: this.state.english,
        user_id: this.props.user
      })
    })
      .then(response => response.json())
      .then(word => {
        console.log("word", word);

        if (word.id) {
          console.log("Added successfully");
          this.props.getWordList();
        } else {
          alert("Couldnt add");
        }
      });
    this.props.closeAddWord();
  };

  render() {
    // console.log(this.props);
    return (
      <form className="add-word-section">
        <div>
          <label>
            Engish word:
            <input type="text" name="english" onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Persian word:
            <input
              type="text"
              name="persian"
              onChange={this.handleChange}
              style={{ direction: "rtl" }}
            />
          </label>
        </div>

        <button onClick={this.addWordDB}> add </button>

        <button style={{ background: "darkkhaki" }} onClick={this.closeAddWord}>
          close
        </button>
      </form>
    );
  }
}

export default AddWord;
