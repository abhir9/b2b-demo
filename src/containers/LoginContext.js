// import React, { useState } from 'react';
// export const UserContext = React.createContext('');
// const LoginContext = ({ subPages }) => {
//     const [user, setUser] = useState('');
//     return (
//         <UserContext.Provider value={[user, setUser]}>
//             {subPages}
//         </UserContext.Provider>
//     )
// }
// export default LoginContext;

import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    user: {},
  }

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }))
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { setUser } = this

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }