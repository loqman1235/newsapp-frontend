import { Article, articlesData } from "@/data";
import { Badge } from "@/components/ui/badge";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const columnHelper = createColumnHelper<Article>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "#",
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "Title",
  }),
  columnHelper.accessor("status", {
    cell: (info) => (
      <Badge
        variant={info.getValue() === "published" ? "default" : "secondary"}
      >
        {info.getValue()}
      </Badge>
    ),
    header: "Status",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue(),
    header: "Created At",
  }),
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      //   const articleId = info.getValue().id;
      return (
        <div className="flex flex-row space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

const ArticlesPage = () => {
  const table = useReactTable({
    data: articlesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Articles</h2>
      <div>
        <table className="my-auto w-full bg-background shadow">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b  uppercase tracking-wider text-muted-foreground"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 pr-2 text-left text-sm font-medium text-muted-foreground [&:first-child]:pr-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b text-sm">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesPage;
