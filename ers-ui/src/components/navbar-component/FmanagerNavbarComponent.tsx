import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';


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

const FmanagerNavBarComponent = (props: any) => {
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Find User By ID
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  1
                </DropdownItem>
                <DropdownItem>
                  2
                </DropdownItem>
                <DropdownItem>
                  3
                </DropdownItem>
                <DropdownItem>
                  4
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
 
          </Nav>
          <NavbarText>You are logging in as finance manager</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default FmanagerNavBarComponent;