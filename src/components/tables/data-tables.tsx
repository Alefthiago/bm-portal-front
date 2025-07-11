"use client";
import { useEffect, useState, useMemo } from "react";
import DataTable from "datatables.net-react";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      import("datatables.net-dt"),
      import("datatables.net-responsive-dt"),
      import("datatables.net-select-dt"),
      import("datatables.net-buttons-dt"),
      import("datatables.net-buttons/js/buttons.html5.js"),
      import("datatables.net-buttons/js/buttons.print.js"),
      import("jszip"),  // necessário para Excel export
      import("pdfmake/build/pdfmake"),  // necessário para PDF export
      import("pdfmake/build/vfs_fonts"),  // necessário para PDF export
    ]).then(([dt]) => {
      DataTable.use(dt.default);
      setReady(true);
    });
  }, []);

  const tableData = useMemo(
    () => [
      ["1", "Tiger Nixon", "System Architect", "Edinburgh", null],
      ["2", "Garrett Winters", "Accountant", "Tokyo", null],
      ["3", "Ashton Cox", "Junior Technical Author", "San Francisco", null],
      ["4", "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", null],
    ],
    []
  );

  if (!ready) return <div>Carregando DataTables...</div>;

  return (
    <div>
      <DataTable
        data={tableData}
        className="display"
        columns={[
          { title: "ID" },
          { title: "Nome" },
          { title: "Cargo" },
          { title: "Cidade" },
          {
            title: "Ação",
            render: function () {
              return `
                <div style="display: flex; gap: 12px; alignItems: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon text-red-500 hover:text-red-700 cursor-pointer">
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon text-blue-900 hover:text-blue-700 cursor-pointer">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </div>
              `;
            },
          },
        ]}
        options={{
          responsive: true,
          select: true,
          pageLength: 10,
          lengthChange: false,
          dom: "Bfrtip", // <-- necessário para aparecer os botões
          buttons: [
            "copy",
            "csv",
            "excel",
            "pdf",
            "print",
          ],
          language: {
            search: "Buscar:",
            searchPlaceholder: "Pesquisar...",
            info: "",
            infoEmpty: "",
            infoFiltered: "",
            lengthMenu: "",
          },
        }}
      />
    </div>
  );
}

export default App;