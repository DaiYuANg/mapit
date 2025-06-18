import { Alert, Empty } from 'antd';
import { useSearchParams } from 'react-router';
import { DictView } from '../../components/DictView';
import { useOne } from '@refinedev/core';

const ProjectView = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const { data, isError } = useOne({
    resource: 'project',
    id: projectId ?? '',
    queryOptions: {
      enabled: !!projectId,
    },
  });
  if (!projectId) {
    return <Empty description="请先选择一个项目再访问此页面" />;
  }
  console.log(data);
  return (
    <div>
      {isError ? (
        <Alert message="加载失败" description={'项目数据加载失败，请检查网络或稍后重试。'} type="error" showIcon />
      ) : (
        <div>
          <DictView projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export { ProjectView };
