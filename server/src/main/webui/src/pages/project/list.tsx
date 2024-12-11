import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import { DateField, DeleteButton, EditButton, List, MarkdownField, ShowButton, useDataGrid } from "@refinedev/mui";
import { useMemo } from "react";
import { Grid } from "@mui/material";
import { ProjectCard } from "../../components/project";
import { Project } from "../../api/project";

export const ProjectList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data, isLoading } = useMany({
    resource: "project", // 替换为你的资源
    ids: [], // 这里填充你要获取的项目 ID 数组
  });

  console.log(data?.data);
  // const columns = useMemo<GridColDef[]>(
  //   () => [
  //     {
  //       field: "id",
  //       headerName: "ID",
  //       type: "number",
  //       minWidth: 50,
  //     },
  //     {
  //       field: "name",
  //       flex: 1,
  //       headerName: "Name",
  //       minWidth: 200,
  //     },
  //     {
  //       field: "description",
  //       flex: 1,
  //       headerName: "Description",
  //       align: "left",
  //       minWidth: 250,
  //       renderCell: function render({ value }) {
  //         if (!value) return "-";
  //         return <MarkdownField value={value?.slice(0, 80) + "..." || ""} />;
  //       },
  //     },
  //     {
  //       field: "accessKey",
  //       flex: 1,
  //       headerName: "Access Key",
  //       align: "left",
  //       minWidth: 200,
  //     },
  //     {
  //       field: "createAt",
  //       align: "left",
  //       flex: 1,
  //       headerName: "Created at",
  //       minWidth: 250,
  //       renderCell: function render({ value }) {
  //         return <DateField value={value} />;
  //       },
  //     },
  //     {
  //       field: "actions",
  //       headerName: "Actions",
  //       sortable: false,
  //       renderCell: function render({ row }) {
  //         return (
  //           <>
  //             <EditButton hideText recordItemId={row.id} />
  //             <ShowButton hideText recordItemId={row.id} />
  //             <DeleteButton hideText recordItemId={row.id} />
  //           </>
  //         );
  //       },
  //       align: "center",
  //       headerAlign: "center",
  //       minWidth: 80,
  //     },
  //   ],
  //   [],
  // );

  return (
    <List>
      <Grid container spacing={3}>
        {/*<DataGrid {...dataGridProps} columns={columns} autoHeight />*/}
        {data?.data
          ? data.data.map((pro) => {
              console.log(pro);
              return (
                <Grid item xs={4}>
                  <ProjectCard {...(pro as Project)} />
                </Grid>
              );
            })
          : null}
      </Grid>
    </List>
  );
};
