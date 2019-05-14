import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryStack,
  VictoryGroup
} from "victory-native";

const random = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
      moreData: this.getData(),
      initialRender: true
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(0),
        moreData: this.getData(1),
        initialRender: false
      });
    }, 7000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData = (bonus = 0) =>
    [...Array(7).keys()].map(i => {
      if (i == 0) {
        return { x: 1, y: 0 };
      }
      if (i == 1) {
        return { x: 2, y: random(0, 2 + bonus) };
      }
      if (i == 2) {
        return { x: 3, y: random(1, 3 + bonus) };
      }
      if (i == 3) {
        return { x: 4, y: random(2, 4 + bonus) };
      }
      return {
        x: i + 1,
        y: random(3, 10)
      };
    });

  render() {
    const { data, moreData } = this.state;
    return (
      <View style={{ marginTop: 200 }}>
        <VictoryGroup
          padding={0}
          height={100}
          animate={{
            onLoad: { duration: 0 },
            duration: 6900,
            easing: "linear"
          }}
          domain={{ x: [1, 7], y: [0, 11] }}
        >
          <VictoryArea
            interpolation="natural"
            style={{
              data: { fill: "gold", opacity: 0.4 }
            }}
            data={moreData}
          />
          <VictoryArea
            interpolation="natural"
            style={{
              data: { fill: "palegreen", opacity: 0.4 }
            }}
            data={data}
          />
        </VictoryGroup>
      </View>
    );
  }
}
