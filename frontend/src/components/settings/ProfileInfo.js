import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { sponsor, driversList, specific } from './SettingsHelper';
import Cookies from 'js-cookie';

export default function ProfileInfo() {
  const [currentSponsor, setCurrentSponsor] = useState('');
  const [allSponsors, setAllSponsors] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [roleId, setRoleId] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  /*   const [selectedSponsor, setSelectedSponsor] = useState(null);*/
  async function getSponsors(data) {
    if (data) {
      const items = await sponsor(data);
      const current = items.current_sponsor[0]["sponsor_name"].toString();
      const all = items.all_sponsors.map(sponsor => sponsor.sponsor_name);
      setCurrentSponsor(current);
      setAllSponsors(all);
    }
  }

  async function getAllDrivers() {
    const all = await driversList(uniqueId);
    setAllDrivers(all);
  }

  async function getCurrentUser() {
    const user = await specific(roleId, uniqueId);
    if (roleId == "Driver") {
      setFullName(user[0].fields.first_name + ' ' + user[0].fields.last_name);
      setEmail(user[0].fields.email);
      setAddress(user[0].fields.address);
    }
    if (roleId == "Sponsor") {
      setFullName(user[0].fields.sponsor_name);
      setEmail(user[0].fields.email);
      setAddress(user[0].fields.address);
    }
    if (roleId == "Admin") {
      setFullName(user[0].fields.admin_name);
      setEmail(user[0].fields.email);
    }
  }

  useEffect(() => {
    const uniqueId = Cookies.get("uniqueId");
    const role = Cookies.get("role");
    setRoleId(role);
    setUniqueId(uniqueId);
  }, []);

  useEffect(() => {
    if (roleId && uniqueId) {
      if (roleId === "Sponsor")
        getAllDrivers();

      if (roleId !== "Admin")
        getSponsors(uniqueId);

      getCurrentUser();
    }
  }, [roleId, uniqueId]);

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

          <label htmlFor="name"><b>Name</b></label>
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

          {roleId !== "Admin" && (
            <>
              <label htmlFor="address"><b>Address</b></label>
              <input
                onChange={handleAddress}
                className="input"
                value={address}
                type="text"
                readOnly={!isEditable}
              />

              <label htmlFor="sponsor"><b>Sponsor</b></label>
              <Select
                options={allSponsors.map((sponsor) => ({
                  value: sponsor,
                  label: sponsor,
                }))}
                value={{ value: currentSponsor, label: currentSponsor }}
                onChange={(selectedOption) => {
                  setCurrentSponsor(selectedOption.value);
                  setSubmitted(false);
                }}
                isDisabled={!isEditable || roleId === "Sponsor"}
              />
              <br />
            </>
          )}

          {roleId === "Sponsor" && (
            <>
              <label htmlFor="myDrivers"><b>Drivers</b></label>
              <Select
                options={allDrivers.map((item, index) => ({
                  value: index,
                  label: `${item.first_name} ${item.last_name}`
                }))}
                placeholder="My Drivers"
              />
              <br />
            </>
          )}

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