import React, { useState, useEffect } from 'react';
import axios from 'axios';


import ProfileInfo from './ProfileInfo';
import Navbar from './Navbar'

export default function SettingsPage(){

  return (
    <>
      <Navbar />
      <ProfileInfo />
    </>
  )
};