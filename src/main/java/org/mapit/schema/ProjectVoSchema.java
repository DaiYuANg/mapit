package org.mapit.schema;

import org.infinispan.protostream.GeneratedSchema;
import org.infinispan.protostream.annotations.ProtoSchema;
import org.mapit.model.vo.ProjectVo;

@ProtoSchema(includeClasses = ProjectVo.class)
@SuppressWarnings("unused")
public interface ProjectVoSchema  extends GeneratedSchema {
}
