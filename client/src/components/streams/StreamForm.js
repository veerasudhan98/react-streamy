import React from 'react';
import {Field, reduxForm} from 'redux-form' //Field -> component,
                                            //reduxForm->function(same as connect)

class StreamForm extends React.Component{
renderError=({touched, error})=>{
    if(error && touched){
        return (
            <div className="ui error message" style={{padding:'2px'}}>
                <div>{error}</div>
            </div>
        )
    }
}

    renderInput = ({input, label, meta}) => {
    //{input} from 'formProps';
    // now input has multiple props like onChange,value and etc..
    //and we are using all at once. check reduxdevtool for more info.  
    const fieldOnError = `required field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className = {fieldOnError}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }
    onOnceSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

render(){
    return (
        <div>
{/* handleSubmit(use with onSubmit) is also a prop of redux-form just like onChange,value and etc. */}
            {/* field part */} 
            {/* if involves error in semantic ui use "error" className of form */}
            <form className="ui form error" 
            style={{padding:"50px 250px 50px 20px",
            border: '2px solid gray'}}
            onSubmit={this.props.handleSubmit(this.onOnceSubmit)}>
                <Field name="title" 
                component={this.renderInput} 
                label="Enter title"/>

                <Field name="description" 
                component={this.renderInput} 
                label="Enter description"/>
                {/* <Link to="/">Submit</Link> */}
                    <button className="ui button primary">Submit</button>
            </form>
        </div>
        )
    }
}

// validation part - (remember:- the connection between the Field and validate is "name")

const validate = (formValues) =>{
    const error = {};

    if(!formValues.title){
        error.title = "You must enter a title"
    }
    if(!formValues.description){
        error.description = "You must enter a description"
    }
    return error;
}
// const mapStateToProps = (state) =>{
//     return {

//     }
// }
export default reduxForm({
    form: 'streamForm',
    validate  // we are wiring up the validate part
})(StreamForm)