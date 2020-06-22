import React from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component{
    // SETING UP GOOGLE OAUTH
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '583746876023-36pirih0712t1f7nuo4jmjm3oq581inu.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance()

                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        }
        else if(this.props.isSignedIn){
            return (<div>
                        <button className="ui red google button"
                            onClick={()=>{this.auth.signOut()}}>
                            <i className="google icon"/> 
                            SignOut
                        </button>
                </div>
            )
        }
        else{
            return  (<div>
                        <button className="ui red google button"
                            onClick={()=>{this.auth.signIn()}}>
                            <i className="google icon"/> 
                            SignIn with Google
                        </button>
                    </div>)
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) =>{
    return {
        isSignedIn: state.auth.isSignedIn   
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)