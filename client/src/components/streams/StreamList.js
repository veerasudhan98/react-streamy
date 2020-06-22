import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }
    renderButton = (stream, isSignedIn) => {
        if (stream.userId === this.props.currentUserId && isSignedIn) {
            return (
                <div className="right floated content">
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="ui button primary"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
            );
        } else {
            return <span></span>;
        }
    };
    renderCreateStreamButton = () => {
        return (
            <div>
                <Link to="/streams/new" className="item">
                    <button className="ui button">Create Stream</button>
                </Link>
            </div>
        );
    };
    renderList = (isSignedIn) => {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderButton(stream, isSignedIn)}
                    <div className="header">
                        <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                    </div>
                    <div className="description">{stream.description}</div>
                </div>
            );
        });
    };
    render() {
        return (
            <div>
                <h2>streams</h2>
                <div className="ui celled list">
                    {this.renderList(this.props.isSignedIn)}
                    {this.renderCreateStreamButton()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams), //co
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
