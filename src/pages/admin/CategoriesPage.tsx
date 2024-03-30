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
import { ClipLoader } from "react-spinners";
import api from "@/services/api";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const CategoriesPage = () => {
  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );
  const { data: categoriesResult, isLoading } = useFetch("/cats");
  const [rowData, setRowData] = useState<ICategory[]>(
    isLoading ? [] : categoriesResult.categories,
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/cats/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 200) {
        setRowData((prev) => prev.filter((cat) => cat.id !== id));
        console.log("deleted");
        // toast success
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.log(error.response?.data.message);
      }

      console.log(error);
    }
  };

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
      field: "published",
      flex: 2,

      cellRenderer: (params: { data: ICategory }) => (
        <div className="flex items-center justify-center gap-1">
          <Badge variant={params.data.published ? "default" : "secondary"}>
            {params.data.published ? "Public" : "Draft"}
          </Badge>
        </div>
      ),
      cellStyle: { display: "flex" },
      // sort by boolean
    },
    {
      headerName: "ACTIONS",
      // field: "action",
      flex: 2,
      cellRenderer: (props: { node: { data: ICategory } }) => (
        <div className="flex items-center justify-center gap-1">
          <Link
            className="flex items-center justify-center bg-foreground p-2 text-background"
            to={`/dashboard/categories/edit/${props.node.data.slug}`}
          >
            <Pencil className="h-4 w-4" />
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={() => console.log(props.node.data.id)}
                className="flex items-center justify-center bg-red-600 p-2 text-background"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  category.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(props.node.data.id)}
                  className="bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <ClipLoader className="text-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className=" text-2xl font-bold tracking-tight">Categories</h2>
        <Button variant="default">
          <Link to="/dashboard/categories/create">Create</Link>
        </Button>
      </div>
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
