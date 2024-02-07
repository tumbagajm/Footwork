import React from "react";

// Context Object -> used to store and share information all across components and pages.

const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;

export default UserContext;
