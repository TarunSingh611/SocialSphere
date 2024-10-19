'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  renderErrorDetails(): ReactNode {
    const { error, errorInfo } = this.state;

    return (
      <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
        <h2>Something went wrong:</h2>
        <p>{error?.message}</p>
        {errorInfo && (
          <>
            <p>Component stack trace:</p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{errorInfo.componentStack}</pre>
            {this.renderErrorDetailsFromStack(errorInfo.componentStack)}
          </>
        )}
        <button onClick={this.handleReload} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#721c24', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Reload Page
        </button>
      </div>
    );
  }

  renderErrorDetailsFromStack(stack: string): ReactNode {
    const match = stack.match(/at\s(.*?)[^\(]*\((.*?)(?::(\d+):(\d+)|:([\d]+:[\d]+))\)/);

    if (match) {
      const componentName = match[1] || 'Unknown Component';
      const fileName = match[2] || 'Unknown File';
      const lineNumber = match[3] || match[5] || 'Unknown Line';

      return (
        <div style={{ marginTop: '10px' }}>
          <p>Component: {componentName}</p>
          <p>File: {fileName}</p>
          <p>Line Number: {lineNumber}</p>
        </div>
      );
    }

    return null;
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.renderErrorDetails();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
