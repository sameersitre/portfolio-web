"use client";

// Top-level React error boundary. Catches render-time errors anywhere in the
// page and renders a minimal fallback so the site stays partially usable.

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong<span className="text-accent">.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            An unexpected error occurred. Try refreshing the page — if it
            persists, please reach out.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="mt-6 rounded-full border border-accent bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
