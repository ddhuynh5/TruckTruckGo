import React from 'react';

export default function SignIn() {

    return (
        <><div class="form-group">
            <label for="InputUsername">Username</label>
            <input type="username" class="form-control" id="InputUsername" placeholder="Enter Username" />
        </div>
        <div class="form-group">
            <label for="InputPassword">Password</label>
            <input type="password" class="form-control" id="InputPassword" placeholder="Enter Password" />
        </div></>
    );
}
