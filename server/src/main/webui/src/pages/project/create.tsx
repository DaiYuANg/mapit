import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const ProjectCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Name"}
          name="name"
        />
        <TextField
          {...register("description", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Description"}
          name="description"
        />
        {/*<Controller*/}
        {/*  control={control}*/}
        {/*  name={"category.id"}*/}
        {/*  rules={{ required: "This field is required" }}*/}
        {/*  // eslint-disable-next-line*/}
        {/*  defaultValue={null as any}*/}
        {/*  render={({ field }) => (*/}
        {/*    <Autocomplete*/}
        {/*      {...categoryAutocompleteProps}*/}
        {/*      {...field}*/}
        {/*      onChange={(_, value) => {*/}
        {/*        field.onChange(value.id);*/}
        {/*      }}*/}
        {/*      getOptionLabel={(item) => {*/}
        {/*        return (*/}
        {/*          categoryAutocompleteProps?.options?.find((p) => {*/}
        {/*            const itemId = typeof item === "object" ? item?.id?.toString() : item?.toString();*/}
        {/*            const pId = p?.id?.toString();*/}
        {/*            return itemId === pId;*/}
        {/*          })?.title ?? ""*/}
        {/*        );*/}
        {/*      }}*/}
        {/*      isOptionEqualToValue={(option, value) => {*/}
        {/*        const optionId = option?.id?.toString();*/}
        {/*        const valueId = typeof value === "object" ? value?.id?.toString() : value?.toString();*/}
        {/*        return value === undefined || optionId === valueId;*/}
        {/*      }}*/}
        {/*      renderInput={(params) => (*/}
        {/*        <TextField*/}
        {/*          {...params}*/}
        {/*          label={"Category"}*/}
        {/*          margin="normal"*/}
        {/*          variant="outlined"*/}
        {/*          error={!!(errors as any)?.category?.id}*/}
        {/*          helperText={(errors as any)?.category?.id?.message}*/}
        {/*          required*/}
        {/*        />*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<Controller*/}
        {/*  name="status"*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => {*/}
        {/*    return (*/}
        {/*      <Select {...field} value={field?.value || "draft"} label={"Status"}>*/}
        {/*        <MenuItem value="draft">Draft</MenuItem>*/}
        {/*        <MenuItem value="published">Published</MenuItem>*/}
        {/*        <MenuItem value="rejected">Rejected</MenuItem>*/}
        {/*      </Select>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
      </Box>
    </Create>
  );
};

export { ProjectCreate };