import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(err) {
        return { hasError: true }
    }

    componentDidCatch(err, errInfo) {
        console.log(err, errInfo)
    }

    render() {
        if (this.state.hasError){
            return <h1 className='errorCatcherDialog'>oops! something went wrong</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;