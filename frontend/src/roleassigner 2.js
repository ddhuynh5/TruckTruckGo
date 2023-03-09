import axios from 'axios';

function fetchUserRole(role_id) {
  return axios.get(`/api/users/${role_id}/role`)
    .then(response => response.data.roleId)
    .catch(error => {
      console.error('Error fetching user role:', error);
    });
}

const roleMap = {
    1: 'Admin',
    2: 'Driver',
    3: 'Sponser',
  };

const role_id = 499;

if(role_id == 1){
    return (
        <div>
          <h1>Admin User</h1>
          {/* admin-only content */}
        </div>
      );
}

if(role_id == 2){
    return (
        <div>
          <h1>Driver User</h1>
          {/* driver-only content */}
        </div>
      );
}

if(role_id == 3){
    return (
        <div>
          <h1>Sponser User</h1>
          {/* admin-only content */}
        </div>
    );
}