import React from 'react';
import { AppBar, Button, Toolbar, Typography, Icon, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { userExists } from '../api'

export default class TopAppBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }
    render() {
        let button;
        if (!this.state.loggedin) {
            button = <React.Fragment><Button component={RouterLink} color="inherit" to="/login">Login</Button><Button component={RouterLink} color="inherit" to="/register">Register</Button></React.Fragment>;
        } else {
            button = <Button component={RouterLink} color="inherit" to="/dashboard">Dashboard</Button>
        }
        return (
            <div style={{
                flexGrow: 1,
                marginTop: 25,
                marginBottom: 30
            }}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            <RouterLink style={{ color: 'inherit', textDecoration: 'none' }} to="/">Tinson</RouterLink>
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="Change Tinson theme"
                            onClick={() => this.props.onChangeTheme()}
                        >
                            <Icon>invert_colors</Icon>
                        </IconButton>
                        {button}
                    </Toolbar>
                </AppBar>
            </div >
        );
    }

    async componentDidMount() {
        const data = await userExists();
        if (data.success) {
            this.setState({ loggedin: true });
        }
    }
}