import React, { Component } from 'react'
import Logo from '../../Images/logo.png'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import { connect } from 'react-redux';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: null
        }
    }

//     async componentDidMount() {
//         try {
//           setInterval(async () => {
//             const username = 'yash'
//             axios.post("http://localhost:2000/mongo/sensorz", {username}).then((response)=>{
//             this.setState({
//                 data: response.data[0]
//             })
//           })
//           console.log(this.state.data)
//           }, 5000);
//         } catch(e) {
//           console.log(e);
//         }
//   }

    clickSignIn= (event) => { 
        this.props.logUserIn(this.state.username);
        this.props.history.push('/landingpage');
    }

    usernameHandler = (e) => {
        console.log(e.target.value);
        this.setState({
          username: e.target.value,
        });
      }

    render() {
        const paperStyle={padding :20,height:'50vh',width:280, margin:"20px auto"}
        const avatarStyle={backgroundColor:'#329FFF'}
        const btnstyle={margin:'8px 0', backgroundColor: '#329FFF'}
        return (
            <div style={{backgroundColor: '#329FFF'}}>
                <img src={Logo} alt="" style={{ position: 'relative', bottom: '20vh', width: '25%', height: '25%' }} />
                <Grid style={{position: 'relative', bottom: '40vh'}}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required onChange={this.usernameHandler}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={this.clickSignIn}>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logUserIn: (user) => {
      dispatch({
        type: 'LOGIN', username: user
      });
    }
  });
export default connect(null, mapDispatchToProps)(SignIn);
