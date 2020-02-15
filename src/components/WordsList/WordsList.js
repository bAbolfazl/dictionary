import React, { Component } from "react";

import Word from "../WordRow/WordRow";

class WordsList extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  render() {
    const { wordList, getWordList } = this.props;
    // console.log("wordList", wordList);
    // console.log(wordList, wordList.length);
    // console.log("empt", !wordList[0]);

    // if (!wordList[0]) {
    //   console.log("empt", !wordList[0]);
    //   return <div>aa</div>;
    // } else {
      return (
        <div>
          <div>
            {wordList.map(data => {
              // console.log("aaa", data);
              return (
                <Word
                  key={data.id}
                  id={data.id}
                  persian={data.persian}
                  english={data.english}
                  userId={data.user_id}
                  getWordList={getWordList}
                />
              );
              // <WordRow />;
            })}
          </div>
        </div>
      );
    // }
  }
}

export default WordsList;
