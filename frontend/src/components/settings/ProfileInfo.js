import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

async function FetchDrivers() {
  try {
    const response = await axios.get("http://localhost:8000/drivers", {});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


/* function FetchSponsors() {
  return axios.get("http://localhost:8000/sponsors", {})
    .then(response2 => response2.data)
    .catch(error => console.error(error));
}
 */

/* useEffect(() => {
  if (submitted) {
    axios.put(`http://localhost:8000/drivers/${drivers[0].id}`, {
      full_name,
      email,
      address,
      sponsor_id: selectedSponsor.value,
    })
    .then(() => {
      setIsEditable(false);
    })
    .catch(error => console.error(error));
  }
}, [submitted]); */

export default function ProfileInfo() {

  const [drivers, setDrivers] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  //const [password, setPassword] = useState(''); 
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const sponsorOptions = [
    { value: 5, label: 'Nike' },
    { value: 6, label: 'Apple' },
    { value: 7, label: 'Goodwill' },
    { value: 8, label: 'Lowe\'s' },
    { value: 9, label: 'Bass Pro Shop' },
    { value: 10, label: 'Doofenshmirtz Evil Inc.' },
  ];

  const handleSponsorChange = (selectedSponsor) => {
    setSelectedSponsor(selectedSponsor);
    setSubmitted(false);
  };

  useEffect(() => {
    FetchDrivers().then(data => setDrivers(data));
  }, []);

  /* useEffect(() => {
    FetchSponsors().then(data => setSponsors(data));
  }, []); */

  useEffect(() => {
    if (drivers.length > 0) {
      setFullName(drivers[0].first_name + " " + drivers[0].last_name);
      setEmail(drivers[0].email);
      setAddress(drivers[0].address);
      //setSponsor_id(drivers[0].sponsor_id);
    }
  }, [drivers]);

  /* useEffect(() => {
    if (sponsors.length > 0) {
      setSponsor(sponsors[0].first_name + ": " + sponsors[0].sponsor_id);
    }
  }, [sponsors]); */

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setSubmitted(false);
  };

  /* const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setSubmitted(false);
  }; */

  const handleAddress = (e) => {
    const addressValue = e.target.value;
    setAddress(addressValue);
    setSubmitted(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditable(false);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  /* const handleSponsor_id = (e) => {
    const sponsorIDValue = e.target.value;
    setSponsor_id(sponsorIDValue);
    setSubmitted(false);
  }; */

  return (
    <div className="wrapper">
      <div className="banner">
        <h1>Settings</h1>
      </div>
      <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
        <form name="Sign Up">
          <h2>Profile Information</h2>

          <label htmlFor="name"><b>Full Name</b></label>
          <input
            onChange={handleFullName}
            className="input"
            value={full_name}
            type="text"
            readOnly={!isEditable}
          />

          <label htmlFor="email"><b>Email</b></label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="text"
            readOnly={!isEditable}
          />

          {/* <label htmlFor="password"><b>Password</b></label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          /> */}

          <label htmlFor="address"><b>Address</b></label>
          <input
            onChange={handleAddress}
            className="input"
            value={address}
            type="text"
            readOnly={!isEditable}
          />

          <>
            <label htmlFor="sponsor"><b>Sponsor</b></label>
            <Select
              options={sponsorOptions}
              value={selectedSponsor}
              onChange={handleSponsorChange}
              readOnly={!isEditable}
            />
            <br />
          </>

          {isEditable ? (
            <>
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}

        </form>
      </div>
    </div>
  );
}