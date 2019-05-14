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
import timer from "react-native-timer";

const random = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(0),
      moreData: this.getData(1),
      lastUpdated: 0
    };
  }

  componentDidMount() {
    timer.setTimeout(
      this,
      "quickFirstUpdate",
      () => {
        const { lastUpdated } = this.state;
        this.setState({
          data: this.getData(),
          moreData: this.getData(1),
          lastUpdated: lastUpdated + 1
        });
      },
      100
    );
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.lastUpdated < this.state.lastUpdated) {
      timer.setTimeout(
        this,
        "regularSlowUpdate",
        () => {
          const { lastUpdated } = this.state;
          this.setState({
            data: this.getData(),
            moreData: this.getData(1),
            lastUpdated: lastUpdated + 1
          });
        },
        7000
      );
    }
  }

  getData = (bonus = 0) =>
    [...Array(7).keys()].map(i => {
      if (i == 0) {
        return { x: 1, y: 0 };
      }
      if (i == 1) {
        return { x: 2, y: bonus > 0 ? random(1, 3) : 0 };
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
          height={80}
          domain={{ x: [1, 7], y: [0, 11] }}
        >
          <VictoryArea
            interpolation="natural"
            animate={{
              onLoad: { duration: 0 },
              // easing: "quadInOut",
              duration: 6999
            }}
            style={{
              data: { fill: "gold", opacity: 0.4 }
            }}
            data={moreData}
          />
          <VictoryArea
            interpolation="natural"
            animate={{
              onLoad: { duration: 0 },
              easing: "quadInOut",
              duration: 6999
            }}
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
