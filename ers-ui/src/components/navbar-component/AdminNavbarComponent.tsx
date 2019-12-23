import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,  NavbarText } from 'reactstrap';


// export const NavBarComponent = (props: any) => {
//   const [collapsed, setCollapsed] = useState(true);

//   const toggleNavbar = () => setCollapsed(!collapsed);



//   return (
//     <div>
//       <Navbar color="faded" >
//         <NavbarBrand href="/" className="mr-auto">MS Paper Company</NavbarBrand>
//         <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//         <Collapse isOpen={!collapsed} navbar>
//           <Nav navbar>
//             <NavItem>
//               <NavLink href="/login"> Login</NavLink>
//             </NavItem>
//             <NavItem>
//             <NavLink href="/user"> User Page</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }

const AdminNavBarComponent = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">MS Paper</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/login/">Log in</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user/">User Page</NavLink>
            </NavItem>

          </Nav>
          <NavbarText>You are logged in as admin</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default AdminNavBarComponent;