import React from "react";
import "./NewDataTable.css";

import WordsList from "../WordsList/WordsList";
import AddWord from "../AddWord/AddWord";

class NewDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: this.props.user,
      showAddComp: false,
      wordList: [],
      filteredWord: ""
    };
  }

  openAddWord = () => {
    this.setState({ showAddComp: true });
  };
  closeAddWord = () => {
    this.setState({ showAddComp: false });
  };
  getWordList = () => {
    fetch("http://localhost:3001/show_words", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: this.props.user
      })
    })
      .then(res => res.json())
      .then(words => {
        this.setState({ wordList: words });
        console.log("updated word list");
      });
    // .then(words => this.setState({ wordList: words }));
    // console.log("fuchinkg list", this.state.wordList);
  };

  // openEditWord = event => {
  //   let target = event.target.id;
  //   console.log(target);

  //   // document.querySelector(".edit-word-section").style.display = "flex";

  //   this.closeAddWord();
  // };

  // closeEditWord = () => {
  //   document.querySelector(".edit-word-section").style.display = "none";
  // };

  handleSearch = e => {
    console.log("filtering");
    this.setState({ filteredWord: e.target.value });
  };

  componentDidMount() {
    this.getWordList();
  }
  // componentDidUpdate() {
  //   this.getWordList();
  // }

  render() {
    // const { user } = this.state;
    // console.log("state", this.state);
     console.log('wordList', this.state.wordList)

    const filteredWordList = this.state.wordList.filter(word => {
      return (
        word.english
          .toLowerCase()
          .includes(this.state.filteredWord.toLowerCase()) ||
        word.persian
          .toLowerCase()
          .includes(this.state.filteredWord.toLowerCase())
      );
    });

    return (
      <div>
        <div className="table">
          <div className="table_header">
            <input
              onChange={this.handleSearch}
              placeholder="search your dictionary"
            />
            <button onClick={this.openAddWord}>add new word</button>
          </div>
        </div>
        {this.state.showAddComp && (
          <AddWord
            user={this.props.user}
            getWordList={this.getWordList}
            closeAddWord={this.closeAddWord}
          />
        )}
        <WordsList wordList={filteredWordList} getWordList={this.getWordList} />
      </div>
    );
  }
}

export default NewDataTable;
