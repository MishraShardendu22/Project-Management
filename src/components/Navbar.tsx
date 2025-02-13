import { signOut } from "next-auth/react";

const Navbar = () => {
  const HandleSignOut = () => {
    signOut();
  };

  return (
    <div
      onClick={HandleSignOut}
    >
      Sign-Out
    </div>
  )
}

export default Navbar
