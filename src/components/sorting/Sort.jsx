import React from "react";
import MergeSortAnimations from "../../algorithms/sorting/MergeSort";
import "./css/Sort.css";

export default class Sort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      ANIMATION_SPEED_MS: 1,
      NUMBER_OF_ARRAY_BARS: 310,
      PRIMARY_COLOR: "turquoise",
      SECONDARY_COLOR: "red",
      MAX_HEIGHT: 700,
      MIN_HEIGHT: 10,
      BAR_WIDTH: "2px",
      BAR_MARGIN: "1px"
    };
  }

  componentDidMount() {
    this.createNewArray();
  }

  // Creating a new array
  createNewArray() {
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      var value = Math.floor(
        Math.random() * (this.state.MAX_HEIGHT - this.state.MIN_HEIGHT + 1) +
          this.state.MIN_HEIGHT
      );
      array.push(value);
    }
    this.setState({ array: array });
  }

  mergeSort() {
    // Create animations
    const animations = MergeSortAnimations(this.state.array);
    // Draw bars on screen
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      // firts two values of every animation
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0 ? this.state.SECONDARY_COLOR : this.state.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{
              backgroundColor: this.state.PRIMARY_COLOR,
              height: `${value}px`,
              width: this.state.BAR_WIDTH,
              display: "inline-block",
              margin: `0 ${this.state.BAR_MARGIN}`
            }}
          ></div>
        ))}
        <button onClick={() => this.createNewArray()}>
          Generate New Array
        </button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
      </div>
    );
  }
}
