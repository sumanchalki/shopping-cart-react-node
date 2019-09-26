import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // TODO: To log error reporting service.
  }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong.</h3>;
    }

    return this.props.children; 
  }
}
