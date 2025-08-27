"use client";

//    UTIL.   //
import { useEffect } from "react";
import $ from "jquery";
//   /UTIL.   //

//    INTERFACE.    //
interface DataTablesCustom {
  routes: string[];
};
//   /INTERFACE.    //

export function DataTablesCustom() {
  //    INICIANDO DATATABLES APENAS NO LADO DO CLIENTE.   //
  useEffect(() => {
    let dt: any;
    Promise.all([
      import("datatables.net-dt"),
      import("datatables.net-responsive-dt"),
    ]).then(() => {
      // inicializa somente se ainda não existe
      if (!$.fn.DataTable.isDataTable("#myTable")) {
        dt = $("#myTable").DataTable({
          paging: true,
          searching: true,
          responsive: true,
          lengthChange: false,
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json",
            info: "",
            search:"",
            searchPlaceholder: "Pesquisar",
            infoEmpty: "",
            infoFiltered: "",
            lengthMenu: "",
          },
        });
      }
    });

    return () => {
      try {
        if ($.fn?.DataTable?.isDataTable("#myTable")) {
          dt?.destroy();
          // console.log("✅ DataTable destruído com sucesso");
        }
      } catch (err) {
        // console.warn("⚠️ DataTable cleanup ignorado:", err);
      }
    };
  }, []);
  //    INICIANDO DATATABLES APENAS NO LADO DO CLIENTE.   //

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
        <tr><td>Cedric Kelly</td><td>Senior Javascript Developer</td></tr>
        <tr><td>Airi Satou</td><td>Accountant</td></tr>
        <tr><td>Brielle Williamson</td><td>Integration Specialist</td></tr>
        <tr><td>Herrod Chandler</td><td>Sales Assistant</td></tr>
        <tr><td>Rhona Davidson</td><td>Integration Specialist</td></tr>
        <tr><td>Tiger Nixon</td><td>System Architect</td></tr>
        <tr><td>Garrett Winters</td><td>Accountant</td></tr>
        <tr><td>Ashton Cox</td><td>Junior Author</td></tr>
        <tr><td>Cedric Kelly</td><td>Senior Javascript Developer</td></tr>
        <tr><td>Airi Satou</td><td>Accountant</td></tr>
        <tr><td>Brielle Williamson</td><td>Integration Specialist</td></tr>
        <tr><td>Herrod Chandler</td><td>Sales Assistant</td></tr>
        <tr><td>Rhona Davidson</td><td>Integration Specialist</td></tr>
      </tbody>
    </table>
  );
};