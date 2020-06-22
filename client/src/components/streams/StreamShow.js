import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.video = React.createRef();
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (!this.props.stream || this.player) {
            return;
        }

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`,
        });
        this.player.attachMediaElement(this.video.current);
        this.player.load();
    }
    render() {
        if (!this.props.stream) {
            return "loading...";
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.video} controls style={{ width: "100%" }} />
                <h3>{title}</h3>
                <h4>{description}</h4>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
