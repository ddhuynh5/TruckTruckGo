import React, { useState } from 'react';
import Select from 'react-select';
import { signup, saveCookies, getRoleName } from './AuthHelper';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');
  const [sponsorCode, setSponsorCode] = useState('');
  const [sponsorName, setSponsorName] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const roleOptions = [
    { value: 3, label: 'Driver' },
    { value: 2, label: 'Sponsor' },
    { value: 1, label: 'Admin' }
  ];

  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const sponsorOptions = [
    { value: 5, label: 'Nike' },
    { value: 6, label: 'Apple' },
    { value: 7, label: 'Goodwill' },
    { value: 8, label: 'Lowe\'s' },
    { value: 9, label: 'Bass Pro Shop' },
    { value: 10, label: 'Doofenshmirtz Evil Inc.' },
  ];

  const handleRoleChange = (selectedRole) => {
    setSelectedRole(selectedRole);
    setSubmitted(false);
  };

  const handleSponsorChange = (selectedSponsor) => {
    setSelectedSponsor(selectedSponsor);
    setSubmitted(false);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
    setNameError(false);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
    setNameError(false);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setSubmitted(false);
    setAddressError(false);
  };

  const handleAdmin = (e) => {
    setAdmin(e.target.value);
    setSubmitted(false);
  };

  const handleSponsorCode = (e) => {
    setSponsorCode(e.target.value);
    setSubmitted(false);
  };

  const handleSponsorName = (e) => {
    setSponsorName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setSubmitted(false);

    if (!emailValue.includes('@')) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setSubmitted(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((address === '' && selectedRole.label !== "Admin") || !selectedRole || email === '' || password === '') {
      setError(true);
      console.log("O")
      return;
    }
    else if (nameError || emailError || passwordError || (addressError && selectedRole.label !== "Admin")) {
      setError(true);
      console.log("HEYOOO")
      return;
    }
    else if (selectedRole.label === "Driver" && !selectedSponsor) {
      setError(true);
      return;
    }
    else {
      try {
        const response = await signup(
          address,
          firstName,
          lastName,
          sponsorName,
          admin,
          selectedRole.value,
          selectedSponsor ? selectedSponsor.value : parseInt(sponsorCode),
          email,
          password
        );

        setSubmitted(true);
        setError(false);

        saveCookies({
          email: response[0].fields.email,
          name: response[0].name,
          role: getRoleName(response[0].fields.role_id),
          sessionId: response[0].fields.session_id,
          expiration: response[0].fields.expiration_time,
          uniqueId: response[0].pk
        });

        window.location = '/home';
      }
      catch (error) {
        setError(true);
        if (error && error["Error"]) {
          alert(error["Error"]);
        } else {
          console.error(error);
          alert("An error occurred during registration.");
        }
      }
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <p>User {firstName} {lastName} successfully registered!!</p>
      </div>

    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <p>Please enter all the fields correctly</p>
      </div>
    );
  };

  const hidePass = () => {
    var x = document.getElementById("InputPassword");
    if (x.type === "password") {
      x.type = "text";
    }
    else {
      x.type = "password";
    }
  }

  return (
    <div className="wrapper">
      <div className="banner">
        <h1>Scrummy Bears Driving</h1>
      </div>
      <div className="container">
        <form name="Sign Up">
          <h2>User Registration</h2>
          <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>

          <label htmlFor="role"><b>Role</b></label>
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={handleRoleChange}
          />
          <br />

          {selectedRole && selectedRole.value === 3 && (
            <>
              <label htmlFor="sponsor"><b>Sponsor</b></label>
              <Select
                options={sponsorOptions}
                value={selectedSponsor}
                onChange={handleSponsorChange}
              />
              <br />

              <label htmlFor="first name"><b>First Name</b></label>
              <input
                onChange={handleFirstName}
                className="input"
                value={firstName}
                type="text"
              />

              <label htmlFor="last name"><b>Last Name</b></label>
              <input
                onChange={handleLastName}
                className="input"
                value={lastName}
                type="text"
              />
            </>
          )}


          {selectedRole && selectedRole.value === 2 && (
            <>
              <label htmlFor="sponsor name"><b>Sponsor Name</b></label>
              <input
                onChange={handleSponsorName}
                className="input"
                value={sponsorName}
                type="text"
              />
              <br />
              <label htmlFor="sponsor code"><b>Sponsor Code</b></label>
              <input
                onChange={handleSponsorCode}
                className="input"
                value={sponsorCode}
                type="text"
              />
              <br />
            </>
          )}

          {selectedRole && selectedRole.value === 1 && (
            <>
              <label htmlFor="admin"><b>Administrator Name</b></label>
              <input
                onChange={handleAdmin}
                className="input"
                value={admin}
                type="text"
              />
              <br />
            </>
          )}

          {selectedRole && selectedRole.value !== 1 && (
            <>
              <label htmlFor="address"><b>Address</b></label>
              <input
                onChange={handleAddress}
                className="input"
                value={address}
                type="text"
              />
            </>
          )}

          <label htmlFor="email"><b>Email</b></label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="text"
            placeholder="Enter Email"
          /> {emailError && (<div className="error">Please enter a valid email address</div>)}
          <label htmlFor="InputPassword"><b>Password</b></label>
          <input
            onChange={handlePassword}
            className="form-control"
            value={password}
            type="password"
            id="InputPassword"
            placeholder="Enter Password"
          /> {passwordError && (<div className="error">Password must be at least 8 characters long, contain at least
            one capital letter, one number, and a special character</div>)}

          <div>
            <input type="checkbox" onClick={hidePass} /> Show Password
          </div>

          <p><a href="SignIn">Already have an account?</a></p>

          <button onClick={handleSubmit} className="signupbtn" type="button"> Sign Up </button>
        </form>
      </div>
    </div>
  );
}
