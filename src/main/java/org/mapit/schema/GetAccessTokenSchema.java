package org.mapit.schema;

import org.infinispan.protostream.GeneratedSchema;
import org.infinispan.protostream.annotations.ProtoSchema;
import org.mapit.model.parameter.GetAccessToken;

@ProtoSchema(includeClasses = GetAccessToken.class,schemaPackageName = "token")
public interface GetAccessTokenSchema extends GeneratedSchema {
}
