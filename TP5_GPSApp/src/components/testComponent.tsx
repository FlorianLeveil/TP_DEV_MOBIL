import React, { Component } from "react";

interface IProps {
}

interface IState {
    longitude: number,
    latitude: number,
}

class TestComponent extends Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0,
        };
    }

    componentDidMount() {
        this.getData();

        setInterval(this.getData.bind(this), 100);
    }

    getData() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition( (position) => { this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude}) } );
        }
    }

    render() {

        return (
            <div>
                <h4>Longitude : <span id='longData'>{ this.state.longitude }</span></h4>
                <h4>Latitude : <span id='latiData'>{ this.state.latitude }</span></h4>
            </div>
        );
    }
}

export default TestComponent;