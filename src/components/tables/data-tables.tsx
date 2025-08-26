"use client";

import { useEffect } from "react";
import $ from "jquery";

export function ResponsiveTable() {
  //    CARREGANDO PLUGINS NO NAVEGADOR.    //
  useEffect(() => {
    let dt: any;

    Promise.all([
      import("datatables.net-dt"),
      import("datatables.net-responsive-dt"),
    ]).then(() => {
      dt = $('#myTable').DataTable({
        paging: true,
        searching: true,
        responsive: true,
      });
    });

    return () => {
      // destruir tabela ao desmontar
      if ($.fn.DataTable.isDataTable("#myTable")) {
        dt?.destroy();
        console.log('passou aqui');
      }
    };
  }, []);
  //    CARREGANDO PLUGINS NO NAVEGADOR.    //

  return (
    <table id="myTable" className="display stripe hover w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
      </tbody>
    </table>
  );
}