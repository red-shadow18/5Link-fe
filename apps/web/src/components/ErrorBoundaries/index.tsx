import React from "react";

class ErrorBoundary extends React.Component<{
    children?: React.ReactNode;
    fallback?: React.ReactNode;
}>{
    state = { hasError: false };

    static getDerivedStateFromError(error: any) {
        console.error("ErrorBoundary caught an error", error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ||  <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;