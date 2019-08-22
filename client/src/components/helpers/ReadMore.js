import React, { Component } from 'react';

export default class ReadMore extends Component {
  truncateStr = (text, length) => {
    if (text.length > length)
      return { truncated: true, truncatedValue: text.substring(0, length - 3) + '...' };
    else
      return { truncated: false, truncatedValue: text };
  }

  render() {
    const text = this.props.text;
    const length = this.props.length;
    const { truncated, truncatedValue } = this.truncateStr(text, length);

    return <span title={truncated ? text : ''}>{truncatedValue}</span>;
  }
}
