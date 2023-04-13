import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { sponsor } from './SettingsHelper';
import { driver } from './SettingsHelper';
import Cookies from 'js-cookie';

export default function ProfileInfo() {

  const [drivers, setDrivers] = useState([]);
  const [currentSponsor, setcurrentSponsor] = useState('');
  const [allSponsors, setAllSponsors] = useState([]);
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  /*   const [selectedSponsor, setSelectedSponsor] = useState(null);*/
  async function getSponsors(data) {
    if (data) {
      const items = await sponsor(data);
      const current = items.current_sponsor[0]["sponsor_name"].toString();
      const all = items.all_sponsors.map(sponsor => sponsor.sponsor_name);
      setcurrentSponsor(current);
      setAllSponsors(all);
    }
  }

  async function getDrivers(data) {

    console.log(data)
    if (data) {
      const items = await driver(data);
      console.log(items)
      setFullName(items[0].first_name + ' ' + items[0].last_name);
      setEmail(items[0].email);
      setAddress(items[0].address);
    }
  }

  useEffect(() => {
    const uniqueId = Cookies.get("uniqueId");
    getSponsors(uniqueId);
  }, []);

  useEffect(() => {
    const uniqueId = Cookies.get("uniqueId");
    getDrivers(uniqueId);
  }, []);

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setSubmitted(false);
  };

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
              options={allSponsors.map((sponsor) => ({
                value: sponsor,
                label: sponsor,
              }))}
              value={{ value: currentSponsor, label: currentSponsor }}
              onChange={(selectedOption) => {
                setcurrentSponsor(selectedOption.value);
                setSubmitted(false);
              }}
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