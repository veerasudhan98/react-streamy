import React from 'react';
import {connect} from 'react-redux'
import {fetchStream, editStream} from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = formValue =>{
        this.props.editStream(this.props.match.params.id, formValue)   
    }

    render(){
        if(!this.props.stream){
            return <div>Loding...</div>
        }
    return (
    <div>
        <h3>Edit a stream</h3>
        <StreamForm
            initialValues={this.props.stream}
            onSubmit={this.onSubmit}
        />
    </div>
    )
    }
}
const mapStateToProps = (state, ownProps) =>{
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream, editStream})(StreamEdit);