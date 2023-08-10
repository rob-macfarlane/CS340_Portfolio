//Navigate from page to page

import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="../Activities">Activities</Link>
        <Link to="../Customers">Customers</Link>
        <Link to="../Equipments">Equipments</Link>
        <Link to="../Classes">Classes</Link>
        <Link to="../Reservations">Reservations</Link>
        <Link to="../ActivitiesHasEquipments">ActivitiesHasEquipments</Link>
    </nav>
  );
}

export default Nav;
