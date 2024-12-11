import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Fragment } from "react";
import { Project } from "../../api/project";
import { DeleteButton, EditButton, ShowButton } from "@refinedev/mui";

const ProjectCard = ({ id, name, description, accessKey, createAt }: Project) => {
  return (
    <Card variant="outlined">
      <Fragment>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Project Name:{name}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Project Id:{id}
          </Typography>
          <Typography variant="body1">Description: {description}</Typography>
          <Typography variant="body2">AccessKey:{accessKey}</Typography>
          <Typography variant="subtitle2">Create At:{createAt}</Typography>
        </CardContent>
        <CardActions>
          <EditButton recordItemId={id} />
          <DeleteButton recordItemId={id} />
          <ShowButton recordItemId={id} />
        </CardActions>
      </Fragment>
    </Card>
  );
};

export { ProjectCard };
