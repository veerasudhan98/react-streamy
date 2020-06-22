import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../modal";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent = () => {
        if (!this.props.stream) {
            return "Are you sure you want to delete the stream?";
        }
        return `Are you sure you want to delete ${this.props.stream.title}`;
    };
    renderAction = () => {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <Link
                    onClick={() => this.props.deleteStream(id)}
                    className="ui button negative"
                >
                    Delete
                </Link>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    };

    render() {
        return (
            <div>
                <Modal
                    content={this.renderContent()}
                    actions={this.renderAction()}
                />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
    StreamDelete
);
