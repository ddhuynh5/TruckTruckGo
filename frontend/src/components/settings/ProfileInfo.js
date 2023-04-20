import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { sponsor, driversList, specific, update } from './SettingsHelper';
import Cookies from 'js-cookie';

export default function ProfileInfo() {
  const [allSponsors, setAllSponsors] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);

  const [roleId, setRoleId] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  const [currentSponsor, setCurrentSponsor] = useState('');
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [initialSponsor, setInitialSponsor] = useState('');
  const [initialFirst, setInitialFirst] = useState('');
  const [initialLast, setInitialLast] = useState('');
  const [initialName, setInitialName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialAddress, setInitialAddress] = useState('');


  const getSponsors = useCallback(async (data) => {
    if (data) {
      const items = await sponsor(data);
      const current = items.current_sponsor[0]["sponsor_name"].toString();
      const all = items.all_sponsors.map(sponsor => sponsor.sponsor_name);
      setCurrentSponsor(current);
      setInitialSponsor(current);
      setAllSponsors(all);
    }
  }, []);

  const getAllDrivers = useCallback(async () => {
    const all = await driversList(uniqueId);
    setAllDrivers(all);
  }, [uniqueId]);

  const getCurrentUser = useCallback(async () => {
    const user = await specific(roleId, uniqueId);
    if (roleId === "Driver") {
      setFirstName(user[0].fields.first_name);
      setInitialFirst(user[0].fields.first_name);

      setLastName(user[0].fields.last_name);
      setInitialLast(user[0].fields.last_name)

      setFullName(user[0].fields.first_name + ' ' + user[0].fields.last_name);

      setAddress(user[0].fields.address);
      setInitialAddress(user[0].fields.address);
    }

    if (roleId === "Sponsor") {
      setName(user[0].fields.sponsor_name);
      setInitialName(user[0].fields.sponsor_name);

      setAddress(user[0].fields.address);
      setInitialAddress(user[0].fields.address);
    }

    if (roleId === "Admin") {
      setName(user[0].fields.admin_name);
      setInitialName(user[0].fields.admin_name);
    }

    setEmail(user[0].fields.email);
    setInitialEmail(user[0].fields.email);
  }, [roleId, uniqueId]);

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
  }, [roleId, uniqueId, getAllDrivers, getSponsors, getCurrentUser]);

  const handleFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
    const [firstName, lastName] = fullName.split(' ');
    setFirstName(firstName);
    setLastName(lastName);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const handleAddress = (e) => {
    const addressValue = e.target.value;
    setAddress(addressValue);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditable(false);
    setCurrentSponsor(initialSponsor);
    setFullName(initialFirst + ' ' + initialLast);
    setName(initialName);
    setEmail(initialEmail);
    setAddress(initialAddress);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateParams = {
      "address": address ? address : null,
      "first_name": firstName ? firstName : null,
      "last_name": lastName ? lastName : null,
      "sponsor_name": name ? name : null,
      "admin_name": name ? name : null,
      "email": email ? email : null,
    }
    const confirmed = window.confirm("Are you sure you want to proceed with these changes?");
    if (confirmed) {
      setIsLoading(true);
      const response = await update(uniqueId, updateParams);
      if (response["success"])
        window.location.reload();
    }
    else {
      handleCancel();
      return;
    }
  };

  return (
    <div className="wrapper">
      <div className="banner">
        <h1>Settings</h1>
      </div>
      <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
        <form name="Sign Up">
          <h2>Profile Information</h2>

          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          )}

          {!isLoading && (
            <>
              {roleId !== "Driver" && (
                <>
                  <label htmlFor="name"><b>Name</b></label>
                  <input
                    onChange={handleName}
                    className="input"
                    value={name}
                    type="text"
                    readOnly={!isEditable}
                  />
                </>
              )}

              {roleId === "Driver" && (
                <>
                  <label htmlFor="name"><b>Name</b></label>
                  <input
                    onChange={handleFullName}
                    className="input"
                    value={fullName}
                    type="text"
                    readOnly={!isEditable}
                  />
                </>
              )}

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
                  <button onClick={handleSubmit}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
            </>
          )}

        </form>
      </div>
    </div>
  );
}