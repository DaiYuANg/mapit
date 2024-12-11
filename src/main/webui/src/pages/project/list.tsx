import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import { DateField, DeleteButton, EditButton, List, MarkdownField, ShowButton, useDataGrid } from "@refinedev/mui";
import { useMemo } from "react";

export const BlogPostList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "description",
        flex: 1,
        headerName: "Description",
        align: "left",
        minWidth: 250,
        renderCell: function render({ value }) {
          if (!value) return "-";
          return <MarkdownField value={value?.slice(0, 80) + "..." || ""} />;
        },
      },
      {
        field: "accessKey",
        flex: 1,
        headerName: "Access Key",
        align: "left",
        minWidth: 200,
      },
      {
        field: "createAt",
        align: "left",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
