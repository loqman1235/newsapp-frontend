import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ICategory } from "@/types";
import useFetch from "@/hooks/useFetch";
import { format } from "date-fns";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const CategoriesPage = () => {
  const { data: categoriesResult, isLoading } = useFetch("/cats");
  const [rowData, setRowData] = useState<ICategory[]>(
    isLoading ? [] : categoriesResult.categories,
  );

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "#",
      field: "id",
      flex: 1,
    },
    {
      headerName: "NAME",
      field: "name",
      flex: 2,
    },

    {
      headerName: "CREATED AT",
      field: "createdAt",
      flex: 2,

      valueFormatter: (params: { value: string }) =>
        format(new Date(params.value), "dd MMM yyyy HH:mm a"),
    },
    {
      headerName: "STATUS",
      field: "status",
      flex: 2,

      cellRenderer: (params: { data: ICategory }) => (
        <div className="flex items-center justify-center gap-1">
          <Badge
            variant={
              params.data.status === "published" ? "default" : "secondary"
            }
          >
            {params.data.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      ),
      cellStyle: { display: "flex" },
    },
    {
      headerName: "ACTIONS",
      // field: "action",
      flex: 2,
      cellRenderer: (props: { node: { data: ICategory } }) => (
        <div className="flex items-center justify-center gap-1">
          <Link
            onClick={() => console.log(props.node.data.id)}
            className="flex items-center justify-center bg-foreground p-2 text-background"
            to={`/dashboard/articles/${props.node.data.id}`}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            onClick={() => console.log(props.node.data.id)}
            className="flex items-center justify-center bg-red-600 p-2 text-background"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
      cellStyle: { display: "flex" },
    },
  ]);

  // Update rowData when categoriesResult changes
  useEffect(() => {
    if (!isLoading) {
      setRowData(categoriesResult.categories);
    }
  }, [categoriesResult, isLoading]);

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Categories</h2>
      <div className="ag-theme-material">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          localeText={{ noRowsToShow: "No categories found" }}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
