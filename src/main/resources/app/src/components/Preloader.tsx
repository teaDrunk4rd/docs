import React, {Component} from 'react';
import './preloader.css'

interface PreloaderProps {
    className?: string
}

export default class Preloader extends Component<PreloaderProps> {
    render() {
        return (
            <div className={`uiblocker ${this.props.className ? this.props.className : ''}`}>
                <div className="loader">
                    <div className="loaderItem item-1"/>
                    <div className="loaderItem item-2"/>
                    <div className="loaderItem item-3"/>
                    <div className="loaderItem item-4"/>
                    <div className="loaderItem item-5"/>
                </div>
            </div>
        );
    }
}
