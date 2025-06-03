# mapit

字典映射独立服务

project 作为 namespace 命名空间
accesskey 作为外部访问 命名空间凭证
一个 project -> 多个 accesskey
一个 dictionary -> 多个 dictionary_item

可通过外部接口
`/api/v1/project/${projectId}/dictionaries/${dictionaryCode}/mapping?itemValue=${value}`

> 此接口中header 需要包含
> `Mapit-Access-Key=${accessKey}`

获取字典映射的label值

后端需要校验

1. create project
2. project 生成 accessKey -> 非对称加密算法 rsa accesskey 字段保存 加密key
3. 查询 字典映射
