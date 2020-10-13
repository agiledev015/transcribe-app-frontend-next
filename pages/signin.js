import React, { useState } from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// core components
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// call api
import authAPI from "../apis/auth";


const styles = {
  displayFlex: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100% !important",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  alignItemCenter: {
    alignItems: "center",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

function Signin() {
  const classes = useStyles();
  const handleGotoSignup = () => {
    Router.push("/signup");
  }
  const [isLoading, setIsLoading] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password : ""
  })

  const handleSignin = () => {
    if (authInfo.email === "" || authInfo.password === "") {
      alert("Please insert all information.")
    } else if (validateEmail(authInfo.email) !== true ){
      alert("Email is not validate. Please insert correct Email.")
    } else {
      setIsLoading(true)
      authAPI.signin(authInfo)
      .then(
        response => {
          if( response.jwt_token !== undefined) {
            setIsLoading(false)
            Router.push("/admin/dashboard");
          } else {
            console.log(response)
          }
        },
        error => {
          setIsLoading(false);
        }
      )
    }
  }
  
  const handleInputChange = (event) => {
    switch(event.target.id){
      case "email":
        authInfo.email = event.target.value
        break;
      case "password":
        authInfo.password = event.target.value
        break;
    }
  }

  const validateEmail = (email) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  }
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success">
              <h4 className={`${classes.displayFlex} ${classes.justifyCenter} ${classes.cardTitleWhite}`}>Sign In</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleInputChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Lock className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleInputChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                    <Button variant="contained" color="primary" onClick={handleGotoSignup}>
                      Go to Sign Up
                    </Button>
                    {
                      isLoading ?
                      <Button variant="contained" disabled color="success" onClick={handleSignin}>
                        Sign In
                      </Button> :
                      <Button variant="contained" color="success" onClick={handleSignin}>
                        Sign In
                      </Button>
                    }
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default Signin;